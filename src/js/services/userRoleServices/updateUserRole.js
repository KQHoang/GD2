import axios from 'axios';
export default {
    /**
     * Axios thực hiện cập nhật vai trò người dùng
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022 
     * @param {*} userRoles: mảng đối tượng cần cập nhật
     * @param {*} me 
     */
    async updateUserRole(userRoles, me) {
        await axios
            .put(
                `https://localhost:44328/api/v1/UserRoles/putAll/`, userRoles
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi thực hiện cập nhật vai trò.");
                me.$emit("reLoad");
                me.$emit("closePopUp", true);
            })
            .catch(function(res) {
                console.log(res);
            });
    }
}