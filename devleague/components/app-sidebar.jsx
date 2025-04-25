'use client';

import Link from 'next/link';
import { Home, Inbox } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { useAdminAuth } from '@/app/admin/contexts/AdminAuthContext';

const items = [
  {
    title: 'Hackathon Create',
    url: '/admin/dashboard/create',
    icon: Home,
  },
  {
    title: 'Hackathon List',
    url: '/admin/dashboard/hackathon',
    icon: Inbox,
  },
];

export function AppSidebar() {
  const { logout } = useAdminAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Button
        className="m-5 cursor-pointer"
        onClick={() => {
          (async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout failed:', error);
            }
          })();
        }}
      >
        Logout
      </Button>
    </Sidebar>
  );
}
