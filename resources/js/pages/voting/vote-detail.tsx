import { Head } from '@inertiajs/react';
import VoteSection from '@/components/voting/vote-section';
import VotingInfo from '@/components/voting/voting-info';
import type { ElectionRich } from '@/types';

interface VoteDetailProps {
    election: ElectionRich;
    hasVoted?: boolean;
}

export default function VoteDetail({ election, hasVoted }: VoteDetailProps) {

    return (
        <>
            <Head title={election.title} />
            <section className="w-full max-w-5xl mx-auto flex flex-col gap-8">
                <VotingInfo title={election.title} description={election.description} starts_at={election.starts_at} ends_at={election.ends_at} />
                <VoteSection election={election} hasVoted={hasVoted} />
            </section>
        </>
    );
}
