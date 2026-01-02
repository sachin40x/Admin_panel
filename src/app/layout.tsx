import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";

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
                        <Box sx={{ display: 'flex' }}>
                            <Sidebar />
                            <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
                                <Navbar />
                                {children}
                            </Box>
                        </Box>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
