'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2563eb', // More vibrant blue
        },
        secondary: {
            main: '#475569',
        },
        background: {
            default: '#f8fafc', // Subtle grayish background
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 600,
                    padding: '8px 16px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#64748b',
                },
            },
        },
    },
});

export default theme;
