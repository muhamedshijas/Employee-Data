import {createStore} from 'redux';
const initialState={
    admin:{login:null},
    refresh:true
    
}

function reducer(state=initialState, action){
    switch(action.type){
        
        case 'admin': return {...state, admin:action.payload};
        case 'refresh': return {...state, refresh:!state.refresh};
        default: return state;
    }

}

export default createStore(reducer)