import { Link } from '@inertiajs/react';
import { Edit, ExternalLink } from 'lucide-react';
import { ElectionDeleteModal } from '@/components/election/election-delete-modal';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { edit } from '@/routes/admin/elections';
import { show } from '@/routes/elections';
import type { Election } from '@/types';

interface ElectionTableRowProps {
    election: Election;
}

export const ElectionTableRow = ({ election }: ElectionTableRowProps) => {
    const descriptionMaxLength = 64;
    const originalDescription = election.description ?? "";
    const electionDescription =
        originalDescription.substring(0, descriptionMaxLength) +
        (originalDescription.length  > descriptionMaxLength ? '...' : '');

    const electionStartDate = new Date(election.starts_at).toLocaleString(
        'cs-CZ',
        {
            dateStyle: 'medium',
            timeStyle: 'short',
        },
    );
    const electionEndDate = new Date(election.ends_at).toLocaleString('cs-CZ', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    return (
        <TableRow key={election.id}>
            <TableCell className={'flex flex-col'}>
                <span className={'text-base font-bold'}>{election.title}</span>
                <span className={'text-sm text-muted-foreground'}>
                    {electionDescription}
                </span>
            </TableCell>
            <TableCell>{electionStartDate}</TableCell>
            <TableCell>{electionEndDate}</TableCell>
            <TableCell>
                <div className={'flex h-full items-center justify-end gap-2'}>
                    <Link href={show(election.id)}>
                        <Button variant={'outline'} size={'icon'}>
                            <ExternalLink />
                        </Button>
                    </Link>
                    <Link href={edit(election.id)}>
                        <Button variant={'outline'} size={'icon'}>
                            <Edit />
                        </Button>
                    </Link>
                    <ElectionDeleteModal election={election} />
                </div>
            </TableCell>
        </TableRow>
    );
};
