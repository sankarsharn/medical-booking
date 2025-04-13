'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Chat as ChatIcon,
  MedicalServices as MedicalServicesIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  LocalHospital as HospitalIcon
} from '@mui/icons-material';

const HealthcarePlatform = () => {
  const colors = {
    primary: '#1976d2',
    secondary: '#4caf50',
    accent: '#ff5722',
    background: '#f5f7fa',
    textDark: '#263238',
    textLight: '#ffffff',
  };

  const services = [
    {
      icon: <ChatIcon sx={{ fontSize: 40, color: colors.primary }} />,
      title: 'Chat with Doctor',
      price: '₹1/minute',
      description: 'Instant text consultation with certified doctors',
      action: 'Start Chat'
    },
    {
      icon: <VideoCallIcon sx={{ fontSize: 40, color: colors.secondary }} />,
      title: 'Video Consultation',
      price: '₹2/minute',
      description: 'Face-to-face video call with specialists',
      action: 'Book VC'
    },
    {
      icon: <MedicalServicesIcon sx={{ fontSize: 40, color: colors.accent }} />,
      title: 'Procto Services',
      price: 'Varies',
      description: 'Complete proctology examination and treatment',
      action: 'Learn More'
    }
  ];

  const features = [
    { icon: <ScheduleIcon />, text: '24/7 Availability' },
    { icon: <PeopleIcon />, text: '500+ Certified Doctors' },
    { icon: <HospitalIcon />, text: '100+ Partner Hospitals' }
  ];

  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        backgroundColor: colors.primary,
        color: colors.textLight,
        py: 12,

        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Your Complete Healthcare Solution
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Quality medical care at your fingertips
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.secondary,
              '&:hover': { backgroundColor: '#388e3c' },
              px: 4,
              py: 2,
              fontSize: '1.1rem'
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{
          color: colors.textDark,
          fontWeight: 'bold',
          mb: 6
        }}>
          Our Services
        </Typography>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 4
        }}>
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 calc(33.33% - 16px)', // Makes the items take up equal width
                maxWidth: 'calc(33.33% - 16px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 4,
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              {service.icon}
              <Typography variant="h5" component="h3" sx={{
                mt: 2,
                mb: 1,
                color: colors.textDark,
                fontWeight: 'bold'
              }}>
                {service.title}
              </Typography>
              <Typography variant="subtitle1" sx={{
                color: colors.primary,
                fontWeight: 'bold',
                mb: 2
              }}>
                {service.price}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {service.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: index === 0 ? colors.primary :
                    index === 1 ? colors.secondary : colors.accent,
                  '&:hover': {
                    backgroundColor: index === 0 ? '#1565c0' :
                      index === 1 ? '#388e3c' : '#e64a19'
                  },
                  mt: 'auto'
                }}
              >
                {service.action}
              </Button>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{
        backgroundColor: colors.textLight,
        py: 6,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{
            color: colors.textDark,
            fontWeight: 'bold',
            mb: 6
          }}>
            Why Choose Us?
          </Typography>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 4
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: '1 1 calc(33.33% - 16px)',
                maxWidth: 'calc(33.33% - 16px)'
              }}>
                <Box sx={{
                  backgroundColor: colors.primary,
                  color: colors.textLight,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 30 } })}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{
          color: colors.textDark,
          fontWeight: 'bold',
          mb: 3
        }}>
          Ready to experience better healthcare?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
          Join thousands of satisfied patients who trust us with their health needs
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: colors.accent,
            '&:hover': { backgroundColor: '#e64a19' },
            px: 6,
            py: 2,
            fontSize: '1.1rem'
          }}
        >
          Sign Up Now
        </Button>
      </Container>
    </Box>
  );
};

export default HealthcarePlatform;
