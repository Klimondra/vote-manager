import { Link, usePage } from "@inertiajs/react"
import { LogOut } from "lucide-react";
import { home, logout } from "@/routes";
import { login_with_discord } from "@/routes/auth";
import { Button } from "../ui/button";

export default function VotingNavbar() {
    const { auth } = usePage().props;

    return (
        <header className={"sticky top-0 z-10 bg-primary text-primary-foreground p-4 shadow-sm"}>
            <div className={"w-full max-w-5xl mx-auto flex flex-row items-center justify-between gap-4"}>
                <Link href={home()} className={"flex flex-row items-center gap-4"}>
                    <img src={"/rpmc-logo.webp"} alt={"Respublica Logo"} className={"size-6"} />
                    <h1 className={"text-lg font-semibold"}>Respublica volby</h1>
                </Link>

                {auth.user ? (
                    <div className="flex flex-row items-center gap-4">
                        <span>{auth.user.username}</span>
                        <Link href={logout()}>
                            <Button variant={"secondary"} className="hidden sm:inline-flex">Odhlásit se</Button>
                            <Button variant={"secondary"} size="icon" className="sm:hidden inline-flex">
                                <LogOut className="size-4" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <a href={login_with_discord().url}>
                        <Button variant={"secondary"}>Přihlásit se</Button>
                    </a>
                )}
            </div>
        </header>
    )
}
