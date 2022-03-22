import { ADD_USER,ADD_DATA,DEL_USER,HANDLE_CURRENT_SEL,ADD_TOKEN,FILTER_BY_COMPANY } from "./actions";

export const addUser=(data)=>{
    return {
        type:ADD_USER,
        payload:data
    }
}

export const addData=(data)=>{
    return {
        type:ADD_DATA,
        payload:data
    }    
}

export const delUser=(data)=>{
    return {
        type:DEL_USER,
        payload:data
    }
}

export const handleCurrentSel=(data)=>{
    return{
        type:HANDLE_CURRENT_SEL,
        payload:data
    }
}

export const addToken=(data)=>{
    return {
        type:ADD_TOKEN,
        payload:data
    }
}
