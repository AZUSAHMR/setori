declare module "@/public/personal.json" {
    const value: {
        [date: string]: {
            place: string;
            area: string;
            name: string;
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
