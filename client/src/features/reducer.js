import { ADD_USER, ADD_DATA, DEL_USER, HANDLE_CURRENT_SEL,ADD_TOKEN } from "./actions"
const initialState = {
    usersData: [],
    currentSelection: new Set(),
    token: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DATA:
            return {
                ...state,
                usersData: action.payload
            }
        case ADD_USER:
            return {
                ...state,
                usersData: [...state.usersData, action.payload]
            }
        case DEL_USER:
            return {
                ...state,
                usersData: [...state.usersData.filter(el => el.id !== action.payload)]
            }
        case HANDLE_CURRENT_SEL:
            if (state.currentSelection.has(action.payload)) state.currentSelection.delete(action.payload)
            else state.currentSelection.add(action.payload)
            return {
                ...state,
                currentSelection: state.currentSelection
            }
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}