'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import { EmployeeFormData, Employee } from '@/types/employee';

interface EmployeeFormProps {
    initialData?: Employee;
    onSubmit: (data: EmployeeFormData) => Promise<void>;
    title: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData, onSubmit, title }) => {
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '', // Start with empty string to avoid default 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
                department: initialData.department,
                salary: initialData.salary,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const dataToSubmit = {
                ...formData,
                salary: parseFloat(formData.salary) || 0
            };
            await onSubmit(dataToSubmit);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                {title}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Salary (Monthly in ₹)"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            fullWidth
                            sx={{ py: 1.2, fontWeight: 600 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Employee'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default EmployeeForm;
