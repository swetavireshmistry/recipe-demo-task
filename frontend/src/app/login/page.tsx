"use client"
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useDispatch, useSelector } from '@/store/types';
import { loginUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation'
import useAuth from '../hooks/useAuth';
import CustomSnackbar from '../components/Snackbar';
import {
  Box,
} from '@mui/material';
const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setEmail('');
      setPassword('');
      setSnackbarSeverity('success');
      setSnackbarMessage('Login successful!');
      setSnackbarOpen(true);
      router.push('/');
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <main>
      <CssBaseline />
      <Box 
          sx={{
            display: 'flex',

            gap: '24px',
            maxWidth: 1140,
            mx: 'auto',
            mt: 4,
            padding: {xs: '24px', md: '50px 0'},
            flexDirection: { xs: 'column', md: 'row' }, 
          }}>
            <Box   sx={{
      width: { xs: '100%', md: '50%' }, 
      display: { xs: 'none', md: 'block' },
    }}>
                <div style={{height: '310px'}}>
                   <img style={{maxWidth: '100%',width:'100%', borderRadius:'8px',  height: '100%', objectFit: "cover"}} 
                   src="https://cdn.pixabay.com/photo/2023/08/12/02/42/ai-generated-8184596_1280.png" alt="" />
                </div>
            </Box>
            <Box  sx={{
      width: { xs: '100%', md: '50%' },
    }}>
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          padding :"16px"
        }}
        variant="outlined"
      >
        <div>
          <Typography display='flex' justifyContent='center' level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography display='flex' justifyContent='center' level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button sx={{  width: '100%', background: '#91ad41', color: '#fff',display: 'flex', maxWidth: '210px', margin: '12px auto 0' }} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
        <Typography
          endDecorator={<Link href="/signup">Sign up</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
      </Box>
      </Box>
      

      {/* Using the CustomSnackbar component to Show notification*/}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </main>
  );
};

export default Login;
