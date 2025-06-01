"use client";

import Link from "next/link";
import { differenceInCalendarDays } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { Instagram, Twitter } from "lucide-react";
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
import SetList from "@/components/setlist";
import Setlist from "@/public/setlist.json";
import Schedule from "@/public/schedule.json";

export default function Home() {
    const now = TZDate.tz("Asia/Tokyo");
    const [date] = Object.keys(Schedule).filter(
        (x) => differenceInCalendarDays(now, new TZDate(x, "Asia/Tokyo")) <= 0,
    );
    const diff = differenceInCalendarDays(new TZDate(date, "Asia/Tokyo"), now);

    return (
        <>
            <Header
                path={[
                    {
                        title: "ホーム",
                        url: "/",
                    },
                ]}
            ></Header>
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
                        <TableRow>
                            <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                {date} {diff > 0 && `(${diff}日後)`}
                            </TableCell>
                            <TableCell>
                                <Link
                                    className="block"
                                    href={`/place/${encodeURIComponent(Schedule[date].place)}`}
                                >
                                    {Schedule[date].place}
                                </Link>
                            </TableCell>
                            <TableCell className="whitespace-nowrap w-[1%]">
                                {Schedule[date].open}
                            </TableCell>
                            <TableCell className="whitespace-nowrap w-[1%]">
                                {Schedule[date].start}
                            </TableCell>
                            <TableCell className="whitespace-nowrap w-[1%]">
                                {Schedule[date].link.instagram && (
                                    <Link
                                        href={Schedule[date].link.instagram}
                                        target="_blank"
                                    >
                                        <Instagram className="inline mx-1" />
                                    </Link>
                                )}
                                {Schedule[date].link.twitter && (
                                    <Link
                                        href={Schedule[date].link.twitter}
                                        target="_blank"
                                    >
                                        <Twitter className="inline mx-1" />
                                    </Link>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <SetList date={Object.keys(Setlist).pop()!} />
        </>
    );
}
