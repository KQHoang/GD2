import axios from 'axios';
export default {
    /**
     * Axios thực hiện lấy toàn bộ người dùng
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @returns mảng người dùng
     */
    async getListUser() {
        var users = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Users`
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi tải dữ liệu về.");
                users = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });

        return users;
    }
}