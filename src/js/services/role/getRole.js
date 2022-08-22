import axios from "axios";
export default {
    /**
     * Axios thực hiện lấy vai trò
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @returns mảng vai trò người dùng
     */
    async getRoleList() {
        var roleList = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Roles`
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi tải dữ liệu về.");
                roleList = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });
        return roleList;
    }
}