

export default (state = {},action) => {
    switch(action.type){
        case 'ISTABLEIDVALID':
        return {
            isTableIdValid: action.isTableIdValid
        };

        case 'GAMEID':
        return {
            NewGameId: action.NewGameId
        };

        case 'JOINGAME':
        return {
            joinNewGame: action.joinNewGame
        };

        default:
            return state;
    }
}