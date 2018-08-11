import axios from 'axios';


export default function postvideo(blob) {
    let fromData = new FormData();
    fromData.append("video", blob);
    let url = 'http://localhost:8881/postvideo'
    return axios.post(url, fromData, {
        headers: {
            'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata
        }
    })
}