import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  ThemeProvider,
} from '@mui/material';
import images from '../../assets/images/images';
import { loginSignUpTheme } from '../../loginSignUpTheme';
import { NavLink } from 'react-router-dom';

function SignUpPage() {
  const STYLE_TEXTFIELD = {
    margin: '8px',
    flexGrow: 1,
    '& .MuiInputLabel-root': {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 14,
      '&.Mui-focused': {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        // Style cho Label KHI ĐƯỢC FOCUS
      },
    },
    // --- Style cho khung Input (OutlinedInput) ---
    '& .MuiOutlinedInput-root': {
      fontSize: 14,

      // Style cho chữ bạn gõ vào
      '& .MuiOutlinedInput-input': {
        color: 'black',
        backgroundColor: 'none',
      },

      // Style cho đường viền (notchedOutline)
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black', // Viền mặc định
      },

      // Style viền khi hover
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
      },

      // Style viền khi focus (click vào)
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'secondary.main',
      },
    },
  };

  return (
    <ThemeProvider theme={loginSignUpTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${images.bgSignUp})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 750,
            width: 500,
            opacity: 0.8,
            p: 4,
            boxShadow: 5,
            borderRadius: 2,
            border: '1px solid #ccc',
          }}
        >
          <Box sx={{ width: '100%', height: 'auto' }}>
            <Typography
              variant='h1'
              align='center'
              sx={{ mt: 5, mb: 5, color: 'secondary.main', fontWeight: 'bold' }}
            >
              Sign Up
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                id='filled-first-name'
                label='First Name'
                sx={STYLE_TEXTFIELD}
              />
              <TextField
                id='filled-last-name'
                label='Last Name'
                sx={STYLE_TEXTFIELD}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                id='filled-phone-number'
                label='Phone Number'
                sx={STYLE_TEXTFIELD}
              />
              <TextField
                id='filled-address'
                label='Address'
                sx={STYLE_TEXTFIELD}
              />
            </Box>
            <TextField
              id='filled-email'
              label='Your Email'
              sx={STYLE_TEXTFIELD}
            />
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              sx={STYLE_TEXTFIELD}
            />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant='contained'
                color='secondary'
                sx={{ width: '100%', m: 1, fontWeight: 'bold' }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          ></Box>
          <Box sx={{ flex: 1 }}></Box>
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='body2'
              component={NavLink}
              to='/login'
              color='white'
              fontWeight='bold'
              onClick={() => {
                console.log('Create an Account clicked');
              }}
              sx={{ mt: 3, mb: 2, cursor: 'pointer' }}
            >
              Back to Login
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignUpPage;
