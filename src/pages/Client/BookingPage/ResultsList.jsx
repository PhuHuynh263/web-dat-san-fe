import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TuneIcon from '@mui/icons-material/Tune';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import ReUseableCard from '../reUseableComponent/reUseableCard';
import { useTheme, useMediaQuery } from '@mui/material';

const ResultsList = ({ fieldsData, onFilterClick, filterOpen, onToggleFilter }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {/* Toggle Arrow Button - Desktop Only - Fixed */}
      {isDesktop && !filterOpen && (
        <IconButton
          onClick={onToggleFilter}
          sx={{
            position: 'fixed',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'primary.main',
            color: 'white',
            zIndex: 1100,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}

      {/* Results Container */}
      <Box sx={{ flex: 1, width: '100%', pl: 4, minHeight: 'calc(100vh - 73px)' }}>
        {/* Filter Button - Mobile Only */}
        {!isDesktop && (
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              startIcon={<TuneIcon />}
              onClick={onFilterClick}
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(223, 27, 63, 0.08)',
                },
              }}
            >
              Lọc
            </Button>
          </Box>
        )}

        {/* Results Grid */}
        <Box>
          <Grid container spacing={3}>
            {fieldsData.map((field) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={field.id}
              >
                <ReUseableCard
                  id={field.id}
                  name={field.name}
                  district={field.district}
                  rating={field.rating}
                  openingHours={field.openingHours}
                  isHot={field.isHot}
                  image={field.image}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ResultsList;
