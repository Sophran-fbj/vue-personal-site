import axios from 'axios'
import showMessage from "@/utils/showMessage";
const ins = axios.create();

ins.interceptors.response.use(function (resp) {
    if (resp.data.code) {
        showMessage({
            content: "失败",
            duration: 1500,
            type: 'error'
        });
        return null;
    }
    return resp.data.data;
});

export default ins;