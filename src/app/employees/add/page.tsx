'use client';

import React from 'react';
import { Box, IconButton, Breadcrumbs, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmployeeForm from '@/components/EmployeeForm';
import { EmployeeFormData } from '@/types/employee';
import axios from 'axios';

const AddEmployeePage = () => {
    const router = useRouter();

    const handleSubmit = async (data: EmployeeFormData) => {
        await axios.post('/api/employees', data);
        router.push('/employees');
    };

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton component={Link} href="/employees" size="small">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Add New Employee</Typography>
            </Box>

            <EmployeeForm title="Fill Employee Details" onSubmit={handleSubmit} />
        </Box>
    );
};

export default AddEmployeePage;
