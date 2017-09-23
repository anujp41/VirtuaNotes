//ACTION TYPE
const GET_MARKERS = 'GET_MARKERS'
const ADD_MARKER = 'ADD_MARKER'

//ACTION CREATORS
const getMarkers = () => ({type: GET_MARKERS})
const addMarker = marker => ({type: ADD_MARKER, marker})

//THUNKS
export const getMarkersThunk = () => 
    dispatch => 
        dispatch(getMarkers())

export const addMarkerThunk = marker => 
    dispatch =>
        dispatch(addMarker(marker))

//REDUCERS
export default function (state = [], action) {
    switch(action.type) {
        case GET_MARKERS:
            return state
        case ADD_MARKER:
            return [...state, action.marker]
        default:
            return state
    }
}