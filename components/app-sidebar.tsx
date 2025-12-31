"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    ScrollText,
    MapPinHouse,
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
import {
    Sidebar,
    SidebarContent,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import Setlist from "@/public/setlist.json";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setOpenMobile } = useSidebar();
    const setlistList = [
        [
            ...new Set(
                Object.keys(Setlist)
                    .map((date) => Setlist[date].tag)
                    .filter(Boolean)
                    .flat(),
            ),
        ].map((tag) => {
            return {
                title: tag,
                url: `/setlist/${encodeURIComponent(tag!)}`,
            };
        }),
        [
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
            }),
    ].flat();

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
            isActive: usePathname().startsWith("/setlist"),
            items: setlistList,
        },
        {
            title: "会場",
            url: "/place",
            icon: MapPinHouse,
            isActive: usePathname().startsWith("/place"),
            items: [
                {
                    title: "北海道 ・ 東北",
                    url: `/place/${encodeURIComponent("北海道 ・ 東北")}`,
                },
                {
                    title: "関東",
                    url: `/place/${encodeURIComponent("関東")}`,
                },
                {
                    title: "中部",
                    url: `/place/${encodeURIComponent("中部")}`,
                },
                {
                    title: "近畿",
                    url: `/place/${encodeURIComponent("近畿")}`,
                },
                {
                    title: "中国 ・ 四国",
                    url: `/place/${encodeURIComponent("中国 ・ 四国")}`,
                },
                {
                    title: "九州 ・ 沖縄",
                    url: `/place/${encodeURIComponent("九州 ・ 沖縄")}`,
                },
                {
                    title: "海外",
                    url: `/place/${encodeURIComponent("海外")}`,
                },
            ],
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
                                                                onClick={() =>
                                                                    setOpenMobile(
                                                                        false,
                                                                    )
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
                                        <Link
                                            href={item.url}
                                            onClick={() => setOpenMobile(false)}
                                        >
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
