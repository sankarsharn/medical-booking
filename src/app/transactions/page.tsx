"use client"

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Grid
} from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import { AttachMoney, AccessTime } from '@mui/icons-material';

// Mock transaction data - in a real app this would come from an API
const mockTransactions = [
  {
    id: 'tx-001',
    doctorName: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    date: '2025-05-10',
    amount: 120,
    status: 'completed',
    appointmentType: 'Video Consultation'
  },
  {
    id: 'tx-002',
    doctorName: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    date: '2025-05-05',
    amount: 85,
    status: 'completed',
    appointmentType: 'In-person Visit'
  },
  {
    id: 'tx-003',
    doctorName: 'Dr. Lisa Rodriguez',
    specialization: 'Pediatrician',
    date: '2025-04-28',
    amount: 95,
    status: 'completed',
    appointmentType: 'Video Consultation'
  },
  {
    id: 'tx-004',
    doctorName: 'Dr. James Wilson',
    specialization: 'Orthopedic Surgeon',
    date: '2025-04-15',
    amount: 210,
    status: 'completed',
    appointmentType: 'In-person Visit'
  }
];

const TransactionsPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [transactions, setTransactions] = React.useState(mockTransactions);

  // In a real app, we would fetch transactions from an API
  React.useEffect(() => {
    // Simulate API call
    // If real implementation, would check if user is authenticated before fetching
    if (isAuthenticated) {
      // fetchTransactions(userId).then(data => setTransactions(data));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Please log in to view your transactions
        </Typography>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transaction History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all your payments made to healthcare professionals
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.2)',
            }}
          >
            <Box display="flex" alignItems="center">
              <AttachMoney sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
              <Box>
                <Typography variant="h6" component="div">
                  Total Spent
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  ${transactions.reduce((sum, tx) => sum + tx.amount, 0)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              border: '1px solid rgba(33, 150, 243, 0.2)',
            }}
          >
            <Box display="flex" alignItems="center">
              <AccessTime sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h6" component="div">
                  Last Payment
                </Typography>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {formatDate(transactions[0]?.date || new Date())}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'background.paper' }}>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {transaction.doctorName.charAt(0)}
                    </Avatar>
                    <Typography variant="body1">{transaction.doctorName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{transaction.specialization}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.appointmentType}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    color={transaction.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TransactionsPage;