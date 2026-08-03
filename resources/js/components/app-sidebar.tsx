import { Link } from '@inertiajs/react';
import { BookOpen, House, Vote } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { index as adminIndex } from '@/routes/admin';
import { index as electionsIndex } from '@/routes/admin/elections';
import type { NavItem } from '@/types';
import { home } from '@/routes';

const mainNavItems: NavItem[] = [
    {
        title: 'Hlavní panel',
        href: adminIndex(),
        icon: House,
    },
    {
        title: 'Přehled voleb',
        href: electionsIndex(),
        icon: Vote,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Wiki',
        href: 'https://wiki.rpmc.cz',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
