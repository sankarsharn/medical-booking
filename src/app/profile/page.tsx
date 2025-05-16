"use client"

import { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button,
  Tab,
  Tabs,
  Divider,
  TextField,
  CircularProgress
} from '@mui/material';
// No Grid import needed
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, USA',
    avatar: '/static/images/avatar/2.jpg'
  });
  
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address
  });

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/authentication');
      return;
    }

    // Simulate fetching user data
    setTimeout(() => {
      // In a real application, you would fetch actual user data here
      // setUserData(fetchedData);
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address
      });
      setLoading(false);
    }, 1000);
  }, [isAuthenticated, router, userData.name, userData.email, userData.phone, userData.address]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would update the user data here
    setUserData({
      ...userData,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    });
    // Show success message or handle response
    alert('Profile updated successfully!');
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#f9fafb'
        }}
      >
        {/* Profile Header */}
        <Box 
          sx={{ 
            p: 4, 
            backgroundColor: 'primary.main', 
            color: 'white',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar 
              src={userData.avatar} 
              alt={userData.name} 
              sx={{ 
                width: 120, 
                height: 120, 
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }} 
            />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {userData.name}
              </Typography>
              <Typography variant="subtitle1">
                {userData.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Profile Content */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleTabChange} 
              aria-label="profile tabs"
              centered
            >
              <Tab label="Profile Information" {...a11yProps(0)} />
              <Tab label="Edit Profile" {...a11yProps(1)} />
              <Tab label="Settings" {...a11yProps(2)} />
            </Tabs>
          </Box>
          
          {/* Profile Information Tab */}
          <TabPanel value={value} index={0}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ width: { sm: '25%' } }}>
                    Full Name
                  </Typography>
                  <Typography variant="body1" sx={{ width: { sm: '75%' } }}>
                    {userData.name}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ width: { sm: '25%' } }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ width: { sm: '75%' } }}>
                    {userData.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ width: { sm: '25%' } }}>
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ width: { sm: '75%' } }}>
                    {userData.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ width: { sm: '25%' } }}>
                    Address
                  </Typography>
                  <Typography variant="body1" sx={{ width: { sm: '75%' } }}>
                    {userData.address}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          
          {/* Edit Profile Tab */}
          <TabPanel value={value} index={1}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Edit Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  sx={{ borderRadius: '8px', py: 1, px: 3 }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </TabPanel>
          
          {/* Settings Tab */}
          <TabPanel value={value} index={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Account Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  Enable Two-Factor Authentication
                </Typography>
                <Button variant="outlined" color="primary">
                  Enable
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  Change Password
                </Typography>
                <Button variant="outlined" color="primary">
                  Update
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  Notification Preferences
                </Typography>
                <Button variant="outlined" color="primary">
                  Manage
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="error">
                  Delete Account
                </Typography>
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </Box>
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}