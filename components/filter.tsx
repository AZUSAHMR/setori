"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Setlist from "@/public/setlist.json";

export const pivot = (x: string, filter?: Record<string, boolean>) =>
    !filter ||
    filter.all ||
    Setlist[x].tag?.map((tag) => filter[tag]).some(Boolean) ||
    (!Setlist[x].tag && filter.etc);

export default function Filter({
    target,
    filter,
    setFilter,
}: {
    target: string;
    filter?: Record<string, boolean>;
    setFilter: React.Dispatch<
        React.SetStateAction<Record<string, boolean> | undefined>
    >;
}) {
    const tags = [
        ...new Set(
            Object.keys(Setlist)
                .filter((x) => x.startsWith(target))
                .map((date) => Setlist[date].tag)
                .filter(Boolean)
                .flat(),
        ),
    ];

    if (!filter) {
        filter = {
            all: true,
            etc: true,
            ...Object.fromEntries(tags.map((tag) => [tag, true])),
        };
    }

    const filtered = Object.keys(Setlist).filter((x) => x.startsWith(target));
    const handleFilter = (key: string, checked: boolean) => {
        if (key === "all") {
            Object.keys(filter!).forEach((x) => (filter![x] = checked));
        } else {
            filter![key] = checked;
            filter!.all = Object.keys(filter!)
                .filter((x) => x !== "all")
                .every((x) => filter![x]);
        }

        setFilter({ ...filter });
    };

    return (
        <div className="flex flex-col gap-6 rounded-xl bg-muted/50 m-4 mt-0 p-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                フィルター
            </h4>
            <div className="flex items-center gap-3">
                <Checkbox
                    id="all"
                    checked={filter!.all}
                    onCheckedChange={(checked) =>
                        handleFilter("all", !!checked)
                    }
                />
                <Label htmlFor="all">
                    全て
                    <small>({filtered.length})</small>
                </Label>
            </div>
            {tags.map((tag, index) => (
                <div key={tag} className="flex items-center gap-3">
                    <Checkbox
                        id={`tag-${index}`}
                        checked={filter![tag!]}
                        onCheckedChange={(checked) =>
                            handleFilter(tag!, !!checked)
                        }
                    />
                    <Label htmlFor={`tag-${index}`}>
                        {tag}
                        <small>
                            (
                            {
                                filtered.filter((x) =>
                                    Setlist[x].tag?.includes(tag!),
                                ).length
                            }
                            )
                        </small>
                    </Label>
                </div>
            ))}
            <div className="flex items-center gap-3">
                <Checkbox
                    id="etc"
                    checked={filter!.etc}
                    onCheckedChange={(checked) =>
                        handleFilter("etc", !!checked)
                    }
                />
                <Label htmlFor="etc">
                    その他
                    <small>
                        ({filtered.filter((x) => !Setlist[x].tag).length})
                    </small>
                </Label>
            </div>
            <div className="text-xs">
                {filtered.filter((x) => pivot(x, filter)).length}
                本のセットリストが検索されました
            </div>
        </div>
    );
}
