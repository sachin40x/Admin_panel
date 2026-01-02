'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import PaymentsIcon from '@mui/icons-material/Payments';
import axios from 'axios';
import { Employee } from '@/types/employee';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        totalPayroll: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/employees');
                const employees: Employee[] = response.data;

                const depts = new Set(employees.map(e => e.department));
                const payroll = employees.reduce((sum, e) => sum + Number(e.salary), 0);

                setStats({
                    totalEmployees: employees.length,
                    totalDepartments: depts.size,
                    totalPayroll: payroll,
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Employees', value: stats.totalEmployees, icon: <PeopleIcon sx={{ fontSize: 40, color: '#1a1a1a' }} /> },
        { title: 'Departments', value: stats.totalDepartments, icon: <BusinessIcon sx={{ fontSize: 40, color: '#1a1a1a' }} /> },
        { title: 'Monthly Payroll', value: `₹${stats.totalPayroll.toLocaleString('en-IN')}`, icon: <PaymentsIcon sx={{ fontSize: 40, color: '#1a1a1a' }} /> },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>Dashboard Overview</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    href="/employees/add"
                >
                    Add Employee
                </Button>
            </Box>

            <Grid container spacing={3}>
                {statCards.map((card, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>{card.title}</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>{card.value}</Typography>
                            </Box>
                            <Box sx={{ backgroundColor: '#f5f5f5', p: 1.5, borderRadius: 2 }}>
                                {card.icon}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Recent Activity</Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="body2" color="textSecondary">
                        System is up and running. No critical alerts at this moment.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard;
