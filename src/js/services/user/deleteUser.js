import axios from "axios";
export default {
    /**
     * Axios thực hiện xoá người dùng
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @param {*ID người dùng cần xoá} userID 
     * @param {*} me 
     */
    async deleteUser(userID, me) {
        await axios
            .delete(
                `https://localhost:44328/api/v1/Users/${userID}`,
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi xoá người dùng.");
                me.$emit("reLoad");
                me.$emit("closePopUp", true);
            })
            .catch(function(res) {
                console.log(res);
            });
    }
}