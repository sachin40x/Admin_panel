'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
    onDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDrawerToggle }) => {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { xs: '100%', md: `calc(100% - 240px)` },
                ml: { xs: 0, md: `240px` },
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e0e0e0',
                color: '#1a1a1a',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        Admin Portal
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <IconButton size="small">
                        <NotificationsIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Admin User
                        </Typography>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#1a1a1a' }}>AD</Avatar>
                    </Box>
                    <Avatar sx={{ display: { xs: 'flex', sm: 'none' }, width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#1a1a1a' }}>AD</Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
