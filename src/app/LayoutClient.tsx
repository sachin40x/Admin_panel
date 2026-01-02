'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function LayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    pt: { xs: 9, sm: 10 },
                    minHeight: '100vh',
                    backgroundColor: '#fdfdfd',
                    width: { xs: '100%', md: `calc(100% - 240px)` }
                }}
            >
                <Navbar onDrawerToggle={handleDrawerToggle} />
                {children}
            </Box>
        </Box>
    );
}
