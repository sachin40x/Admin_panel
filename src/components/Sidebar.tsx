'use client';

import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, useMediaQuery, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

interface SidebarProps {
    mobileOpen: boolean;
    onDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle }) => {
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
    ];

    const drawerContent = (
        <>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                    WorkForce Hub
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.path}
                            selected={pathname === item.path}
                            onClick={isMobile ? onDrawerToggle : undefined}
                            sx={{
                                mx: 1,
                                borderRadius: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#f5f5f5',
                                    color: '#1a1a1a',
                                    '&:hover': {
                                        backgroundColor: '#eeeeee',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: pathname === item.path ? '#1a1a1a' : '#666' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: pathname === item.path ? 600 : 400
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #e0e0e0',
                        backgroundColor: '#ffffff'
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #e0e0e0',
                        backgroundColor: '#ffffff'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
