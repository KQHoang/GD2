import axios from "axios";
export default {
    async getRoleList() {
        var roleList = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Roles`
            )
            .then(function(res) {
                roleList = res.data;
                // console.log(me.roles);

            })
            .catch(function(res) {
                console.log(res);
            });
        return roleList;
    }
}