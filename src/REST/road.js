import axios from 'axios';

const url = 'https://192.168.1.155/tsdm-dvldata/rest/services/getcurrentyearDvldataset'

export const GetRoad = (id) => {
    return axios.get(url + '/' + id)
}

export const GetDetection = (img) => {
    return axios.post('http://development.delasoft.com:5000/api/detect', { url: img, count: 6 }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const GetUnique = (assets) => {
    return axios.post('http://development.delasoft.com:5000/api/unique', assets, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}