declare module "@/public/song.json" {
    const value: {
        [song: string]: {
            youtube: string[];
        };
    };
    export default value;
}
