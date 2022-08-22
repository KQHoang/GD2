import axios from 'axios';
export default {
    /**
     * Axios thực hiện thêm người dùng
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @param {*} userList : mảng người dùng cần thêm
     * @param {*} me 
     */
    async addUser(userList, me) {
        await axios
            .post(
                ` https://localhost:44328/api/v1/Users/postAll`, userList
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi thực hiện thêm mới người dùng.");
                me.$emit("reLoad");
                me.$emit("closePopUp", false);
            })
            .catch(function(res) {
                console.log(res);
            });
    }
}