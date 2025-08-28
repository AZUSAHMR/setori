declare module "@/public/setlist.json" {
    const value: {
        [date: string]: {
            place: string;
            area: string;
            tag?: string[];
            setlist: string[][];
            encore?: string[][];
        };
    };
    export default value;
}
