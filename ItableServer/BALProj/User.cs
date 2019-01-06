namespace BALProj
{
    public class User
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public string Password { get; set; }
        public string PicturePath { get; set; }
        public string Email { get; set; }
        public int ID { get; set; }
        public int WinCount { get; set; }
        public int LoseCount { get; set; }
        public string Token { get; set; }


        public User()
        {

        }

        public User(string userName , string fName , string lName , int age , string telephone , string picture , string password, string email,int id, int winCount, int loseCount, string token = "notoken")
        {
            UserName = userName;
            FirstName = fName;
            LastName = lName;
            Age = age;
            PhoneNumber = telephone;
            PicturePath = "http://ruppinmobile.tempdomain.co.il/site02/ProfileUsersImages/"+ picture;
            Password = password;
            Email = email;
            ID = id;
            WinCount = winCount;
            LoseCount = loseCount;
            Token = token;
        }
    }
}
