

export default (state = {},action) => {
    switch(action.type){
        case 'ISTABLEIDVALID':
        return {
            isTableIdValid: action.isTableIdValid
        };

        default:
            return state;
    }
}