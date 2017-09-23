//ACTION TYPE
const GET_DISTANCES = 'GET_DISTANCES'
const ADD_DISTANCE = 'ADD_DISTANCE'

//ACTION CREATORS
const getDistances = () => ({type: GET_DISTANCES})
const addDistance = distance => ({type: ADD_DISTANCE, distance})

//THUNKS
export const getDistancesThunk = () => 
    dispatch => 
        dispatch(getDistances())

export const addDistanceThunk = distance => 
    dispatch =>
        dispatch(addDistance(distance))

//REDUCERS
export default function (state = [], action) {
    switch(action.type) {
        case GET_DISTANCES:
            return state
        case ADD_DISTANCE:
            return [...state, action.distance]
        default:
            return state
    }
}