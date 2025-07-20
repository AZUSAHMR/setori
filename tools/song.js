import Setlist from "../public/setlist.json" with { type: "json" };
import Song from "../public/song.json" with { type: "json" };

const setlistSongs = [
    ...new Set(
        Object.keys(Setlist)
            .map((date) =>
                [Setlist[date].setlist.flat(), Setlist[date].encore?.flat()]
                    .filter(Boolean)
                    .flat(),
            )
            .flat(),
    ),
];
const songs = Object.keys(Song);

console.log(setlistSongs.filter((song) => !songs.includes(song)));
