import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, LogIn, Vote } from 'lucide-react';
import { login_with_discord } from '@/routes/auth';
import type { ElectionRich, Auth } from '@/types';

interface VoteSectionProps {
    election: ElectionRich;
    hasVoted?: boolean;
}

export default function VoteSection({ election, hasVoted = false }: VoteSectionProps) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isAuthenticated = Boolean(auth?.user);
    const hasEnded = new Date(election.ends_at) <= new Date();

    // 1. Election has ended -> Show horizontal bar chart results
    if (hasEnded) {
        const totalVotes = election.candidates.reduce((sum, candidate) => sum + (candidate.votes_count ?? 0), 0);

        return (
            <Card className="w-full bg-card text-card-foreground shadow-sm">
                <CardHeader>
                    <div className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl font-bold">Výsledky hlasování</CardTitle>
                        <Badge variant="secondary" className="text-sm">
                            Celkem hlasů: {totalVotes}
                        </Badge>
                    </div>
                    <CardDescription>
                        Hlasování bylo ukončeno. Níže jsou zobrazeny konečné výsledky.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {election.candidates.map((candidate) => {
                        const votes = candidate.votes_count ?? 0;
                        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                        return (
                            <div key={candidate.id} className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="font-semibold text-base">{candidate.name}</span>
                                    <span className="text-muted-foreground">
                                        {votes} {votes === 1 ? 'hlas' : votes >= 2 && votes <= 4 ? 'hlasy' : 'hlasů'} ({percentage}%)
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <Progress value={percentage} className="h-4 bg-muted" />
                                </div>
                                {candidate.description && (
                                    <p className="text-xs text-muted-foreground">{candidate.description}</p>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        );
    }

    // 2. User is not authenticated -> Show login prompt
    if (!isAuthenticated) {
        return (
            <Card className="w-full border-dashed bg-card text-card-foreground">
                <CardHeader className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted mb-2">
                        <Lock className="size-6 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold">Pro hlasování se musíte přihlásit</CardTitle>
                    <CardDescription>
                        Abyste mohl(a) odevzdat svůj hlas v tomto hlasování, přihlaste se prosím pomocí Discord účtu.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center pb-6">
                    <a href={login_with_discord().url}>
                        <Button variant="default" size="lg" className="gap-2">
                            <LogIn className="size-4" />
                            <span>Přihlásit se přes Discord</span>
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        );
    }

    // 3. User has already voted -> Show confirmation message
    if (hasVoted) {
        return (
            <Card className="w-full bg-card text-card-foreground">
                <CardHeader className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 mb-2">
                        <CheckCircle2 className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">V tomto hlasování jste již hlasoval(a)</CardTitle>
                    <CardDescription>
                        Váš hlas byl v pořádku zaznamenán. Výsledky budou zveřejněny po skončení volby.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    // 4. User can vote -> Show interactive candidate selection form
    const handleSubmitVote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCandidateId || isSubmitting) return;

        router.post(
            `/vote/${selectedCandidateId}`,
            {},
            {
                onStart: () => setIsSubmitting(true),
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    return (
        <form onSubmit={handleSubmitVote} className="w-full space-y-6">
            <Card className="bg-card text-card-foreground">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Vyberte kandidáta</CardTitle>
                    <CardDescription>
                        Zvolte jednoho kandidáta a potvrďte svůj hlas. Hlasovat lze pouze jednou.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={selectedCandidateId ?? ''}
                        onValueChange={setSelectedCandidateId}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {election.candidates.map((candidate) => {
                            const isSelected = selectedCandidateId === candidate.id;
                            return (
                                <div key={candidate.id}>
                                    <Label
                                        htmlFor={`candidate-${candidate.id}`}
                                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                            isSelected
                                                ? 'border-primary bg-primary/5 shadow-xs'
                                                : 'border-border hover:border-primary/50 bg-card'
                                        }`}
                                    >
                                        <RadioGroupItem
                                            value={candidate.id}
                                            id={`candidate-${candidate.id}`}
                                            className="mt-0.5"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-base leading-tight">
                                                {candidate.name}
                                            </span>
                                            {candidate.description && (
                                                <span className="text-sm font-normal text-muted-foreground">
                                                    {candidate.description}
                                                </span>
                                            )}
                                        </div>
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        disabled={!selectedCandidateId || isSubmitting}
                        className="gap-2 px-6"
                    >
                        <Vote className="size-4" />
                        <span>{isSubmitting ? 'Odesílání...' : 'Odeslat hlas'}</span>
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
