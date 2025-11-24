// Danh sách thành phố và quận/huyện
const dataAddress = {
    // --- THÀNH PHỐ TRỰC THUỘC TRUNG ƯƠNG ---
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Long Biên", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Hoàng Mai", "Thanh Xuân", "Sóc Sơn", "Đông Anh", "Gia Lâm", "Nam Từ Liêm", "Thanh Trì", "Bắc Từ Liêm", "Mê Linh", "Hà Đông", "Sơn Tây", "Ba Vì", "Phúc Thọ", "Đan Phượng", "Hoài Đức", "Quốc Oai", "Thạch Thất", "Chương Mỹ", "Thanh Oai", "Thường Tín", "Phú Xuyên", "Ứng Hòa", "Mỹ Đức"],
    "Thành phố Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Bình Tân", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Thành phố Thủ Đức", "Bình Chánh", "Cần Giờ", "Củ Chi", "Hóc Môn", "Nhà Bè"],
    "Đà Nẵng": ["Hải Châu", "Cẩm Lệ", "Thanh Khê", "Liên Chiểu", "Ngũ Hành Sơn", "Sơn Trà", "Hòa Vang", "Hoàng Sa"],
    "Hải Phòng": ["Hồng Bàng", "Lê Chân", "Ngô Quyền", "Kiến An", "Hải An", "Đồ Sơn", "Dương Kinh", "Thủy Nguyên", "An Dương", "An Lão", "Kiến Thụy", "Tiên Lãng", "Vĩnh Bảo", "Cát Hải", "Bạch Long Vĩ"],
    "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt", "Vĩnh Thạnh", "Cờ Đỏ", "Phong Điền", "Thới Lai"],

    // --- TÂY BẮC BỘ ---
    "Điện Biên": ["Thành phố Điện Biên Phủ", "Thị xã Mường Lay", "Điện Biên", "Tuần Giáo", "Mường Chà", "Tủa Chùa", "Điện Biên Đông", "Mường Nhé", "Mường Ảng", "Nậm Pồ"],
    "Hòa Bình": ["Thành phố Hòa Bình", "Lương Sơn", "Cao Phong", "Đà Bắc", "Kim Bôi", "Lạc Sơn", "Lạc Thủy", "Mai Châu", "Tân Lạc", "Yên Thủy"],
    "Lai Châu": ["Thành phố Lai Châu", "Tam Đường", "Mường Tè", "Sìn Hồ", "Phong Thổ", "Than Uyên", "Tân Uyên", "Nậm Nhùn"],
    "Lào Cai": ["Thành phố Lào Cai", "Thị xã Sa Pa", "Bát Xát", "Bảo Thắng", "Bảo Yên", "Bắc Hà", "Văn Bàn", "Mường Khương", "Si Ma Cai"],
    "Sơn La": ["Thành phố Sơn La", "Quỳnh Nhai", "Mường La", "Thuận Châu", "Phù Yên", "Bắc Yên", "Mai Sơn", "Sông Mã", "Yên Châu", "Mộc Châu", "Sốp Cộp", "Vân Hồ"],
    "Yên Bái": ["Thành phố Yên Bái", "Thị xã Nghĩa Lộ", "Lục Yên", "Văn Yên", "Mù Cang Chải", "Trấn Yên", "Trạm Tấu", "Văn Chấn", "Yên Bình"],

    // --- ĐÔNG BẮC BỘ ---
    "Bắc Giang": ["Thành phố Bắc Giang", "Thị xã Việt Yên", "Hiệp Hòa", "Lạng Giang", "Lục Nam", "Lục Ngạn", "Sơn Động", "Tân Yên", "Yên Dũng", "Yên Thế"],
    "Bắc Kạn": ["Thành phố Bắc Kạn", "Ba Bể", "Bạch Thông", "Chợ Đồn", "Chợ Mới", "Na Rì", "Ngân Sơn", "Pác Nặm"],
    "Cao Bằng": ["Thành phố Cao Bằng", "Bảo Lâm", "Bảo Lạc", "Hà Quảng", "Hòa An", "Nguyên Bình", "Thạch An", "Quảng Hòa", "Trùng Khánh", "Hạ Lang"],
    "Hà Giang": ["Thành phố Hà Giang", "Đồng Văn", "Mèo Vạc", "Yên Minh", "Quản Bạ", "Vị Xuyên", "Bắc Mê", "Hoàng Su Phì", "Xín Mần", "Bắc Quang", "Quang Bình"],
    "Lạng Sơn": ["Thành phố Lạng Sơn", "Tràng Định", "Bình Gia", "Văn Lãng", "Cao Lộc", "Văn Quan", "Bắc Sơn", "Hữu Lũng", "Chi Lăng", "Lộc Bình", "Đình Lập"],
    "Phú Thọ": ["Thành phố Việt Trì", "Thị xã Phú Thọ", "Đoan Hùng", "Hạ Hòa", "Thanh Ba", "Phù Ninh", "Yên Lập", "Cẩm Khê", "Tam Nông", "Lâm Thao", "Thanh Sơn", "Thanh Thủy", "Tân Sơn"],
    "Quảng Ninh": ["Thành phố Hạ Long", "Thành phố Móng Cái", "Thành phố Uông Bí", "Thành phố Cẩm Phả", "Thị xã Quảng Yên", "Thị xã Đông Triều", "Bình Liêu", "Tiên Yên", "Đầm Hà", "Hải Hà", "Ba Chẽ", "Vân Đồn", "Cô Tô"],
    "Thái Nguyên": ["Thành phố Thái Nguyên", "Thành phố Sông Công", "Thành phố Phổ Yên", "Định Hóa", "Phú Lương", "Đồng Hỷ", "Võ Nhai", "Đại Từ", "Phú Bình"],
    "Tuyên Quang": ["Thành phố Tuyên Quang", "Lâm Bình", "Na Hang", "Chiêm Hóa", "Hàm Yên", "Yên Sơn", "Sơn Dương"],

    // --- ĐỒNG BẰNG SÔNG HỒNG ---
    "Bắc Ninh": ["Thành phố Bắc Ninh", "Thành phố Từ Sơn", "Thị xã Quế Võ", "Thị xã Thuận Thành", "Yên Phong", "Tiên Du", "Gia Bình", "Lương Tài"],
    "Hà Nam": ["Thành phố Phủ Lý", "Thị xã Duy Tiên", "Kim Bảng", "Thanh Liêm", "Bình Lục", "Lý Nhân"],
    "Hải Dương": ["Thành phố Hải Dương", "Thành phố Chí Linh", "Thị xã Kinh Môn", "Bình Giang", "Cẩm Giàng", "Gia Lộc", "Kim Thành", "Nam Sách", "Ninh Giang", "Thanh Hà", "Thanh Miện", "Tứ Kỳ"],
    "Hưng Yên": ["Thành phố Hưng Yên", "Thị xã Mỹ Hào", "Văn Lâm", "Văn Giang", "Yên Mỹ", "Khoái Châu", "Ân Thi", "Kim Động", "Tiên Lữ", "Phù Cừ"],
    "Nam Định": ["Thành phố Nam Định", "Mỹ Lộc", "Vụ Bản", "Ý Yên", "Nghĩa Hưng", "Nam Trực", "Trực Ninh", "Xuân Trường", "Giao Thủy", "Hải Hậu"],
    "Ninh Bình": ["Thành phố Ninh Bình", "Thành phố Tam Điệp", "Nho Quan", "Gia Viễn", "Hoa Lư", "Yên Khánh", "Kim Sơn", "Yên Mô"],
    "Thái Bình": ["Thành phố Thái Bình", "Quỳnh Phụ", "Hưng Hà", "Đông Hưng", "Thái Thụy", "Tiền Hải", "Kiến Xương", "Vũ Thư"],
    "Vĩnh Phúc": ["Thành phố Vĩnh Yên", "Thành phố Phúc Yên", "Lập Thạch", "Tam Dương", "Tam Đảo", "Bình Xuyên", "Yên Lạc", "Vĩnh Tường", "Sông Lô"],

    // --- BẮC TRUNG BỘ ---
    "Hà Tĩnh": ["Thành phố Hà Tĩnh", "Thị xã Hồng Lĩnh", "Thị xã Kỳ Anh", "Hương Sơn", "Đức Thọ", "Vũ Quang", "Nghi Xuân", "Can Lộc", "Hương Khê", "Thạch Hà", "Cẩm Xuyên", "Kỳ Anh"],
    "Nghệ An": ["Thành phố Vinh", "Thị xã Cửa Lò", "Thị xã Thái Hòa", "Thị xã Hoàng Mai", "Quế Phong", "Quỳ Châu", "Kỳ Sơn", "Tương Dương", "Nghĩa Đàn", "Quỳ Hợp", "Quỳnh Lưu", "Con Cuông", "Tân Kỳ", "Anh Sơn", "Diễn Châu", "Yên Thành", "Đô Lương", "Thanh Chương", "Nghi Lộc", "Nam Đàn", "Hưng Nguyên"],
    "Quảng Bình": ["Thành phố Đồng Hới", "Thị xã Ba Đồn", "Minh Hóa", "Tuyên Hóa", "Quảng Trạch", "Bố Trạch", "Quảng Ninh", "Lệ Thủy"],
    "Quảng Trị": ["Thành phố Đông Hà", "Thị xã Quảng Trị", "Vĩnh Linh", "Hướng Hóa", "Gio Linh", "Đa Krông", "Cam Lộ", "Triệu Phong", "Hải Lăng", "Cồn Cỏ"],
    "Thanh Hóa": ["Thành phố Thanh Hóa", "Thành phố Sầm Sơn", "Thị xã Bỉm Sơn", "Thị xã Nghi Sơn", "Mường Lát", "Quan Hóa", "Quan Sơn", "Bá Thước", "Cẩm Thủy", "Lang Chánh", "Ngọc Lặc", "Thường Xuân", "Như Xuân", "Như Thanh", "Thạch Thành", "Hà Trung", "Vĩnh Lộc", "Yên Định", "Thọ Xuân", "Thiệu Hóa", "Triệu Sơn", "Hậu Lộc", "Hoằng Hóa", "Nga Sơn", "Đông Sơn", "Quảng Xương", "Nông Cống"],
    "Thừa Thiên Huế": ["Thành phố Huế", "Thị xã Hương Thủy", "Thị xã Hương Trà", "A Lưới", "Nam Đông", "Phong Điền", "Phú Lộc", "Phú Vang", "Quảng Điền"],

    // --- NAM TRUNG BỘ ---
    "Bình Định": ["Thành phố Quy Nhơn", "Thị xã An Nhơn", "Thị xã Hoài Nhơn", "An Lão", "Hoài Ân", "Phù Mỹ", "Vĩnh Thạnh", "Tây Sơn", "Phù Cát", "Tuy Phước", "Vân Canh"],
    "Bình Thuận": ["Thành phố Phan Thiết", "Thị xã La Gi", "Tuy Phong", "Bắc Bình", "Hàm Thuận Bắc", "Hàm Thuận Nam", "Tánh Linh", "Đức Linh", "Hàm Tân", "Phú Quý"],
    "Khánh Hòa": ["Thành phố Nha Trang", "Thành phố Cam Ranh", "Thị xã Ninh Hòa", "Vạn Ninh", "Diên Khánh", "Khánh Vĩnh", "Khánh Sơn", "Cam Lâm", "Trường Sa"],
    "Ninh Thuận": ["Thành phố Phan Rang-Tháp Chàm", "Bác Ái", "Ninh Sơn", "Ninh Hải", "Ninh Phước", "Thuận Bắc", "Thuận Nam"],
    "Phú Yên": ["Thành phố Tuy Hòa", "Thị xã Sông Cầu", "Thị xã Đông Hòa", "Đồng Xuân", "Tuy An", "Sơn Hòa", "Sông Hinh", "Tây Hòa", "Phú Hòa"],
    "Quảng Nam": ["Thành phố Tam Kỳ", "Thành phố Hội An", "Thị xã Điện Bàn", "Tây Giang", "Đông Giang", "Nam Giang", "Phước Sơn", "Bắc Trà My", "Nam Trà My", "Hiệp Đức", "Tiên Phước", "Nông Sơn", "Duy Xuyên", "Đại Lộc", "Thăng Bình", "Quế Sơn", "Núi Thành", "Phú Ninh"],
    "Quảng Ngãi": ["Thành phố Quảng Ngãi", "Thị xã Đức Phổ", "Bình Sơn", "Trà Bồng", "Sơn Tịnh", "Tư Nghĩa", "Sơn Hà", "Sơn Tây", "Minh Long", "Nghĩa Hành", "Mộ Đức", "Ba Tơ", "Lý Sơn"],

    // --- TÂY NGUYÊN ---
    "Đắk Lắk": ["Thành phố Buôn Ma Thuột", "Thị xã Buôn Hồ", "Ea H'leo", "Ea Súp", "Buôn Đôn", "Cư M'gar", "Krông Búk", "Krông Năng", "Ea Kar", "M'Drắk", "Krông Bông", "Krông Pắc", "Krông A Na", "Lắk", "Cư Kuin"],
    "Đắk Nông": ["Thành phố Gia Nghĩa", "Đắk Glong", "Cư Jút", "Đắk Mil", "Krông Nô", "Đắk Song", "Đắk R'Lấp", "Tuy Đức"],
    "Gia Lai": ["Thành phố Pleiku", "Thị xã An Khê", "Thị xã Ayun Pa", "KBang", "Đắk Đoa", "Chư Păh", "Ia Grai", "Mang Yang", "Kông Chro", "Đức Cơ", "Chư Prông", "Chư Sê", "Đắk Pơ", "Ia Pa", "Krông Pa", "Phú Thiện", "Chư Pưh"],
    "Kon Tum": ["Thành phố Kon Tum", "Đắk Glei", "Ngọc Hồi", "Đắk Tô", "Kon Plông", "Kon Rẫy", "Đắk Hà", "Sa Thầy", "Tu Mơ Rông", "Ia H' Drai"],
    "Lâm Đồng": ["Thành phố Đà Lạt", "Thành phố Bảo Lộc", "Đam Rông", "Lạc Dương", "Lâm Hà", "Đơn Dương", "Đức Trọng", "Di Linh", "Bảo Lâm", "Đạ Huoai", "Đạ Tẻh", "Cát Tiên"],

    // --- ĐÔNG NAM BỘ ---
    "Bà Rịa - Vũng Tàu": ["Thành phố Vũng Tàu", "Thành phố Bà Rịa", "Thị xã Phú Mỹ", "Châu Đức", "Xuyên Mộc", "Long Điền", "Đất Đỏ", "Côn Đảo"],
    "Bình Dương": ["Thành phố Thủ Dầu Một", "Thành phố Dĩ An", "Thành phố Thuận An", "Thành phố Tân Uyên", "Thị xã Bến Cát", "Bàu Bàng", "Bắc Tân Uyên", "Dầu Tiếng", "Phú Giáo"],
    "Bình Phước": ["Thành phố Đồng Xoài", "Thị xã Bình Long", "Thị xã Phước Long", "Bù Gia Mập", "Lộc Ninh", "Bù Đốp", "Hớn Quản", "Đồng Phú", "Bù Đăng", "Chơn Thành", "Phú Riềng"],
    "Đồng Nai": ["Thành phố Biên Hòa", "Thành phố Lonnpg Khánh", "Tân Phú", "Vĩnh Cửu", "Định Quán", "Trảng Bom", "Thống Nhất", "Cẩm Mỹ", "Long Thành", "Xuân Lộc", "Nhơn Trạch"],
    "Tây Ninh": ["Thành phố Tây Ninh", "Thị xã Hòa Thành", "Thị xã Trảng Bàng", "Tân Biên", "Tân Châu", "Dương Minh Châu", "Châu Thành", "Gò Dầu", "Bến Cầu"],

    // --- ĐỒNG BẰNG SÔNG CỬU LONG ---
    "An Giang": ["Thành phố Long Xuyên", "Thành phố Châu Đốc", "Thị xã Tân Châu", "An Phú", "Tịnh Biên", "Tri Tôn", "Châu Phú", "Châu Thành", "Phú Tân", "Chợ Mới", "Thoại Sơn"],
    "Bạc Liêu": ["Thành phố Bạc Liêu", "Thị xã Giá Rai", "Hồng Dân", "Phước Long", "Vĩnh Lợi", "Hòa Bình", "Đông Hải"],
    "Bến Tre": ["Thành phố Bến Tre", "Châu Thành", "Chợ Lách", "Mỏ Cày Nam", "Giồng Trôm", "Bình Đại", "Ba Tri", "Thạnh Phú", "Mỏ Cày Bắc"],
    "Cà Mau": ["Thành phố Cà Mau", "U Minh", "Thới Bình", "Trần Văn Thời", "Cái Nước", "Đầm Dơi", "Năm Căn", "Phú Tân", "Ngọc Hiển"],
    "Đồng Tháp": ["Thành phố Cao Lãnh", "Thành phố Sa Đéc", "Thành phố Hồng Ngự", "Tân Hồng", "Hồng Ngự", "Tam Nông", "Tháp Mười", "Cao Lãnh", "Thanh Bình", "Lấp Vò", "Lai Vung", "Châu Thành"],
    "Hậu Giang": ["Thành phố Vị Thanh", "Thành phố Ngã Bảy", "Thị xã Long Mỹ", "Phụng Hiệp", "Long Mỹ", "Vị Thủy", "Châu Thành", "Châu Thành A"],
    "Kiên Giang": ["Thành phố Rạch Giá", "Thành phố Hà Tiên", "Thành phố Phú Quốc", "Kiên Lương", "Hòn Đất", "Tân Hiệp", "Châu Thành", "Giồng Riềng", "Gò Quao", "An Biên", "An Minh", "Vĩnh Thuận", "U Minh Thượng", "Kiên Hải", "Giang Thành"],
    "Long An": ["Thành phố Tân An", "Thị xã Kiến Tường", "Tân Hưng", "Vĩnh Hưng", "Mộc Hóa", "Tân Thạnh", "Thạnh Hóa", "Đức Huệ", "Đức Hòa", "Bến Lức", "Thủ Thừa", "Tân Trụ", "Cần Đước", "Cần Giuộc", "Châu Thành"],
    "Sóc Trăng": ["Thành phố Sóc Trăng", "Thị xã Vĩnh Châu", "Thị xã Ngã Năm", "Châu Thành", "Kế Sách", "Mỹ Tú", "Cù Lao Dung", "Long Phú", "Mỹ Xuyên", "Thạnh Trị", "Trần Đề"],
    "Tiền Giang": ["Thành phố Mỹ Tho", "Thị xã Gò Công", "Thị xã Cai Lậy", "Tân Phước", "Cái Bè", "Cai Lậy", "Châu Thành", "Chợ Gạo", "Gò Công Tây", "Gò Công Đông", "Tân Phú Đông"],
    "Trà Vinh": ["Thành phố Trà Vinh", "Thị xã Duyên Hải", "Càng Long", "Cầu Kè", "Tiểu Cần", "Châu Thành", "Cầu Ngang", "Trà Cú", "Duyên Hải"],
    "Vĩnh Long": ["Thành phố Vĩnh Long", "Thị xã Bình Minh", "Long Hồ", "Mang Thít", "Vũng Liêm", "Tam Bình", "Trà Ôn", "Bình Tân"]
};

export default dataAddress;
