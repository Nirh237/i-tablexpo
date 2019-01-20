using DALProj;
using System;
using System.Collections.Generic;
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

        public static string CreateNewGame(int playersCount, int gameType, int chipCount, IEnumerable<string> chipTypes, IEnumerable<int> chipValues, int bigBlind, int smallBlind, int blindTime, int userId)
        {
            int res = DBService.CreateNewGame(playersCount, gameType, chipCount, chipTypes, chipValues, bigBlind, smallBlind, blindTime, userId);
            return new JavaScriptSerializer().Serialize(res);
        }

        public static string AddPlayerToGame(int gameId, int userId)
        {
            string res = DBService.AddChipsForPlayer(gameId, userId);

            return res;

        }

        public static string CheckTableId(int tableId, int userId)
        {
            string res = DBService.CheckTableId(tableId, userId);

            return res;
        }

        public static GameStatus GetGameData(int gameId)
        {
            var u = DBService.GetGameData(gameId);
            if (u == null) return null;
            //insterd default values to vars
            var startGame = new StartGame((int)u.Rows[0]["Game_id"], (int)u.Rows[0]["Pot_count"], (int)u.Rows[0]["P1"],
                                (int)u.Rows[0]["P2"], (int)u.Rows[0]["P3"], (int)u.Rows[0]["Player_id1"],
                               (int)u.Rows[0]["A1"], (int)u.Rows[0]["A2"], (int)u.Rows[0]["A3"],
                                (int)u.Rows[0]["Player_id2"],
                               (int)u.Rows[0]["B1"], (int)u.Rows[0]["B2"], (int)u.Rows[0]["B3"],
                               (int)u.Rows[0]["Player_id3"],
                               (int)u.Rows[0]["C1"], (int)u.Rows[0]["C2"], (int)u.Rows[0]["C3"],u.Rows[0]["Player1Name"].ToString(),
                               u.Rows[0]["Player2Name"].ToString(), u.Rows[0]["Player3Name"].ToString(), u.Rows[0]["Player1Pic"].ToString(),
                               u.Rows[0]["Player2Pic"].ToString(), u.Rows[0]["Player3Pic"].ToString());

            var gameStats = GameStatus.ToGameStats(startGame.PotCount, startGame.P1, startGame.P2, startGame.P3,
                                                  startGame.PlayerId1, startGame.A1, startGame.A2, startGame.A3,
                                                  startGame.PlayerId2, startGame.B1, startGame.B2, startGame.B3,
                                                  startGame.PlayerId3, startGame.C1, startGame.C2, startGame.C3,
                                                  startGame.Player1Name,startGame.Player2Name,startGame.Player3Name,
                                                  startGame.Player1Pic,startGame.Player2Pic,startGame.Player3Pic);

            return gameStats;
        }

        public static string EndGame(int gameId, GameStatus endGameData)
        {
            
            string res = DBService.EndGame(gameId, endGameData);

            return res;
        }

        public static object UpdateGameData(int gameId, int p1g, int p2g, int p3g, int a1g, int a2g, int a3g, int b1g, int b2g, int b3g, int c1g, int c2g, int c3g)
        {
            var res = DBService.UpdateGameData(gameId, p1g, p2g, p3g, a1g, a2g, a3g, b1g, b2g, b3g, c1g, c2g, c3g);

            return res;
        }
    }
}
