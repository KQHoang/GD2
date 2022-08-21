import axios from "axios";
export default {
    async deleteUser(userID, me) {
        await axios
            .delete(
                `https://localhost:44328/api/v1/Users/${userID}`,
            )
            .then(function(res) {
                console.log(res);
                me.$emit("reLoad");
                me.$emit("closePopUp", true);
            })
            .catch(function(res) {
                console.log(res);
            });
    }
}