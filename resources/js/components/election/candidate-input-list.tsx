import { Plus, Trash2, UserPlus } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface CandidateInput {
    name: string;
    description: string;
}

interface CandidateInputListProps {
    candidates: CandidateInput[];
    onChange: (candidates: CandidateInput[]) => void;
    errors: Record<string, string | undefined>;
}

export function CandidateInputList({
    candidates,
    onChange,
    errors,
}: CandidateInputListProps) {
    const handleAddCandidate = () => {
        onChange([...candidates, { name: '', description: '' }]);
    };

    const handleRemoveCandidate = (index: number) => {
        onChange(candidates.filter((_, i) => i !== index));
    };

    const handleCandidateChange = (
        index: number,
        field: keyof CandidateInput,
        value: string,
    ) => {
        const updated = candidates.map((candidate, i) => {
            if (i === index) {
                return { ...candidate, [field]: value };
            }

            return candidate;
        });
        onChange(updated);
    };

    return (
        <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                <div>
                    <CardTitle className="text-xl font-semibold">
                        Kandidáti
                    </CardTitle>
                    <CardDescription className="mt-1">
                        Přidejte kandidáty, pro které bude možné v těchto
                        volbách hlasovat.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddCandidate}
                    className="flex shrink-0 items-center gap-1.5"
                >
                    <UserPlus className="h-4 w-4" />
                    Přidat kandidáta
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <InputError message={errors.candidates} />

                {candidates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <UserPlus className="mb-2 h-8 w-8 text-muted-foreground/60" />
                        <p className="text-sm font-medium text-muted-foreground">
                            Zatím nebyli přidáni žádní kandidáti
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground/80">
                            Kandidáty můžete přidat nyní nebo později.
                        </p>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={handleAddCandidate}
                            className="mt-4 flex items-center gap-1.5"
                        >
                            <Plus className="h-4 w-4" />
                            Přidat prvního kandidáta
                        </Button>
                    </div>
                ) : (
                    candidates.map((candidate, index) => (
                        <Card
                            key={index}
                            className="relative border bg-muted/30 p-4 shadow-none transition-colors hover:bg-muted/50"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                        Kandidát #{index + 1}
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            handleRemoveCandidate(index)
                                        }
                                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        title="Odebrat kandidáta"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">
                                            Odebrat kandidáta #{index + 1}
                                        </span>
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor={`candidate-name-${index}`}
                                        >
                                            Jméno kandidáta{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id={`candidate-name-${index}`}
                                            type="text"
                                            value={candidate.name}
                                            onChange={(e) =>
                                                handleCandidateChange(
                                                    index,
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Jan Novák"
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `candidates.${index}.name`
                                                ]
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor={`candidate-desc-${index}`}
                                        >
                                            Popis / Vizitka
                                        </Label>
                                        <Textarea
                                            id={`candidate-desc-${index}`}
                                            value={candidate.description}
                                            onChange={(e) =>
                                                handleCandidateChange(
                                                    index,
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Stručný popis nebo volební program kandidáta"
                                            rows={2}
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `candidates.${index}.description`
                                                ]
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
