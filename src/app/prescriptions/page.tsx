"use client"

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import { MedicalInformation } from '@mui/icons-material';

const PrescriptionsPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Please log in to view your prescriptions
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Prescriptions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your medical prescriptions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <MedicalInformation sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h5" component="div" gutterBottom>
              No Prescriptions Available
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Your prescription history will appear here once your doctor has issued prescriptions for you.
              You can view, download, and manage all your prescriptions in one place.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrescriptionsPage;