import React from 'react';
import { Box, Typography, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';


const SelectedYard = () => {
    return (
        <ThemeProvider theme={clientTheme}>
            <CssBaseline />
            <Header />
            <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 3 }}>
                <Typography variant="h6">
                    SelectedYard
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default SelectedYard;
