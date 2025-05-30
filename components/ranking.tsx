"use client";

import Link from "next/link";
import { COUNTER } from "@/lib/ranking";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

export default function Ranking({
    title,
    ranking,
    max,
}: {
    title: string;
    ranking: COUNTER;
    max: number;
}) {
    const songlist: {
        count: number;
        song: string[];
    }[] = [];

    for (const song of Object.keys(ranking)) {
        if (songlist.at(-1)?.count === ranking[song]) {
            songlist.at(-1)!.song.push(song);
        } else if (songlist.length === max) {
            break;
        } else {
            songlist.push({
                count: ranking[song],
                song: [song],
            });
        }
    }

    return (
        <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
            <Table>
                <TableCaption>{title}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap w-[1%]">
                            順位
                        </TableHead>
                        <TableHead className="whitespace-nowrap w-[1%]">
                            回数
                        </TableHead>
                        <TableHead>タイトル</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {songlist.map((x, index) => (
                        <TableRow key={index + 1}>
                            <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                <div className="py-2 md:inline md:py-0">
                                    {index + 1}位
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                <div className="py-2 md:inline md:py-0">
                                    {x.count}回
                                </div>
                            </TableCell>
                            <TableCell>
                                {x.song.map((y) =>
                                    !(y.startsWith("-") && y.endsWith("-")) ? (
                                        <Link
                                            className="flex py-2 md:py-0"
                                            key={y}
                                            href={`/song/${encodeURIComponent(y)}`}
                                        >
                                            <span className="flex-1">{y}</span>
                                            <ChevronRight className="md:hidden" />
                                        </Link>
                                    ) : (
                                        <div
                                            className="flex py-2 md:py-0"
                                            key={y}
                                        >
                                            {y}
                                        </div>
                                    ),
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
