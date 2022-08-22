var Resources = {
    // Màu sắc cho ProfileImage
    ColorProfileImage: {
        Color0: "0",
        Color1: "1",
        Color2: "2",
        Color3: "3",
        Color4: "4",
        Color5: "5",
        Color6: "6",
        Color7: "7",
        Color8: "8",
        Color9: "9"
    },

    // Tên các cột trong popup tuỳ chỉnh
    ColumnName: ["Mã nhân viên", "Họ và tên", "Phòng ban", "Vị trí công việc", "Email", "Vai trò", "Trạng thái"],

    // Tên các trạng thái
    StatusName: {
        WorkingName: "Đang hoạt động",
        WConfirmName: "Chờ xác nhận",
        NotActiveName: "Chưa kích hoạt",
        DeActivationName: "Ngừng kích hoạt"
    },

    // Người dùng mới
    newUser: {
        roleID: [],
        fullName: "",
        departmentID: "",
        positionID: "",
        email: "",
        status: null,
        userCode: ""
    }

}
export default Resources;