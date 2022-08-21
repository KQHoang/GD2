import axios from 'axios';
export default {
    async updateUserRole(userRoles, me) {
        await axios
            .put(
                `https://localhost:44328/api/v1/UserRoles/putAll/`, userRoles
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