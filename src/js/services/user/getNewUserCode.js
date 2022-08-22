import axios from 'axios';
export default {
    /**
     * Axios thực hiện lấy mã người dùng mới
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @returns : mã mới
     */
    async getNewUserCode() {
        var newCode = "";
        await axios
            .get(
                `https://localhost:44328/api/v1/Users/NewUserCode`
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi lấy mã mới.");
                newCode = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });
        return newCode;
    }
}