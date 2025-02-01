import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" color="inherit" underline="none">
                            CODE ARENA
                        </Link>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Link href="/problems" color="inherit" underline="none">
                            Problems
                        </Link>
                        <Link href="/contests" color="inherit" underline="none">
                            Contests
                        </Link>
                        <Link href="/users" color="inherit" underline="none">
                            Users
                        </Link>
                        <Link href="/editor" color="inherit" underline="none">
                            Editor
                        </Link>
                        <Link href="/profile" color="inherit" underline="none">
                            Profile
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container sx={{ flexGrow: 1, padding: '20px' }}>
                {children}
            </Container>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    textAlign: 'center',
                    padding: '10px',
                    marginTop: 'auto',
                }}
            >
                <Typography variant="body1">
                    Contact Us | Credits
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;