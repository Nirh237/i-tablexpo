using DALProj;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace BALProj
{
   public  class BAL
    {
        static public string Register(string UserName, string Fname, string Lname, int Age, string Telephone, string Password, string email)
        {
            int res = DBService.Register(UserName, Fname, Lname, Age, Telephone, Password, email);
            if (res != 0)
            {
                return res.ToString();
            }
            else
            {
                return "User Name or Email is already exists!";
            }

        }

        static public User Login(string UserName, string Password)
        {
            var u =  DBService.Login(UserName, Password);
            if (u != null)
            {
                //insterd default values to vars
                User user = new User(u.Rows[0]["User_name"].ToString(), u.Rows[0]["F_name"].ToString(), u.Rows[0]["L_name"].ToString(), (int)u.Rows[0]["Age"], u.Rows[0]["Telephone"].ToString(), u.Rows[0]["PictureName"].ToString(), u.Rows[0]["Password"].ToString(), u.Rows[0]["Email"].ToString(), (int)u.Rows[0]["Uu_id"], (int)u.Rows[0]["Win_count"], (int)u.Rows[0]["Lose_count"], u.Rows[0]["Token"].ToString());
                return user;
            }else
            {
                return null;
            }
        }

        public static User GetUserByEmail(string email)
        {
            var u = DBService.GetUserByEmail(email);
            if (u != null)
            {
                //insterd default values to vars
                User user = new User(u.Rows[0]["User_name"].ToString(), u.Rows[0]["F_name"].ToString(), u.Rows[0]["L_name"].ToString(), (int)u.Rows[0]["Age"], u.Rows[0]["Telephone"].ToString(), u.Rows[0]["PictureName"].ToString(), u.Rows[0]["Password"].ToString(), u.Rows[0]["Email"].ToString(), (int)u.Rows[0]["Uu_id"], (int)u.Rows[0]["Win_count"], (int)u.Rows[0]["Lose_count"], u.Rows[0]["Token"].ToString());
                return user;
            }
            else
            {
                return null;
            }
        }

        public static void InitLogFilePath(string v)
        {
            Globals.LogFilePath = v;
        }

        public static string ImgUpload(string base64imgName, int userID)
        {
            string res=DBService.ImgUpload(base64imgName, userID);
            return "OK";

        }


        public static void AddNotification(string email, string Token)
        {
            DBService.UpdateNotificationKey(email, Token);
        }

        public static void SendInvitation(string token, string title, string body,int gameID)
        {
            var objectToSend = new
            {
                to = token,
                title = title,
                body = body,
                badge = 3,
                data = new { gameID }
            };

            string postData = new JavaScriptSerializer().Serialize(objectToSend);


            using (var client = new WebClient())
            {

                client.Headers.Add("accept", "application/json");
                client.Headers.Add("accept-encoding", "gzip, deflate");
                client.Headers.Add("Content-Type", "application/json");
                var response = client.UploadString("https://exp.host/--/api/v2/push/send", postData);
                
            }

        }

      
    }
}
