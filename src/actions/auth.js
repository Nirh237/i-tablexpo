import Api from '../../server/Api';

export const logout = () => ({
  type: 'LOGOUT'
});

export const error = (msg) => ({
    type: 'ERROR',
    msg
  });

export const login = ({UserName,FirstName,LastName,Age,PhoneNumber,PicturePath,Password,Email,ID,WinCount,LoseCount,Token} = {}) => ({
    type: 'LOGIN',
    UserName,
    FirstName,
    LastName,
    Age,
    PhoneNumber,
    PicturePath,
    Password,
    Email,
    ID,
    WinCount,
    LoseCount,
    Token

  });

//try fech user by user name and password
export const startLogin = (userName,password) => {
    return (dispatch) => {

      return Api.post("Login",{userName,password}).then((Response) => {

        const user = JSON.parse(Response.data.d);

        //if user contains data save oject state in redux store
        if(user != null) {
            dispatch(login(user));
        }
        else { //if user does not contain data show error messesge
          dispatch(error('Error email or password.'));
        }
      }).catch((error) => {
        console.log(error);
      })
  };
  };

  export const signIn = (Uu_id) => ({
    type:'SIGNIN',
    Uu_id
  })


  export const startSignIn = (userName,fName,lName,age,telephone,password,email) => {

    return (dispatch) => {

      return Api.post('Register',{userName,fName,lName,age,telephone,password,email}).then((Response) => {

        const Uu_id = JSON.parse(Response.data.d);

        if(Uu_id === "User Name or Email is already exists!"){
          dispatch(error(Uu_id));
        }else{
          dispatch(signIn(Uu_id));
        }
      }).catch((error) => {
        console.log(error);
      })
    };
  };

