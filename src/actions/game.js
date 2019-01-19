import Api from '../../server/Api';

export const startValidateTableId = (tableId, userId) => {
    return (dispatch) =>{
        return Api.post("CheckTableId",{tableId, userId}).then((Response) => {
            const result = JSON.parse(Response.data.d);
            dispatch(validateTableId(!!result));
        });
    }
}

export const validateTableId = (result) => ({
    type:'ISTABLEIDVALID',
    isTableIdValid: result
});


export const startCreateNewGame = (playersCount, gameType,chipCount,chipTypes,chipValues,bigBlind,smallBlind,blindTime,userId) => {
    return (dispatch) =>{
        return Api.post("CreateNewGame",{playersCount, gameType,chipCount,chipTypes,chipValues,bigBlind,smallBlind,blindTime,userId}).then((Response) => {
            const gameId = JSON.parse(Response.data.d);
            dispatch(newGameId(gameId));
        });
    }
}

export const newGameId = (gameId)=> ({
type:'GAMEID',
NewGameId: gameId

});

export const startJoinGame = (gameId,userId) => {
    return (dispatch) =>{
        return Api.post("AddPlayerToGame",{gameId,userId}).then((Response) => {
            const joinGame = JSON.parse(Response.data.d);
            dispatch(joinNewGame(joinGame));
        });
    }
}

export const joinNewGame = (joinGame)=> ({
type:'JOINGAME',
joinNewGame: joinGame

});


