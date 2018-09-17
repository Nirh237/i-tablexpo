

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
          PhoneNumber:action.PhoneNumber,
          PicturePath: action.PicturePath
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
