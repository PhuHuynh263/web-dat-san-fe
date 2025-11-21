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
      field: 'id_chu_san',
      headerName: 'Tên chủ sân',
      flex: 1,
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => {
        const chuSan = list_chu_san.find((c => c.id === Number(params.row.id_chu_san)));
        return chuSan ? chuSan.ten_chu_san : 'Chưa xác định';
      },
    },
    {
      field: 'id_loai_san',
      headerName: 'Loại Sân',
      type: 'string',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => {
        const loaiSan = list_loai_san.find((l => l.id === Number(params.row.id_loai_san)));
        return loaiSan ? loaiSan.ten_loai_san : 'Chưa xác định';
      }
    },
    {
      field: 'ten_san',
      headerName: 'Tên sân',
      type: 'string',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'slug_san',
      headerName: 'Slug sân',
      type: 'string',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'hinh_anh',
      headerName: 'Hình ảnh',
      type: 'image',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'mo_ta',
      headerName: 'Mô tả',
      type: 'text',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'gia_thue',
      headerName: 'Giá thuê',
      type: 'number',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'dia_chi',
      headerName: 'Địa chỉ',
      type: 'string',
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      editable: false,
    },
    // {
    //   field: 'trang_thai',
    //   headerName: 'Trạng thái',
    //   flex: 1,
    //   sortable: false,
    //   headerAlign: 'center',
    //   renderCell: (params) => {
    //     const isActive = params.row.trang_thai === 1;
    //     return (
    //       <Button
    //         // onClick={() => {
    //         // }}
    //         sx={{
    //           bgcolor: isActive ? 'green' : "gray",
    //           color: 'white',
    //           padding: '5px 10px',
    //         }}
    //       >
    //         {isActive ? 'Hoạt động' : 'Tạm khóa'}
    //       </Button>
    //     );
    //   },
    // },
  ];

  const [rows, list_san_bong] = useState([]);
  const [list_chu_san, setListChuSan] = useState([]);
  const [list_loai_san, setListLoaiSan] = useState([]);

  const layDataToanBoSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/san-bong/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        list_san_bong(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/chu-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        setListChuSan(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const layDataLoaiSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        setListLoaiSan(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  useEffect(() => {
    layDataToanBoSan();
    layDataChuSan();
    layDataLoaiSan();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'} // 🔥 Tự động nới chiều cao hàng
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'normal',   // Cho phép xuống dòng
            wordWrap: 'break-word', // Ngắt từ
            lineHeight: '1.4',
            textAlign: 'center',
          },
        }}
      />

    </Box>
  );
}

export default TotalYardManagementPage;