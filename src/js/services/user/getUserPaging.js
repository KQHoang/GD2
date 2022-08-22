import axios from 'axios';
export default {
    /**
     * Axios thực hiện phân trang
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 21/8/2022
     * @param {*} pageIndex : trang hiện tại
     * @param {*} pageSize : số bản ghi trên trang
     * @param {*} filter : tìm kiếm dữ liệu
     * @param {*} me 
     * @returns 
     */
    async getUserPaging(pageIndex, pageSize, filter, me) {
        var users = [];
        var totalRecord = 0;
        var recordStart = 0;
        var recordEnd = 0;
        await axios
            .get(
                `https://localhost:44328/api/v1/Users/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`
            )
            .then(function(res) {
                if (!res)
                    console.log("Có lỗi xảy ra khi tải dữ liệu về.");
                users = res.data.data;
                totalRecord = res.data.totalRecord;
                recordStart = res.data.recordStart;
                recordEnd = res.data.recordEnd;
                setTimeout(() => me.isShowLoading = false, 1000);
            })
            .catch(function(res) {
                console.log(res);
            });

        return { users, totalRecord, recordStart, recordEnd };
    }
}