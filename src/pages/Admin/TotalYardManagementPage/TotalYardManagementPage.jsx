import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


function TotalYardManagementPage() {
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
      field: 'ho_va_ten',
      headerName: 'Tên chủ sân',
      flex: 1,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },

    {
      field: 'avatar',
      headerName: 'Ảnh đại diện',
      type: 'image',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'so_dien_thoai',
      headerName: 'Số điện thoại',
      type: 'string',
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
        const isActive = params.row.trang_thai === 1;
        return (
          <Button
            onClick={() => {
              console.log('Row ID:', params.row.id);
              changeStatus({ id: params.row.id });
            }}
            sx={{
              bgcolor: isActive ? 'green' : 'gray',
              color: 'white',
              padding: '5px 10px',
            }}
          >
            {isActive ? 'Hoạt động' : 'Tạm khóa'}
          </Button>
        );
      },
    },
    {
      headerName: 'Hành động',
      headerAlign: 'center',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            sx={{
              bgcolor: 'yellow',
              color: 'black',
              padding: '5px 10px',
            }}
          >
            Action
          </Button>
        );
      },
    }
  ];
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
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
      />
    </Box>
  );
}

export default TotalYardManagementPage;
