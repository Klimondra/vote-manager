import { router } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/admin/elections';
import type { Election } from '@/types';

interface ElectionDeleteModalProps {
    election: Election;
}

export const ElectionDeleteModal = ({ election }: ElectionDeleteModalProps) => {
    function deleteElection() {
        router.delete(destroy(election.id));
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant={'destructive'} size={'icon'}>
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Jsi si jistý?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Opravdu chceš smazat volby "{election.title}" ? Tato
                        akce je nevratná.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant={'destructive'}
                        onClick={deleteElection}
                    >
                        Smazat
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
