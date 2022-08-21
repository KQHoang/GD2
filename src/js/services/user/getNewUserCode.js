import axios from 'axios';
export default {
    async getNewUserCode() {
        var newCode = "";
        await axios
            .get(
                `https://localhost:44328/api/v1/Users/NewUserCode`
            )
            .then(function(res) {
                newCode = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });
        return newCode;
    }
}