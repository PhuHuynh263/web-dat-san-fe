import React from 'react'
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function YardTypeManagementPage() {

  const [row, list_loai_san] = React.useState([]);

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        list_loai_san(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  useEffect(() => {
    layDataChuSan();
  }, []);

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
        return index + 1;
      },
    },
    {
      field: 'ten_loai_san',
      headerName: 'Tên loại sân',
      flex: 1,
      sortable: true,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'slug_loai_san',
      headerName: 'Slug loại sân',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'trang_thai',
      headerName: 'Trạng thái',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        const isActive = params.value === 1;
        return (
          <Button
            sx={{
              bgcolor: isActive ? 'green' : 'gray',
              color: 'white',
            }}
          >
            {isActive ? 'Kích hoạt' : 'Vô hiệu hóa'}
          </Button>
        )
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
    </Box>
  )
}

export default YardTypeManagementPage