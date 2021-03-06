

export default (state = {}, action) => {
    switch (action.type) {

      case 'LOGIN':
        return {
          Email: action.Email,
          Password: action.Password,
          ID: action.ID,
          UserName: action.UserName,
          FirstName: action.FirstName,
          LastName: action.LastName,
          Age: action.Age,
          PicturePath: action.PicturePath,
          PhoneNumber:action.PhoneNumber,
          WinCount: action.WinCount,
          LoseCount: action.LoseCount,
          Token: action.Token

        };

      case 'LOGOUT':
        return {};

      case 'ERROR':
        return {
          msg:action.msg
        };

        case 'SIGNIN':
        return {
          Uu_id:action.Uu_id
        };

      default:
        return state;
    }
  };
