"use client";

import * as React from 'react';
import { useState } from 'react';
import { CssBaseline, CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Link from '@mui/joy/Link';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import CustomSnackbar from '../components/Snackbar';
import {
  Box,
} from '@mui/material';
export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, success } = useSelector((state: RootState) => state.auth);
;
  const [photo, setPhoto] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setPhoto(selectedFile);
    setFormData((prevData) => ({
      ...prevData,
      photo: selectedFile ? selectedFile.name : '',
    }));
  };

  React.useEffect(() => {
    if (success) {
      router.push("login");
    }
  }, [success]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let formErrors = { name: '', email: '', password: '', confirmPassword: '', bio: '' };
    let isValid = true;

    if (!formData.name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.bio) {
      formErrors.bio = 'Bio is required';
      isValid = false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)) {
      formErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const formDataToUpload = new FormData();
        if (photo) {
          formDataToUpload.append('file', photo);
        }
  
        const uploadResponse = await fetch('/api/uploadPhoto', {
          method: 'POST',
          body: formDataToUpload,
        });
  
        const uploadResult = await uploadResponse.json();
  
        if (!uploadResponse.ok) {
          setSnackbar({
            open: true,
            message: uploadResult.message || 'Photo upload failed!',
            severity: 'error',
          });
          return;
        }
  
        const dataToSubmit = {
          ...formData,
          photo: uploadResult.image || '',
        };
  
        dispatch(registerUser(dataToSubmit));
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        setSnackbar({
          open: true,
          message: 'An error occurred during registration!',
          severity: 'error',
        });
      }
    }
  };  

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
            padding: {xs: '24px', md: '0'},
            flexDirection: { xs: 'column', md: 'row' }, // Column layout on small screens, row on medium and larger
          }}>
            <Box   sx={{
      width: { xs: '100%', md: '50%' }, // Full width on small screens, half width on medium and larger
      display: { xs: 'none', md: 'block' }, // Show on small screens, hide on medium and larger
    }}>
                <div style={{height: '670px'}}>
                   <img style={{maxWidth: '100%',width:'100%', borderRadius:'8px', height: '100%', objectFit: "cover"}} 
                   src="https://cdn.pixabay.com/photo/2023/07/24/17/09/mexican-8147497_1280.png" alt="" />
                </div>
            </Box>
            <Box  sx={{
      width: { xs: '100%', md: '50%' }, // Full width on small screens, half width on medium and larger
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
        <Typography component="h1">
          <b>Create an Account</b>
        </Typography>
        {loading ? (
          <CircularProgress sx={{ alignSelf: 'center', marginY: 2 }} />
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl sx={{marginBottom: '16px'}} error={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <Typography sx={{ color: 'red' }}>{errors.name}</Typography>}
            </FormControl>
            <FormControl sx={{marginBottom: '16px'}} error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Typography sx={{ color: 'red' }}>{errors.email}</Typography>}
            </FormControl>
            <FormControl sx={{marginBottom: '16px'}} error={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <Typography sx={{ color: 'red' }}>{errors.password}</Typography>}
            </FormControl>
            <FormControl sx={{marginBottom: '16px'}} error={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <Typography sx={{ color: 'red' }}>{errors.confirmPassword}</Typography>}
            </FormControl>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ textAlign: 'left',margin: '16px 0 ' }}
              >
                Upload Photo
                <input type="file" onChange={handleFileChange} accept="image/*" hidden />
              </Button>
              {photo && <Typography>{photo.name}</Typography>}
            </Grid>

            <FormControl sx={{marginBottom: '16px'}} error={!!errors.bio}>
              <FormLabel>Bio</FormLabel>
              <Textarea
                name="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleChange}
                minRows={3}
              />
              {errors.bio && <Typography sx={{ color: 'red' }}>{errors.bio}</Typography>}
            </FormControl>

            {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            <Button type="submit" sx={{margin:'16px 0', width: '100%', background: '#91ad41', color: '#fff',display: 'flex', maxWidth: '210px', margin: '12px auto 0' }}>
              Sign Up
            </Button>
            <Typography 
              endDecorator={<Link href="/login">Sign in</Link>}
              sx={{ fontSize: 'sm', alignSelf: 'center',margin: '16px 0' }}
            >
              Already have an account?
            </Typography>
          </form>
        )}
      </Sheet>
    </Box>
    </Box>
    
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </main>
  );
}
