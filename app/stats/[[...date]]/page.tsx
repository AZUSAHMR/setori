"use client";

import * as React from "react";
import { calc } from "@/lib/ranking";
import Header from "@/components/header";
import Ranking from "@/components/ranking";
import Filter from "@/components/filter";

export default function Page({
    params,
}: {
    params: Promise<{ date?: string[] }>;
}) {
    const path = [
        {
            title: "統計",
            url: "/stats",
        },
    ];

    const { date } = React.use(params);
    const target = date?.map((x) => ~~x).join("/") || "";

    date
        ?.slice(0, 2)
        .map((x) => ~~x)
        .forEach((x, index) => {
            path.push({
                title: `${x}${["年", "月"][index]}`,
                url: `/stats/${date.slice(0, index + 1).join("/")}`,
            });
        });

    const [filter, setFilter] = React.useState<Record<string, boolean>>();
    const { best, encore, start, end, beforeMC, afterMC } = calc(
        target,
        filter,
    );

    return (
        <>
            <Header path={path}></Header>
            <Filter target={target} filter={filter} setFilter={setFilter} />
            <Ranking title="よく出る" ranking={best} max={10} />
            <Ranking title="アンコールでよく出る" ranking={encore} max={5} />
            <Ranking title="これでよく始まる" ranking={start} max={5} />
            <Ranking title="これでよく終わる" ranking={end} max={5} />
            <Ranking title="これの後でよくMCする" ranking={beforeMC} max={5} />
            <Ranking title="MCの後よく出る" ranking={afterMC} max={5} />
        </>
    );
}
