declare module "@/public/setlist.json" {
    const value: {
        [date: string]: {
            place: string;
            setlist: string[][];
            encore?: string[];
        };
    };
    export default value;
}
