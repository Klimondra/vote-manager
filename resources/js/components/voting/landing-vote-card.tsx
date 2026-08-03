import { Link } from '@inertiajs/react';
import type { Election } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { show } from '@/routes/elections';

interface LandingVoteCardProps {
    election: Election;
}

export function LandingVoteCard({ election }: LandingVoteCardProps) {
    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle>{election.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{election.description}</p>
            </CardContent>
            <CardFooter>
                <Link href={show(election.id)} className="w-full">
                    <Button className="w-full">
                        <span>Přejít na volby</span>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default LandingVoteCard;
