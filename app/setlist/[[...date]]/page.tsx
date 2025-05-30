"use client";

import * as React from "react";
import SetList from "@/components/setlist";
import Header from "@/components/header";
import Setlist from "@/public/setlist.json";

export default function Page({
    params,
}: {
    params: Promise<{ date?: string[] }>;
}) {
    const path = [
        {
            title: "セットリスト",
            url: "/setlist",
        },
    ];

    const { date } = React.use(params);
    const target = date?.map((x) => ~~x).join("/") || "";

    date
        ?.slice(0, 3)
        .map((x) => ~~x)
        .forEach((x, index) => {
            path.push({
                title: `${x}${["年", "月", "日"][index]}`,
                url: `/setlist/${date.slice(0, index + 1).join("/")}`,
            });
        });

    return (
        <>
            <Header path={path}></Header>
            {Object.keys(Setlist)
                .filter((x) => x.startsWith(target))
                .reverse()
                .map((x) => (
                    <SetList date={x} key={x}></SetList>
                ))}
        </>
    );
}
