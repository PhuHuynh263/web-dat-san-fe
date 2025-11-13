import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SoccerFieldManagementPage() {
  const [row, list_san_cua_toi] = React.useState([]);
  const [list_chu_san, setListChuSan] = React.useState([]);
  const [list_loai_san, setListLoaiSan] = React.useState([]);

  const layDataSanCuaToi = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/san-bong/data-chu-san",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
          },
        }
      )
      .then((res) => {
        list_san_cua_toi(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
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
      .get("http://127.0.0.1:8000/api/chu-san/loai-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => {
        setListLoaiSan(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const changeStatus = (value) => {
    axios
      .post("http://127.0.0.1:8000/api/chu-san/san-bong/changeStatus", value, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataSanCuaToi();
        }
        else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi thay đổi trạng thái:", err);
      });
  }

  useEffect(() => {
    layDataSanCuaToi();
    layDataChuSan();
    layDataLoaiSan();
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
              changeStatus({ id: params.row.id });
            }}
            sx={{
              bgcolor: isActive ? 'green' : "gray",
              color: 'white',
              padding: '5px 10px',
            }}
          >
            {isActive ? 'Hoạt động' : 'Tạm khóa'}
          </Button>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={row}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'normal',
            lineHeight: '1.4',
            textAlign: 'center',
          },
        }}
      />
    </Box>
  )
}

export default SoccerFieldManagementPage