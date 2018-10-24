import Api from '../../server/Api';

export const updateToken = (Token) => ({
    type: 'UPDATE_TOKEN',
    Token
});

export const startUpdateNotification = (email,Token) => {
    debugger;
    return (dispatch) => {
      return Api.post("UpdateNotificationKey",{email,Token}).then(() => {
        debugger;
        dispatch(updateToken(Token))
      }).catch((error) => {
        console.log(error);
      })
  };
  };
