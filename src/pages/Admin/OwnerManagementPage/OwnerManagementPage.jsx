import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
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

const rows = [
  { id: 1, name: 'Snow', yardName: 'Jon', age: 14 },
  { id: 2, name: 'Lannister', yardName: 'Cersei', age: 31 },
  { id: 3, name: 'Lannister', yardName: 'Jaime', age: 31 },
  { id: 4, name: 'Stark', yardName: 'Arya', age: 11 },
  { id: 5, name: 'Targaryen', yardName: 'Daenerys', age: null },
  { id: 6, name: 'Melisandre', yardName: null, age: 150 },
  { id: 7, name: 'Clifford', yardName: 'Ferrara', age: 44 },
  { id: 8, name: 'Frances', yardName: 'Rossini', age: 36 },
  { id: 9, name: 'Roxie', yardName: 'Harvey', age: 65 },
];


function OwnerManagementPage() {
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