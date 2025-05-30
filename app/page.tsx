"use client";

import Header from "@/components/header";
import SetList from "@/components/setlist";
import Setlist from "@/public/setlist.json";

export default function Home() {
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
            <SetList date={Object.keys(Setlist).pop()!} />
        </>
    );
}
