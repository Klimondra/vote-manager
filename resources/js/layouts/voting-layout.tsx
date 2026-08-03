import VotingNavbar from '@/components/voting/voting-navbar';

export default function VotingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className={"relative w-full flex flex-col"}>
                <VotingNavbar />
                <div className='px-4 py-8'>
                    {children}
                </div>
            </main>
        </>
    );
}
