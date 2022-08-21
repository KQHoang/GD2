import axios from 'axios';
export default {
    async getPosition() {
        var positions = [];
        await axios
            .get(
                `https://localhost:44328/api/v1/Positions`
            )
            .then(function(res) {
                positions = res.data;
            })
            .catch(function(res) {
                console.log(res);
            });

        return positions;
    }
}