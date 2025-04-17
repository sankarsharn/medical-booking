"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore'; // Zustand store
import { useRouter } from 'next/navigation';

const pages = [
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: 'https://blog.practo.com/', external: true },
];

const loggedInSettings = [
  { name: 'Profile', href: '/profile' },
  { name: 'Account', href: '/account' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Logout', href: '/logout' },
  { name: 'Doctor', href: '/doctorAuth'}
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    router.push('/');
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ position: 'fixed', width: '100%', top: 0, zIndex: 1100, padding: { xs: '8px', md: '16px' } }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(25, 29, 50, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          margin: { xs: '0 4px', md: '0 16px' },
          width: 'auto',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.12)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: '56px', md: '64px' } }}>
            <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                }}
              >
                LOGO
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    {page.external ? (
                      <a href={page.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                      </a>
                    ) : (
                      <Link href={page.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                }}
              >
                LOGO
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
              {pages.map((page) =>
                page.external ? (
                  <a
                    key={page.name}
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      sx={{
                        mx: 1,
                        my: 1,
                        color: 'white',
                        borderRadius: '8px',
                        padding: '6px 16px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  </a>
                ) : (
                  <Link key={page.name} href={page.href} passHref style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        mx: 1,
                        my: 1,
                        color: 'white',
                        borderRadius: '8px',
                        padding: '6px 16px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                )
              )}
            </Box>

            {isAuthenticated ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0,
                      ml: 1,
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {loggedInSettings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={setting.name === 'Logout' ? handleLogout : handleCloseUserMenu}
                    >
                      <Link href={setting.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                <Link href="/authentication" passHref>
                  <Button
                    variant="contained"
                    sx={{
                      ml: 2,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '6px 16px',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;