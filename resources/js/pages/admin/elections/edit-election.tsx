import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit } from 'lucide-react';
import { ElectionForm } from '@/components/election/election-form';
import { Button } from '@/components/ui/button';
import { index as adminIndex } from '@/routes/admin';
import {
    edit,
    index as electionsIndex,
    update,
} from '@/routes/admin/elections';
import type { Candidate, Election } from '@/types';

interface EditElectionProps {
    election: Election & { candidates: Candidate[] };
}

export default function EditElection({ election }: EditElectionProps) {
    return (
        <>
            <Head title={`Upravit volby - ${election.title}`} />
            <section className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex flex-row flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Edit className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">
                                Upravit volby
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Upravte informace, časový harmonogram nebo
                                seznam kandidátů.
                            </p>
                        </div>
                    </div>
                    <Link href={electionsIndex()}>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Zpět na přehled
                        </Button>
                    </Link>
                </div>

                <ElectionForm
                    election={election}
                    submitUrl={update.url(election.id)}
                    method="put"
                    submitLabel="Uložit změny"
                />
            </section>
        </>
    );
}

EditElection.layout = {
    breadcrumbs: [
        {
            title: 'Admin',
            href: adminIndex(),
        },
        {
            title: 'Přehled voleb',
            href: electionsIndex(),
        },
        {
            title: 'Upravit volby',
            href: edit,
        },
    ],
};
