import { Head } from '@inertiajs/react';
import LandingVoteCard from '@/components/voting/landing-vote-card';
import type { Election } from '@/types';

interface LandingPageProps {
    elections: Election[];
}

export default function LandingPage({ elections }: LandingPageProps) {
    const runningElections = elections.filter(election => new Date(election.ends_at) > new Date());
    const pastElections = elections.filter(election => new Date(election.ends_at) <= new Date());

    return (
        <>
            <Head title="Respublica volby" />
            <section className="w-full max-w-5xl mx-auto flex flex-col gap-10 mt-2">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Probíhající a nadcházející volby</h1>
                    {runningElections.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {runningElections.map(election => (
                                <LandingVoteCard key={election.id} election={election} />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-4 text-foreground-muted">Momentálně nejsou žádné probíhající volby.</p>
                    )}
                </div>

                {pastElections.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">Minulé volby</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {pastElections.map(election => (
                                <LandingVoteCard key={election.id} election={election} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
