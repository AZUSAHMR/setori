"use client";

import * as React from "react";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { ChevronRight, Instagram, Twitter } from "lucide-react";
import { COUNTER, count, sort } from "@/lib/ranking";
import {
    Table,
    TableCaption,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import Schedule from "@/public/schedule.json";
import Setlist from "@/public/setlist.json";

export default function Page({
    params,
}: {
    params: Promise<{ place?: string[] }>;
}) {
    const path = [
        {
            title: "会場",
            url: "/place",
        },
    ];

    const place = decodeURIComponent(React.use(params).place?.[0] || "");

    if (place !== "") {
        path.push({
            title: place,
            url: `/place/${encodeURIComponent(place)}`,
        });
    }

    const date = Object.keys(Schedule)
        .filter(
            (x) =>
                differenceInDays(
                    TZDate.tz("Asia/Tokyo"),
                    new TZDate(x, "Asia/Tokyo"),
                ) <= 0,
        )
        .filter(
            (x) =>
                place === "" ||
                Schedule[x].place === place ||
                Schedule[x].area === place,
        );

    const livehouse: COUNTER = {};
    [
        ...Object.keys(Setlist)
            .filter((x) => place === "" || Setlist[x].area === place)
            .map((x) => Setlist[x].place),
        ...Object.keys(Schedule)
            .filter((x) => place === "" || Schedule[x].area === place)
            .map((x) => Schedule[x].place),
    ].forEach((x) => count(livehouse, x));
    sort(livehouse);

    const liveDate = Object.keys(Setlist)
        .filter(
            (x) =>
                place === "" ||
                Setlist[x].place === place ||
                Setlist[x].area === place,
        )
        .reverse();

    return (
        <>
            <Header path={path}></Header>
            {date.length > 0 && (
                <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
                    <Table>
                        <TableCaption>次のスケジュール</TableCaption>
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
                                                href={
                                                    Schedule[x].link.instagram
                                                }
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
            )}
            {Object.keys(livehouse).length > 0 && (
                <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
                    <Table>
                        <TableCaption>ここの会場</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>会場</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.keys(livehouse).map((x) => (
                                <TableRow key={x}>
                                    <TableCell>
                                        <Link
                                            className="flex py-2 md:py-0"
                                            href={`/place/${encodeURIComponent(x)}`}
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
            )}
            {liveDate.length > 0 && (
                <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
                    <Table>
                        <TableCaption>ここでのセットリスト</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap w-[1%]">
                                    日付
                                </TableHead>
                                <TableHead>会場</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {liveDate.map((x) => (
                                <TableRow key={x}>
                                    <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                        <Link
                                            className="flex py-2 md:py-0"
                                            href={`/setlist/${x}`}
                                        >
                                            {x}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className="flex py-2 md:py-0"
                                            href={`/setlist/${x}`}
                                        >
                                            <span className="flex-1">
                                                {Setlist[x].place}
                                            </span>
                                            <ChevronRight className="md:hidden" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}
