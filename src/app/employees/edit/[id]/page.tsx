'use client';

import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import EmployeeForm from '@/components/EmployeeForm';
import { EmployeeFormData, Employee } from '@/types/employee';
import axios from 'axios';

const EditEmployeePage = () => {
    const router = useRouter();
    const params = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/api/employees/${params.id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
                alert('Employee not found');
                router.push('/employees');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchEmployee();
        }
    }, [params.id, router]);

    const handleSubmit = async (data: EmployeeFormData) => {
        await axios.put(`/api/employees/${params.id}`, data);
        router.push('/employees');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton component={Link} href="/employees" size="small">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Edit Employee</Typography>
            </Box>

            {employee && (
                <EmployeeForm
                    title={`Editing: ${employee.name}`}
                    initialData={employee}
                    onSubmit={handleSubmit}
                />
            )}
        </Box>
    );
};

export default EditEmployeePage;
