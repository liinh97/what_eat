const TestReducer = (state, action) => {

    switch(action){
        case 'UP':
            return state + 1;
        case 'DOWN':
            return state - 1;
    }
    
}

export default TestReducer;