//ACTION TYPE
const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'

//ACTION CREATORS
const setCurrent = location => ({type: SET_CURRENT_LOCATION, location})

//THUNKS
export const setCurrentThunk = (location) =>
    dispatch => 
        dispatch(setCurrent(location))

//REDUCERS
export default function (state = {}, action) {
    switch(action.type) {
        case SET_CURRENT_LOCATION:
            return action.location
        default:
            return state
    }
}