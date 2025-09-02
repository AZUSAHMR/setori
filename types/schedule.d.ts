declare module "@/public/schedule.json" {
    const value: {
        [date: string]: {
            place: string;
            area: string;
            link: {
                instagram?: string;
                twitter?: string;
            };
            open?: string;
            start?: string;
            turn?: string;
        };
    };
    export default value;
}
