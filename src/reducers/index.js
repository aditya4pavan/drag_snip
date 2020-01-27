import { SET_MILE, SET_RESULTS, SET_COUNT, SET_AREA, SET_CONFIDENCE, SET_COLOR, SET_RANGE } from "../actions";


const initialState = {
    milepoint: 0, detections: [], results: [], area: 2000, confidence: 70, count: 2, color: '#dc3526'
    //[{ 'label': 'stop', 'mile': '0.17', 'frequency': 4, 'details': [{ 'direction': 'RIGHT', 'top': 38.18321197411003, 'bottom': 42.5793284789644, 'left': 59.522885315533976, 'right': 62.99548847087378, 'area': 12438.271103999978, 'label': 'stop', 'uid': '48948d31-5dfd-40fe-9e19-8bb6ca0dbcef', 'mile': '0.15', 'box': [1961.8743, 943.889, 2076.3313, 1052.561], 'score': 99.35576319694519 }, { 'direction': 'RIGHT', 'top': 35.652868122977345, 'bottom': 42.47615695792881, 'left': 69.10909283980583, 'right': 74.16181735436894, 'area': 28090.21384026003, 'label': 'stop', 'uid': 'c9b910b8-fd96-45f0-9206-26cd343536ca', 'mile': '0.16', 'box': [2277.8357, 881.3389, 2444.3735, 1050.0106], 'score': 99.39303398132324 }, { 'direction': 'RIGHT', 'top': 28.17887944983819, 'bottom': 41.06055703883495, 'left': 78.77674150485437, 'right': 88.0278276699029, 'area': 97095.88411710592, 'label': 'stop', 'uid': '91036d9f-24ef-4275-a48e-8b15257067ea', 'mile': '0.17', 'box': [2596.4814, 696.5819, 2901.3972, 1015.01697], 'score': 99.54610466957092 }, { 'direction': 'RIGHT', 'top': 37.45053398058253, 'bottom': 40.84319579288026, 'left': 64.35785800970874, 'right': 66.85925970873787, 'area': 6914.482476919994, 'label': 'stop', 'uid': 'b3691286-d25b-4fb7-b4c7-1552efdb554e', 'mile': '0.14', 'box': [2121.235, 925.7772, 2203.6812, 1009.6438], 'score': 97.97320365905762 }] }, { 'label': 'speedLimit 25', 'mile': '0.22', 'frequency': 4, 'details': [{ 'direction': 'RIGHT', 'top': 37.803758090614885, 'bottom': 41.68786003236245, 'left': 67.82485740291263, 'right': 70.31018810679612, 'area': 7865.212747499972, 'label': 'speedLimit 25', 'uid': '8292b162-7490-446e-bbcb-b422c9420f7a', 'mile': '0.2', 'box': [2235.5073, 934.5089, 2317.4238, 1030.5239], 'score': 99.99266815185547 }, { 'direction': 'RIGHT', 'top': 32.48151011326861, 'bottom': 38.44366100323625, 'left': 68.83753033980584, 'right': 72.61299150485438, 'area': 18340.39309530397, 'label': 'speedLimit 25', 'uid': '17bb975e-67a2-4a2e-8520-acf8354ca41a', 'mile': '0.21', 'box': [2268.885, 802.94293, 2393.3242, 950.3273], 'score': 99.9863052368164 }, { 'direction': 'RIGHT', 'top': 24.73224919093851, 'bottom': 36.24717233009709, 'left': 83.64894720873787, 'right': 90.51798240291261, 'area': 64445.47876625989, 'label': 'speedLimit 25', 'uid': '03fbd1f9-3bfa-4917-aa8b-0d9084b0c1b2', 'mile': '0.22', 'box': [2757.0693, 611.3812, 2983.4727, 896.0301], 'score': 99.98236083984375 }, { 'direction': 'RIGHT', 'top': 39.9610821197411, 'bottom': 42.636921521035596, 'left': 64.7423088592233, 'right': 66.40236650485437, 'area': 3619.2524996249863, 'label': 'speedLimit 25', 'uid': '0afcd1a9-f924-4fd3-932f-68f3602db9a6', 'mile': '0.19', 'box': [2133.9065, 987.83795, 2188.622, 1053.9847], 'score': 99.97203063964844 }] }, { 'label': 'yield', 'mile': '0.77', 'frequency': 1, 'details': [{ 'direction': 'RIGHT', 'top': 5.6384712783171524, 'bottom': 27.125070388349513, 'left': 91.67157160194175, 'right': 100.0, 'area': 145802.98212865007, 'label': 'yield', 'uid': '2aaf3f81-db8b-457c-beaa-04749b57c252', 'mile': '0.77', 'box': [3021.495, 139.38301, 3296, 670.53174], 'score': 89.0340268611908 }] }]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MILE:
            return { ...state, milepoint: action.milepoint }
        case SET_RESULTS:
            return { ...state, results: action.results || [], detections: getDetections(action.results, state.confidence, state.area, state.count) }
        case SET_CONFIDENCE:
            return { ...state, confidence: action.confidence, detections: getDetections(state.results, action.confidence, state.area, state.count) }
        case SET_COUNT:
            return { ...state, count: action.count, detections: getDetections(state.results, state.confidence, state.area, action.count) }
        case SET_AREA:
            return { ...state, area: action.area, detections: getDetections(state.results, state.confidence, action.area, state.count) }
        case SET_COLOR:
            return { ...state, color: action.color }
        case SET_RANGE:
            return { ...state, range: action.range }
        default: {
            return { ...state };
        }
    }
};

const getDetections = (results, confidence, area, count) => {
    return results.map(e => {
        return {
            ...e, details: e.details.filter(x => {
                return (parseFloat(x.area) >= area && parseFloat(x.score) >= confidence)
            })
        }
    }).filter(e => e.details.length > count)
}