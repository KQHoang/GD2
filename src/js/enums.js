var Enum = {
    // trạng thái người dùng
    Status: {
        Working: 0,
        WConfirm: 1,
        NotActive: 2,
        DeActivation: 3
    },

    // thực hiện sửa hoặc xoá
    EditMode: {
        Edit: 0,
        Delete: 1
    },

    // thực hiện cập nhật vai trò người dùng
    UserRoleStatus: {
        Add: 1, // thực hiện thêm vai trò
        Delete: 2, // thực hiện xoá vai trò
        NoAction: 3 // không làm gì cả
    }
}

export default Enum