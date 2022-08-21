import axios from 'axios';
export default {
    async getDepartment() {
        var departments = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Departments`
            )
            .then(function(res) {
                departments = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });

        return departments;
    }
}