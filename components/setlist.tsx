"use client";

import Link from "next/link";
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
import Setlist from "@/public/setlist.json";

function Song({ index, song }: { index: number; song: string }) {
    return (
        <TableRow>
            <TableCell className="whitespace-nowrap w-[1%] font-medium">
                <div className="py-2 md:inline md:py-0">
                    {index ? `${index}`.padStart(2, "0") : ""}
                </div>
            </TableCell>
            <TableCell>
                {!(song.startsWith("-") && song.endsWith("-")) ? (
                    <Link
                        className="flex py-2 md:py-0"
                        href={`/song/${encodeURIComponent(song)}`}
                    >
                        <span className="flex-1">{song}</span>
                        <ChevronRight className="md:hidden" />
                    </Link>
                ) : (
                    song
                )}
            </TableCell>
        </TableRow>
    );
}

export default function SetList({ date }: { date: string }) {
    const data = Setlist[date];

    const setlist = [];
    let index = 1;

    setlist.push(
        ...data.setlist
            .map((part, n) => [
                ...part.map((song) => (
                    <Song key={`${index}`} index={index++} song={song}></Song>
                )),
                <Song key={`mc${n + 1}`} index={0} song="-MC-"></Song>,
            ])
            .flat(),
    );
    setlist.pop();

    if (data.encore) {
        for (let i = 0; i < data.encore.length; i++) {
            setlist.push(
                <Song
                    key={`encore${i}`}
                    index={0}
                    song={`-${["", "double "][i]}encore-`}
                ></Song>,
            );
            setlist.push(
                ...data.encore[i].map((song) => (
                    <Song key={`${index}`} index={index++} song={song}></Song>
                )),
            );
        }
    }

    return (
        <div className="rounded-xl bg-muted/50 m-4 mt-0 p-4">
            <Table>
                <TableCaption>
                    {date} {data.place}
                    {data.tag && (
                        <div className="text-xs">{data.tag.join(" · ")}</div>
                    )}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap w-[1%]">
                            #
                        </TableHead>
                        <TableHead>タイトル</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>{setlist}</TableBody>
            </Table>
        </div>
    );
}
