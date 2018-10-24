

export default (state = {}, action) => {
    switch (action.type) {

     case'UPDATE_TOKEN':
        return {
           Token: action.Token
        };

      default:
        return state;
    }
  };
