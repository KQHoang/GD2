import axios from 'axios';
export default {
    async addUser(userList, me) {
        await axios
            .post(
                ` https://localhost:44328/api/v1/Users/postAll`, userList
            )
            .then(function(res) {
                // console.log(res);
                me.$emit("reLoad");
                me.$emit("closePopUp", false);
            })
            .catch(function(res) {
                console.log(res);
            });
    }
}