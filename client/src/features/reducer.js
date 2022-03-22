import { ADD_USER, ADD_DATA, DEL_USER, HANDLE_CURRENT_SEL, ADD_TOKEN } from "./actions"
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
            let selectedComp = []
            if (action.payload.key == "reset") {
                state.currentSelection = new Set();
                selectedComp = action.payload.temp
            }
            else if (action.payload.key == "selAll") {
                state.currentSelection.add("DC united")
                state.currentSelection.add("manchaster united")
                state.currentSelection.add("LA galaxy")
                state.currentSelection.add("DC united")
                selectedComp = action.payload.temp
            }
            else {
                state.currentSelection.delete('All')
                if (state.currentSelection.has(action.payload.key)) state.currentSelection.delete(action.payload.key)
                else state.currentSelection.add(action.payload.key)
                if (state.currentSelection.size == 0) selectedComp = action.payload.temp;
                else {
                    console.log("else me hu bhai");
                    for (let key of state.currentSelection) {
                        action.payload.temp.map((el) => {
                            if (el.company == key) selectedComp.push(el)
                        })
                    }
                }
            }
            return {
                ...state,
                currentSelection: state.currentSelection,
                usersData: selectedComp
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