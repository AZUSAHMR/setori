declare module "@/public/schedule.json" {
    const value: {
        [date: string]: {
            place: string;
            link: {
                instagram?: string;
                twitter?: string;
            };
            open?: string;
            start?: string;
        };
    };
    export default value;
}
