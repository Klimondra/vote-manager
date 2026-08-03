import { MoveRight } from "lucide-react";

interface VotingInfoProps {
    title: string;
    description: string;
    starts_at: string;
    ends_at: string;
}

export default function VotingInfo(props: VotingInfoProps) {
    const isElectionRunning = new Date(props.starts_at) <= new Date() && new Date(props.ends_at) >= new Date();
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }

    return (
        <div className='flex flex-col items-start gap-2'>
            <h2 className='text-3xl font-bold'>{props.title}</h2>
            <p className='text-muted-foreground'>{props.description}</p>
            <span className='flex flex-row items-center px-3 py-1 bg-primary/20 rounded-full text-sm gap-2 mt-1'>
                <span className='text-muted-foreground'>Volby {isElectionRunning ? "probíhají" : "proběhly"}</span>
                <span className='text-muted-foreground'>{new Date(props.starts_at).toLocaleString("cs-CZ", dateFormatOptions)}</span>
                <MoveRight className='size-4 text-muted-foreground' />
                <span className='text-muted-foreground'>{new Date(props.ends_at).toLocaleString("cs-CZ", dateFormatOptions)}</span>
            </span>
        </div>
    )
}
