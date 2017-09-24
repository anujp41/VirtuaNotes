//ACTION TYPE
const GET_MARKERS = 'GET_MARKERS'
const ADD_MARKER = 'ADD_MARKER'
const REMOVE_MARKER = 'REMOVE_MARKER'

//ACTION CREATORS
const getMarkers = () => ({type: GET_MARKERS})
const addMarker = marker => ({type: ADD_MARKER, marker})
const removeMarker = marker => ({type: REMOVE_MARKER, marker})

//THUNKS
export const getMarkersThunk = () => 
    dispatch => 
        dispatch(getMarkers())

export const addMarkerThunk = marker => 
    dispatch =>
        dispatch(addMarker(marker))

export const removeMarkerThunk = marker =>
    dispatch => 
        dispatch(removeMarker(marker))

//REDUCERS
export default function (state = [], action) {
    switch(action.type) {
        case GET_MARKERS:
            return state
        case ADD_MARKER:
            return [...state, action.marker]
        case REMOVE_MARKER:
            return state.filter(item => item.id !== action.marker.id)
        default:
            return state
    }
}