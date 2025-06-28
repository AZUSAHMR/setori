"use client";

import * as React from "react";
import { differenceInCalendarDays } from "date-fns";
import { TZDate } from "@date-fns/tz";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import Ranking from "@/components/ranking";
import { COUNTER, count, sort, calc } from "@/lib/ranking";
import Setlist from "@/public/setlist.json";
import Song from "@/public/song.json";

const calcDate = (date1: string, date2?: string) => {
    return differenceInCalendarDays(
        date2 ? new TZDate(date2, "Asia/Tokyo") : TZDate.tz("Asia/Tokyo"),
        new TZDate(date1, "Asia/Tokyo"),
    );
};
const getRanking = (ranking: COUNTER, target: string) => {
    let rank = 0;
    let count = 0;

    for (const song of Object.keys(ranking)) {
        if (count !== ranking[song]) {
            rank++;
            count = ranking[song];
        }

        if (song === target) {
            return {
                rank,
                count,
            };
        }
    }
};

export default function Page({
    params,
}: {
    params: Promise<{ song: string }>;
}) {
    const { song } = React.use(params);
    const title = decodeURIComponent(song);

    const path = [
        {
            title: "曲",
            url: "/song",
        },
        {
            title: title,
            url: `/song/${song}`,
        },
    ];

    const date = Object.keys(Setlist)
        .filter(
            (date) =>
                Setlist[date].setlist.flat().includes(title) ||
                Setlist[date].encore?.flat().includes(title),
        )
        .reverse();

    let dateSum = 0;
    let countSum = 0;

    for (let i = 0; i < date.length - 1; i++) {
        dateSum += calcDate(date[i + 1], date[i]);
        countSum +=
            Object.keys(Setlist).indexOf(date[i]) -
            Object.keys(Setlist).indexOf(date[i + 1]);
    }

    const dateAver = Math.round((dateSum / (date.length - 1)) * 10) / 10;
    const countAver = Math.round((countSum / (date.length - 1)) * 10) / 10;

    const before: COUNTER = {};
    const after: COUNTER = {};

    for (const target of date) {
        for (let i = 0; i < Setlist[target].setlist.length; i++) {
            const j = Setlist[target].setlist[i].indexOf(title);

            if (j !== -1) {
                if (j === 0) {
                    if (i === 0) {
                        count(before, "-START-");
                    } else {
                        count(before, "-MC-");
                    }
                    count(after, Setlist[target].setlist[i][j + 1]);
                } else if (j === Setlist[target].setlist[i].length - 1) {
                    count(before, Setlist[target].setlist[i][j - 1]);
                    if (i === Setlist[target].setlist.length - 1) {
                        count(after, "-END-");
                    } else {
                        count(after, "-MC-");
                    }
                } else {
                    count(before, Setlist[target].setlist[i][j - 1]);
                    count(after, Setlist[target].setlist[i][j + 1]);
                }

                break;
            }
        }

        if (Setlist[target].encore) {
            for (const encore of Setlist[target].encore) {
                const i = encore.indexOf(title);

                if (i !== -1) {
                    if (i > 0) {
                        count(before, encore[i - 1]);
                    }
                    if (i < Setlist[target].encore.length - 1) {
                        count(after, encore[i + 1]);
                    }
                }
            }
        }
    }

    sort(before);
    sort(after);

    const { best, encore, start, end } = calc();

    const rankingBest = getRanking(best, title);
    const rankingEncore = getRanking(encore, title);
    const rankingStart = getRanking(start, title);
    const rankingEnd = getRanking(end, title);

    return (
        <>
            <Header path={path}></Header>
            {Song[title]?.youtube && (
                <div className="flex flex-col gap-4 p-4 pt-0 items-center md:flex-row md:justify-center">
                    {Song[title].youtube.map((code) => (
                        <div key={code}>
                            <iframe
                                className="w-full max-w-[250px] aspect-square"
                                src={`https://www.youtube.com/embed/${code}?playsinline=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className="flex flex-col gap-4 p-4 pt-0">
                <div className="flex-1 rounded-xl bg-muted/50 p-4">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                    最近登場
                                </TableCell>
                                <TableCell>
                                    <Link
                                        className="flex"
                                        href={`/setlist/${date.at(0)!}`}
                                    >
                                        <span className="flex-1">
                                            {date.at(0)}{" "}
                                            {Setlist[date.at(0)!].place} (
                                            {calcDate(date.at(0)!)}日前)
                                        </span>
                                        <ChevronRight className="md:hidden" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                            {!!countAver && (
                                <TableRow>
                                    <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                        平均登場
                                    </TableCell>
                                    <TableCell>
                                        約{countAver}回毎に ・ 約{dateAver}
                                        日毎に
                                    </TableCell>
                                </TableRow>
                            )}
                            {rankingBest && (
                                <TableRow>
                                    <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                        登場回数
                                    </TableCell>
                                    <TableCell>
                                        {rankingBest.count}回 (
                                        {rankingBest.rank}位)
                                    </TableCell>
                                </TableRow>
                            )}
                            {rankingEncore && (
                                <TableRow>
                                    <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                        再聴回数
                                    </TableCell>
                                    <TableCell>
                                        {rankingEncore.count}回 (
                                        {rankingEncore.rank}位)
                                    </TableCell>
                                </TableRow>
                            )}
                            {rankingStart && (
                                <TableRow>
                                    <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                        開始回数
                                    </TableCell>
                                    <TableCell>
                                        {rankingStart.count}回 (
                                        {rankingStart.rank}位)
                                    </TableCell>
                                </TableRow>
                            )}
                            {rankingEnd && (
                                <TableRow>
                                    <TableCell className="whitespace-nowrap w-[1%] font-medium">
                                        終了回数
                                    </TableCell>
                                    <TableCell>
                                        {rankingEnd.count}回 ({rankingEnd.rank}
                                        位)
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Ranking title="前でよく出る" ranking={before} max={5} />
            <Ranking title="後でよく出る" ranking={after} max={5} />
            <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
                <Table>
                    <TableCaption>ここで出る</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap w-[1%]">
                                日付
                            </TableHead>
                            <TableHead>会場</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {date.map((x) => (
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
        </>
    );
}
