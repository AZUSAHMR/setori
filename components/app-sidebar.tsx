"use client";

import * as React from "react";
import {
    House,
    ScrollText,
    CalendarCheck,
    ChartArea,
    Music,
    ChevronRight,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import Link from "next/link";

import Setlist from "@/public/setlist.json";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const setlistList = [
        ...new Set(
            Object.keys(Setlist)
                .reverse()
                .map((date) => date.split("/").slice(0, -1).join("/")),
        ),
    ]
        .map((date) => date.split("/"))
        .map((date) => {
            return {
                title: `${date.join("年")}月`.substring(2),
                url: `/setlist/${date.join("/")}`,
            };
        });

    const items = [
        {
            title: "ホーム",
            url: "/",
            icon: House,
        },
        {
            title: "スケジュール",
            url: "/schedule",
            icon: CalendarCheck,
        },
        {
            title: "統計",
            url: "/stats",
            icon: ChartArea,
        },
        {
            title: "セットリスト",
            url: "/setlist",
            icon: ScrollText,
            isActive: true,
            items: setlistList,
        },
        {
            title: "曲",
            url: "/song",
            icon: Music,
        },
    ];

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>セットリスト</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map((item) =>
                            item.items ? (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem key={item.title}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ),
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
