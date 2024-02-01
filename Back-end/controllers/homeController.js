import User from '../models/userModel.js'; // Import User model (đảm bảo bạn đã định nghĩa Model cho người dùng)

// Hàm hiển thị tất cả người dùng từ cơ sở dữ liệu
export const getInfo = async (req, res) => {
  try {
    const users = await User.find(); // Tìm tất cả người dùng
    // users.user_id = users._id;
    res.status(200).json(users); // Trả về danh sách tất cả người dùng
  } catch (error) {
    res.status(500).json({ error: 'Lỗi trong quá trình truy vấn dữ liệu' });
  }
};

// Hàm sửa thông tin người dùng trong bảng users
export const changeInfo = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ tham số đường dẫn
    const updatedUserInfo = req.body; // Lấy thông tin người dùng cần sửa từ body của yêu cầu
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInfo, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    res.status(200).json(updatedUser); // Trả về thông tin người dùng sau khi sửa
  } catch (error) {
    res.status(500).json({ error: 'Lỗi trong quá trình cập nhật thông tin người dùng' });
  }
};
