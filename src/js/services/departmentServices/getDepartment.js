import axios from 'axios';
export default {
    /**
     * Axios thực hiện lấy dữ liệu bảng department
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     */
    async getDepartment() {
        var departments = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Departments`
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi lấy dữ liệu.");
                departments = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });

        return departments;
    }
}