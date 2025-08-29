"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import Filter from "@/components/filter";
import { calc } from "@/lib/ranking";

export default function Page() {
    const path = [
        {
            title: "曲",
            url: "/song",
        },
    ];

    const [filter, setFilter] = React.useState<Record<string, boolean>>();
    const { best } = calc("", filter);

    return (
        <>
            <Header path={path}></Header>
            <Filter target="" filter={filter} setFilter={setFilter} />
            <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>タイトル</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.keys(best).map((x) => (
                            <TableRow key={x}>
                                <TableCell>
                                    <Link
                                        className="flex py-2 md:py-0"
                                        href={`/song/${encodeURIComponent(x)}`}
                                    >
                                        <span className="flex-1">{x}</span>
                                        <ChevronRight className="md:hidden" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
