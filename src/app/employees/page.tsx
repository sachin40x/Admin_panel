'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import axios from 'axios';
import { Employee } from '@/types/employee';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`/api/employees/${id}`);
                setEmployees(employees.filter(emp => emp.id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee');
            }
        }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>Employees</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    href="/employees/add"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Add Employee
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>Department</TableCell>
                            <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Salary</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    No employees found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            employees.map((row) => (
                                <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{row.email}</TableCell>
                                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{row.department}</TableCell>
                                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>₹{row.salary.toLocaleString('en-IN')}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton component={Link} href={`/employees/edit/${row.id}`} size="small" sx={{ mr: 1 }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(row.id!)} size="small" color="error">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EmployeesPage;
