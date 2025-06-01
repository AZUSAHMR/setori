declare module "@/public/setlist.json" {
    const value: {
        [date: string]: {
            place: string;
            area: string;
            setlist: string[][];
            encore?: string[];
        };
    };
    export default value;
}
