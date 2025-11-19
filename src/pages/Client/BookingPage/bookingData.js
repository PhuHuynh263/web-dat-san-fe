// Thành phố / Tỉnh
export const cities = [
  { label: 'Hà Nội' },
  { label: 'TP. Hồ Chí Minh' },
  { label: 'Đà Nẵng' },
  { label: 'Hải Phòng' },
  { label: 'Cần Thơ' },
];

// Loại sân
export const fieldTypes = [
  { label: 'Sân 5 người', key: 5 },
  { label: 'Sân 7 người', key: 7 },
  { label: 'Sân 9 người', key: 9 },
  { label: 'Sân 11 người', key: 11 },
];

// Tiện ích
export const amenities = [
  { id: 1, label: 'Bãi đỗ xe' },
  { id: 2, label: 'WiFi' },
  { id: 3, label: 'Phòng thay đồ' },
  { id: 4, label: 'Khán đài' },
  { id: 5, label: 'Quán nước' },
];

// Test data - 5 sân bóng
export const testFieldsData = [
  {
    id: 1,
    name: 'Sân Đa Phước',
    district: 'Quận Thanh Khê',
    city: 'Đà Nẵng',
    rating: 5,
    openingHours: '5:00 - 23:00',
    isHot: true,
    description: 'Sân bóng đá chất lượng cao với cỏ nhân tạo, phù hợp cho các trận đấu và tập luyện.',
    price: 200000,
    image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/11/hinh-anh-san-co-bong-da-tuyet-dep_101436722.jpg',
    amenities: [1, 3, 4],
  },
  {
    id: 2,
    name: 'Sân Bóng Hải Châu',
    district: 'Quận Hải Châu',
    city: 'Đà Nẵng',
    rating: 4.5,
    openingHours: '6:00 - 22:00',
    isHot: false,
    description: 'Sân bóng rộng rãi, có đầy đủ tiện nghi và dịch vụ hỗ trợ.',
    price: 180000,
    image: 'https://suachualaptop24h.com/upload_images/images/2024/08/06/hinh-nen-san-bong-da-dep-19.jpeg',
    amenities: [1, 2, 3],
  },
  {
    id: 3,
    name: 'Sân Thể Thao Cẩm Lệ',
    district: 'Quận Cẩm Lệ',
    city: 'Đà Nẵng',
    rating: 4.8,
    openingHours: '5:00 - 23:00',
    isHot: true,
    description: 'Sân bóng hiện đại với hệ thống chiếu sáng tốt, phù hợp chơi ban đêm.',
    price: 220000,
    image: 'https://nld.mediacdn.vn/2018/6/2/mordovia-arena-saransk-1527915860667205779137.jpg',
    amenities: [1, 3, 5],
  },
  {
    id: 4,
    name: 'Sân Bóng Sơn Trà',
    district: 'Quận Sơn Trà',
    city: 'Đà Nẵng',
    rating: 4.2,
    openingHours: '6:00 - 22:00',
    isHot: false,
    description: 'Sân bóng gần biển, không gian thoáng mát, lý tưởng cho các hoạt động thể thao.',
    price: 190000,
    image: 'https://tse2.mm.bing.net/th/id/OIP.Ajy_viDE43sRRqgKW9nKRgHaGc?rs=1&pid=ImgDetMain&o=7&rm=3',
    amenities: [2, 4],
  },
  {
    id: 5,
    name: 'Sân Bóng Liên Chiểu',
    district: 'Quận Liên Chiểu',
    city: 'Đà Nẵng',
    rating: 4.6,
    openingHours: '5:00 - 23:00',
    isHot: true,
    description: 'Sân bóng mới với cỏ nhân tạo chất lượng cao, có bãi đỗ xe rộng rãi.',
    price: 210000,
    amenities: [1, 3, 4, 5],
  },
];

// Hàm tính giờ từ string "HH:MM - HH:MM"
export const parseOpeningHours = (hoursString) => {
  const [startStr, endStr] = hoursString.split(' - ');
  const [startHour, startMin] = startStr.split(':').map(Number);
  const [endHour, endMin] = endStr.split(':').map(Number);
  
  const times = [];
  let current = new Date();
  current.setHours(startHour, startMin, 0);
  const end = new Date();
  end.setHours(endHour, endMin, 0);
  
  while (current <= end) {
    times.push(current.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    current = new Date(current.getTime() + 30 * 60000); // Thêm 30 phút
  }
  
  return times;
};
