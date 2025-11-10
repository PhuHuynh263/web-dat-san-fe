import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'ten_chu_san',
    headerName: 'Tên chủ sân',
    width: 150,
    editable: true,
  },
  {
    field: 'yardName',
    headerName: 'Tên sân',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 150,
    editable: true,
  },
  {
    field: 'password',
    headerName: 'Mật khẩu',
    type: 'password',
    width: 150,
    editable: true,
  },

  {
    field: 'address',
    headerName: 'Địa Chỉ',
    type: 'string',
    width: 150,
    editable: true,
  },
  {
    field: 'avatar',
    headerName: 'Ảnh đại diện',
    type: 'image',
    width: 150,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    type: 'string',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
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
  const [rows, setRows] = useState([]);

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/chu-san/data")
      .then((res) => {
        setRows(res.data.data);
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