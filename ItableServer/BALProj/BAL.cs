using DALProj;
using System.Net;
using System.Web.Script.Serialization;

namespace BALProj
{
    public class BAL
    {
        public static string Register(string userName, string fname, string lname, int age, string telephone, string password, string email)
        {
            var res = DBService.Register(userName, fname, lname, age, telephone, password, email);

            return res != 0 ? res.ToString() : "User Name or Email is already exists!";
        }

        public static User Login(string userName, string password)
        {
            var u = DBService.Login(userName, password);
            if (u == null) return null;
            //insterd default values to vars
            var user = new User(u.Rows[0]["User_name"].ToString(), u.Rows[0]["F_name"].ToString(), u.Rows[0]["L_name"].ToString(),
                                (int)u.Rows[0]["Age"], u.Rows[0]["Telephone"].ToString(), u.Rows[0]["PictureName"].ToString(),
                                u.Rows[0]["Password"].ToString(), u.Rows[0]["Email"].ToString(), (int)u.Rows[0]["Uu_id"],
                                (int)u.Rows[0]["Win_count"], (int)u.Rows[0]["Lose_count"], u.Rows[0]["Token"].ToString());

            return user;
        }

        public static User GetUserByEmail(string email)
        {
            var u = DBService.GetUserByEmail(email);
            if (u == null) return null;
            //insterd default values to vars
            var user = new User(u.Rows[0]["User_name"].ToString(), u.Rows[0]["F_name"].ToString(), u.Rows[0]["L_name"].ToString(),
                                (int)u.Rows[0]["Age"], u.Rows[0]["Telephone"].ToString(), u.Rows[0]["PictureName"].ToString(),
                                u.Rows[0]["Password"].ToString(), u.Rows[0]["Email"].ToString(), (int)u.Rows[0]["Uu_id"],
                                (int)u.Rows[0]["Win_count"], (int)u.Rows[0]["Lose_count"], u.Rows[0]["Token"].ToString());

            return user;

        }

        public static void InitLogFilePath(string v)
        {
            Globals.LogFilePath = v;
        }

        public static string ImgUpload(string base64ImgName, int userId)
        {
            var res = DBService.ImgUpload(base64ImgName, userId);

            return "OK";
        }


        public static void AddNotification(string email, string token)
        {
            DBService.UpdateNotificationKey(email, token);
        }

        public static void SendInvitation(string token, string title, string body, int gameId)
        {
            var objectToSend = new
            {
                to = token,
                title = title,
                body = body,
                badge = 3,
                data = new { gameID = gameId }
            };

            var postData = new JavaScriptSerializer().Serialize(objectToSend);

            using (var client = new WebClient())
            {
                client.Headers.Add("accept", "application/json");
                client.Headers.Add("accept-encoding", "gzip, deflate");
                client.Headers.Add("Content-Type", "application/json");
                client.UploadString("https://exp.host/--/api/v2/push/send", postData);
            }

        }

        public static string CreateNewGame(int playersCount, int gameType, int chipCount, int bigBlind, int smallBlind, int blindTime, int userId)
        {
            int res = DBService.CreateNewGame(playersCount, gameType, chipCount, bigBlind, smallBlind, blindTime, userId);
            return new JavaScriptSerializer().Serialize(res);
        }


    }
}
