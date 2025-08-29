import { pivot } from "@/components/filter";
import Setlist from "@/public/setlist.json";

export type COUNTER = Record<string, number>;

export const count = (obj: COUNTER, key: string) =>
    (obj[key] = (obj[key] || 0) + 1);
export const sort = (obj: COUNTER) => {
    const sorted = Object.fromEntries(
        Object.entries(obj).sort(([, a], [, b]) => b - a),
    );

    Object.keys(obj).forEach((key) => delete obj[key]);
    Object.keys(sorted).forEach((key) => (obj[key] = sorted[key]));

    return obj;
};

export const calc = (target = "", filter?: Record<string, boolean>) => {
    const best: COUNTER = {};
    const encore: COUNTER = {};
    const start: COUNTER = {};
    const end: COUNTER = {};
    const beforeMC: COUNTER = {};
    const afterMC: COUNTER = {};

    Object.keys(Setlist)
        .filter((x) => x.startsWith(target))
        .filter((x) => pivot(x, filter))
        .forEach((date) => {
            const songs = Setlist[date].setlist.flat();

            songs.forEach((song) => {
                count(best, song);
            });

            count(start, songs.at(0)!);
            count(end, songs.at(-1)!);

            Setlist[date].encore?.flat().forEach((song) => {
                count(best, song);
                count(encore, song);
            });

            Setlist[date].setlist
                .slice(0, -1)
                .forEach((songs) => count(beforeMC, songs.at(-1)!));
            Setlist[date].setlist
                .slice(1)
                .forEach(([song]) => count(afterMC, song));
        });

    sort(best);
    sort(encore);
    sort(start);
    sort(end);
    sort(beforeMC);
    sort(afterMC);

    return { best, encore, start, end, beforeMC, afterMC };
};
