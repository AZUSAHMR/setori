import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const notoSans = Noto_Sans_JP({ preload: false });

export const metadata: Metadata = {
    title: "セットリスト",
    description: "セットリスト",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${notoSans.className} antialiased`}>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>{children}</SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
