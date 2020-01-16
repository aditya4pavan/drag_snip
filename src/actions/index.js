export const SET_MILE = 'SET_MILE'
export const SET_RESULTS = 'SET_RESULTS'
export const SET_CONFIDENCE = 'SET_CONFIDENCE'
export const SET_AREA = 'SET_AREA'
export const SET_COUNT = 'SET_COUNT'

export const setMilePoint = (milepoint) => dispatch => {
    dispatch({
        type: SET_MILE,
        milepoint
    })
}

export const setResults = (results) => dispatch => {
    dispatch({
        type: SET_RESULTS,
        results
    })
}

export const setConfidence = (confidence) => dispatch => {
    dispatch({
        type: SET_CONFIDENCE,
        confidence
    })
}

export const setCount = (count) => dispatch => {
    dispatch({
        type: SET_COUNT,
        count
    })
}

export const setArea = (area) => dispatch => {
    dispatch({
        type: SET_AREA,
        area
    })
}