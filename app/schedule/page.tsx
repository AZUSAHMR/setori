"use client";

import * as React from "react";
import Link from "next/link";
import { differenceInCalendarDays } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { Instagram, Twitter } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import Schedule from "@/public/schedule.json";

export default function Page() {
    const path = [
        {
            title: "スケジュール",
            url: "/schedule",
        },
    ];

    const date = Object.keys(Schedule).filter(
        (x) =>
            differenceInCalendarDays(
                TZDate.tz("Asia/Tokyo"),
                new TZDate(x, "Asia/Tokyo"),
            ) <= 0,
    );

    return (
        <>
            <Header path={path}></Header>
            <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap w-[1%]">
                                日付
                            </TableHead>
                            <TableHead>会場</TableHead>
                            <TableHead className="whitespace-nowrap w-[1%]">
                                OPEN
                            </TableHead>
                            <TableHead className="whitespace-nowrap w-[1%]">
                                START
                            </TableHead>
                            <TableHead className="whitespace-nowrap w-[1%]">
                                #
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {date.map((x) => (
                            <TableRow key={x}>
                                <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                    {x}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        className="block"
                                        href={`/place/${encodeURIComponent(Schedule[x].place)}`}
                                    >
                                        {Schedule[x].place}
                                    </Link>
                                </TableCell>
                                <TableCell className="whitespace-nowrap w-[1%]">
                                    {Schedule[x].open}
                                </TableCell>
                                <TableCell className="whitespace-nowrap w-[1%]">
                                    {Schedule[x].start}
                                </TableCell>
                                <TableCell className="whitespace-nowrap w-[1%]">
                                    {Schedule[x].link.instagram && (
                                        <Link
                                            href={Schedule[x].link.instagram}
                                            target="_blank"
                                        >
                                            <Instagram className="inline mx-1" />
                                        </Link>
                                    )}
                                    {Schedule[x].link.twitter && (
                                        <Link
                                            href={Schedule[x].link.twitter}
                                            target="_blank"
                                        >
                                            <Twitter className="inline mx-1" />
                                        </Link>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
