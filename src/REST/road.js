import axios from 'axios';

const allroads = 'https://devwebtsdm01.delasoftinc/tsdm-ridedata/rest/api/staticlrsnetwork/allroads'

const request = axios.create({
    baseURL: 'http://development.delasoft.com:5000/api/'
})

export const GetRoad = (id) => {
    return request.get('road/' + id)
}

export const GetDetection = (img) => {
    return request.post('detect', { url: img, count: 6 }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const GetUnique = (assets) => {
    return request.post('unique', assets, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export const GetRoads = () => {
    return axios.get(allroads)
}
