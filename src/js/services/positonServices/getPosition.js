import axios from 'axios';
export default {
    /**
     * Axios thực hiện lấy dữ liệu bảng position
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @returns : mảng vị trí người dùng
     */
    async getPosition() {
        var positions = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Positions`
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi tải dữ liệu về.");
                positions = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });

        return positions;
    }
}