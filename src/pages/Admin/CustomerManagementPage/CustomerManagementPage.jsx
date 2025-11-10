import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'ho_va_ten',
    headerName: 'Tên chủ sân',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 150,
    editable: false,
  },

  {
    field: 'avatar',
    headerName: 'Ảnh đại diện',
    type: 'image',
    width: 150,
    editable: false,
  },
  {
    field: 'so_dien_thoai',
    headerName: 'Số điện thoại',
    type: 'string',
    width: 150,
    editable: false,
  },
  {
    field: 'trang_thai',
    headerName: 'Trạng thái',
    renderCell: (params) => (
      <Button
        // onClick={() => handleStatusClick(params.row)}
        sx={{
          bgcolor: 'green',
          color: 'white',
        }}
      >
        Cập nhật
      </Button>
    ),
  },
];

function OwnerManagementPage() {
  const [rows, list_chu_san] = useState([]);

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/khach-hang/data")
      .then((res) => {
        list_chu_san(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  useEffect(() => {
    layDataChuSan();
  }, []);

  return <>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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
  </>
}



export default OwnerManagementPage;