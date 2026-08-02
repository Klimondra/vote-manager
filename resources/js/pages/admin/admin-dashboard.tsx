import { Head, Link } from '@inertiajs/react';
import { Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { index as adminIndex } from '@/routes/admin';
import { create as electionCreate, index as electionsIndex } from '@/routes/admin/elections';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin" />
            <section className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-x-auto rounded-xl p-4">
                <Vote className={'h-16 w-auto text-primary'} />
                <div className="flex w-full flex-col items-center justify-center">
                    <h2 className={'text-center text-2xl font-bold'}>
                        Tady toho moc nevykoumáš...
                    </h2>
                    <p className={'text-center text-muted-foreground'}>
                        Na týhle stránce toho zatím moc není, protože nevím co
                        tu dát...
                    </p>
                </div>
                <div className={'mt-4 flex flex-row items-center gap-2'}>
                    <Link href={electionsIndex()}>
                        <Button variant={'default'}>Přehled voleb</Button>
                    </Link>
                    <Link href={electionCreate()}>
                        <Button variant={'outline'}>Nové volby</Button>
                    </Link>
                </div>
            </section>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin',
            href: adminIndex(),
        },
    ],
};
