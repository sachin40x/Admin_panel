import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import LayoutClient from './LayoutClient';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WorkForce Hub - Admin Panel",
    description: "Internal employee management system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <LayoutClient>
                            {children}
                        </LayoutClient>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
