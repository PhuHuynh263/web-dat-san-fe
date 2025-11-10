import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function OwnerManagementPage() {
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 80,
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
      width: 150,
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

  const [rows, list_khach_hang] = useState([]);

  const layDataKhachHang = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/khach-hang/data")
      .then((res) => {
        list_khach_hang(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const changeStatus = (value) => {
    axios
      .post("http://127.0.0.1:8000/api/quan-tri-vien/khach-hang/changeStatus", value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataKhachHang();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy đổi trạng thái:", err);
      });
  };

  useEffect(() => {
    layDataKhachHang();
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