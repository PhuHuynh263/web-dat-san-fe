import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { cities, fieldTypes, amenities, parseOpeningHours } from './bookingData';
import { useTheme, useMediaQuery } from '@mui/material';

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      times.push(timeString);
    }
  }
  return times;
};

const FilterPanel = ({ open, onClose, onSearch }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState(generateTimeSlots());

  const STYLE_AUTOCOMPLETE = {
    '& .MuiInputLabel-root': {
      color: 'primary.main',
      '&.Mui-focused': {
        color: 'primary.main',
      },
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 14,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
    },
  };

  const STYLE_DATEPICKER = {
    '& .MuiInputLabel-root': {
      color: 'primary.main',
      '&.Mui-focused': {
        color: 'primary.main',
      },
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 14,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '& .MuiOutlinedInput-input': {
        color: 'primary.main',
      },
      '& .MuiIconButton-root': {
        color: 'primary.main',
      },
    },
  };

  const handleAmenityChange = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    onSearch({
      city: selectedCity,
      fieldType: selectedFieldType,
      date: selectedDate,
      startTime,
      endTime,
      amenities: selectedAmenities,
    });
    if (!isDesktop) {
      onClose();
    }
  };

  // Mobile Modal View
  if (!isDesktop && !open) return null;

  const filterContent = (
    <Box sx={{ p: 3 }}>
      {/* Header - Only on Mobile and Desktop */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        {!isDesktop && (
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Lọc Tìm Kiếm
          </Typography>
        )}
        <Box sx={{ ml: isDesktop ? 'auto' : 0 }}>
          <IconButton onClick={onClose} sx={{ p: 0 }}>
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Thành Phố / Tỉnh */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Thành Phố / Tỉnh</Typography>
        <Autocomplete
          options={cities}
          value={selectedCity}
          onChange={(event, newValue) => setSelectedCity(newValue)}
          getOptionLabel={(option) => option.label || ''}
          renderInput={(params) => <TextField {...params} label="Chọn thành phố" />}
          sx={STYLE_AUTOCOMPLETE}
        />
      </Box>

      {/* Loại Sân */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Loại Sân</Typography>
        <Autocomplete
          options={fieldTypes}
          value={selectedFieldType}
          onChange={(event, newValue) => setSelectedFieldType(newValue)}
          getOptionLabel={(option) => option.label || ''}
          renderInput={(params) => <TextField {...params} label="Chọn loại sân" />}
          sx={STYLE_AUTOCOMPLETE}
        />
      </Box>

      {/* Ngày */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Ngày Tháng</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                label: 'Chọn ngày',
              },
            }}
            sx={STYLE_DATEPICKER}
          />
        </LocalizationProvider>
      </Box>

      {/* Khung Giờ */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Khung Giờ</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Từ Giờ */}
          <Autocomplete
            options={availableTimes}
            value={startTime}
            onChange={(event, newValue) => {
              setStartTime(newValue);
              setEndTime(null);
            }}
            getOptionLabel={(option) => option || ''}
            renderInput={(params) => <TextField {...params} label="Từ giờ" />}
            sx={{ ...STYLE_AUTOCOMPLETE, flex: 1 }}
          />

          {/* Đến Giờ */}
          <Autocomplete
            options={
              startTime
                ? availableTimes.filter((time) => time >= startTime)
                : []
            }
            value={endTime}
            onChange={(event, newValue) => setEndTime(newValue)}
            getOptionLabel={(option) => option || ''}
            disabled={!startTime}
            renderInput={(params) => <TextField {...params} label="Đến giờ" />}
            sx={{ ...STYLE_AUTOCOMPLETE, flex: 1 }}
          />
        </Box>
      </Box>

      {/* Tiện Ích */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Tiện Ích</Typography>
        <FormGroup>
          {amenities.map((amenity) => (
            <FormControlLabel
              key={amenity.id}
              control={
                <Checkbox
                  checked={selectedAmenities.includes(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                />
              }
              label={amenity.label}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Nút Tìm Kiếm */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSearch}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          fontWeight: 'bold',
          py: 1.5,
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Tìm Kiếm
      </Button>
    </Box>
  );

  // Mobile View - Modal
  if (!isDesktop) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 1300,
        }}
        onClick={onClose}
      >
        {/* Filter Panel */}
        <Box
          sx={{
            backgroundColor: 'white',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '16px 16px 0 0',
            boxShadow: 3,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {filterContent}
        </Box>
      </Box>
    );
  }

  // Desktop View - Sidebar
  return (
    <Box
      sx={{
        width: '20vw',
        minHeight: 'calc(100vh - 73px)',
        backgroundColor: 'white',
        boxShadow: 3,
        display: isDesktop && open ? 'flex' : 'none',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        {filterContent}
      </Box>
    </Box>
  );
};

export default FilterPanel;
