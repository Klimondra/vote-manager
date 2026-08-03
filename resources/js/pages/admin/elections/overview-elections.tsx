import { Head, Link } from '@inertiajs/react';
import { ElectionTableRow } from '@/components/election/election-table-row';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index as adminIndex } from '@/routes/admin';
import { create, index as electionsIndex } from '@/routes/admin/elections';
import type { Election } from '@/types';

interface OverviewElectionsProps {
    elections: Election[];
}

export default function OverviewElections({
    elections,
}: OverviewElectionsProps) {
    return (
        <>
            <Head title="Admin" />
            <section className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-6">
                <div className="flex flex-row flex-wrap justify-between gap-4">
                    <h2 className="text-2xl font-bold">Přehled voleb</h2>
                    <Link href={create()}>
                        <Button>Nové volby</Button>
                    </Link>
                </div>
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Název</TableHead>
                            <TableHead>Začátek</TableHead>
                            <TableHead>Konec</TableHead>
                            <TableHead className={'text-end'}>Akce</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {elections.map((election) => (
                            <ElectionTableRow
                                election={election}
                                key={election.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            </section>
        </>
    );
}

OverviewElections.layout = {
    breadcrumbs: [
        {
            title: 'Admin',
            href: adminIndex(),
        },
        {
            title: 'Přehled voleb',
            href: electionsIndex(),
        },
    ],
};
