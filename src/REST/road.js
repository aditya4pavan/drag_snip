import axios from 'axios';

const url = 'https://192.168.1.155/tsdm-dvldata/rest/services/getcurrentyearDvldataset'

export const GetRoad = (id) => {
    return axios.get(url + '/' + id)
}

export const GetDetection = (img) => {
    return axios.get('http://192.168.1.124:9000/detect/' + img);
}

export const GetUnique = (assets) => {
    return axios.post('http://192.168.1.124:9000/unique', assets, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}