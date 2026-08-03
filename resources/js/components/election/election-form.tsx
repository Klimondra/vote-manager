import { Link, useForm } from '@inertiajs/react';
import { Calendar, Check } from 'lucide-react';
import type React from 'react';
import {
    CandidateInputList,
    type CandidateInput,
} from '@/components/election/candidate-input-list';
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
import { index as electionsIndex } from '@/routes/admin/elections';
import type { Candidate, Election } from '@/types';

function formatDateTimeForInput(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export interface ElectionFormData {
    title: string;
    description: string;
    starts_at: string;
    ends_at: string;
    candidates: CandidateInput[];
}

interface ElectionFormProps {
    election?: Election & { candidates?: Candidate[] };
    submitUrl: string;
    method?: 'post' | 'put';
    submitLabel?: string;
}

export function ElectionForm({
    election,
    submitUrl,
    method = 'post',
    submitLabel = 'Uložit',
}: ElectionFormProps) {
    const { data, setData, post, put, processing, errors } =
        useForm<ElectionFormData>({
            title: election?.title ?? '',
            description: election?.description ?? '',
            starts_at: formatDateTimeForInput(election?.starts_at),
            ends_at: formatDateTimeForInput(election?.ends_at),
            candidates:
                election?.candidates?.map((candidate) => ({
                    name: candidate.name,
                    description: candidate.description ?? '',
                })) ?? [],
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (method === 'put') {
            put(submitUrl);
        } else {
            post(submitUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Základní informace */}
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Základní informace
                    </CardTitle>
                    <CardDescription>
                        Název a popis voleb se zobrazí voličům před hlasováním.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            Název voleb{' '}
                            <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="např. Volby do akademického senátu 2026"
                            required
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Popis voleb</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="Podrobnější informace o průběhu nebo účelu voleb..."
                            rows={4}
                        />
                        <InputError message={errors.description} />
                    </div>
                </CardContent>
            </Card>

            {/* Časový harmonogram */}
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        Časový harmonogram
                    </CardTitle>
                    <CardDescription>
                        Určete, od kdy do kdy budou volby aktivní pro hlasování.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="starts_at">
                                Začátek voleb{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="starts_at"
                                type="datetime-local"
                                value={data.starts_at}
                                onChange={(e) =>
                                    setData('starts_at', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.starts_at} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="ends_at">
                                Konec voleb{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="ends_at"
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(e) =>
                                    setData('ends_at', e.target.value)
                                }
                                required
                            />
                            <InputError message={errors.ends_at} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Kandidáti */}
            <CandidateInputList
                candidates={data.candidates}
                onChange={(candidates) => setData('candidates', candidates)}
                errors={errors}
            />

            {/* Akční tlačítka */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <Link href={electionsIndex()}>
                    <Button type="button" variant="outline">
                        Zrušit
                    </Button>
                </Link>
                <Button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2"
                >
                    <Check className="h-4 w-4" />
                    {processing ? 'Ukládám...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}
