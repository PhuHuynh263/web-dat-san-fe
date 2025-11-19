import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';
import { useState } from 'react';
import FilterPanel from './FilterPanel';
import ResultsList from './ResultsList';
import { testFieldsData } from './bookingData';

const BookingPage = () => {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [fieldsData, setFieldsData] = useState(testFieldsData);

  const handleFilterClick = () => {
    setFilterPanelOpen(true);
  };

  const handleToggleFilter = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  const handleSearch = (filters) => {
    // TODO: Xử lý filter dữ liệu dựa trên filters object
    // Hiện tại chỉ hiển thị tất cả dữ liệu
    console.log('Filters applied:', filters);
    setFieldsData(testFieldsData);
  };

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 3, p: 0 }}>
        <Box sx={{ display: 'flex', gap: 0 }}>
          {/* Filter Panel - Desktop */}
          <FilterPanel
            open={filterPanelOpen}
            onClose={() => setFilterPanelOpen(false)}
            onSearch={handleSearch}
          />

          {/* Results List */}
          <ResultsList
            fieldsData={fieldsData}
            onFilterClick={handleFilterClick}
            filterOpen={filterPanelOpen}
            onToggleFilter={handleToggleFilter}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BookingPage;

