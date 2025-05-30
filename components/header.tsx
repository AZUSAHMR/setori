"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Header({
    path,
}: {
    path: { title: string; url: string }[];
}) {
    const list = path
        .slice(0, -1)
        .map((x) => [
            <BreadcrumbItem key={x.title} className="hidden md:block">
                <BreadcrumbLink href={x.url}>{x.title}</BreadcrumbLink>
            </BreadcrumbItem>,
            <BreadcrumbSeparator
                key={`${x.title}_separator`}
                className="hidden md:block"
            />,
        ])
        .flat();

    const { title } = path.at(-1)!;
    list.push(
        <BreadcrumbItem key={title}>
            <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>,
    );

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>{list}</BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
