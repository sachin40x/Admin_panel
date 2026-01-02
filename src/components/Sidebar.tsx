'use client';

import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid #e0e0e0',
                    backgroundColor: '#ffffff'
                },
            }}
        >
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
        </Drawer>
    );
};

export default Sidebar;
