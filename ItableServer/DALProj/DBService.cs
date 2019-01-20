
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;


namespace DALProj
{
    public class DBService
    {
        static readonly string ConStr = Globals.ConnectionString;
        static SqlConnection _con;
        static SqlCommand _com = new SqlCommand();
        static SqlDataReader _rdr;

        public static int Register(string userName, string fname, string lname, int age, string telephone, string password, string email)
        {


            _con = new SqlConnection(ConStr);

            var com = new SqlCommand("ValidateUserExists", _con) { CommandType = CommandType.StoredProcedure };

            com.Parameters.Add("@User_name", SqlDbType.NVarChar, 50).Value = userName;
            com.Parameters.Add("@Email", SqlDbType.VarChar, 50).Value = email;
            var outPutParameter = new SqlParameter();
            outPutParameter.ParameterName = "@isExists";
            outPutParameter.SqlDbType = SqlDbType.Int;
            outPutParameter.Direction = ParameterDirection.Output;
            com.Parameters.Add(outPutParameter);

            _con.Open();
            com.ExecuteNonQuery();
            var res = (int)outPutParameter.Value;


            if (res != 2) return 0;

            var uuId = 0;
            var result = 0;
            com = new SqlCommand("RegistrationProc", _con) { CommandType = CommandType.StoredProcedure };

            com.Parameters.Add("@User_name", SqlDbType.NVarChar, 50).Value = userName;
            com.Parameters.Add("@F_name", SqlDbType.NVarChar, 50).Value = fname;
            com.Parameters.Add("@L_name", SqlDbType.NVarChar, 50).Value = lname;
            com.Parameters.Add("@Age", SqlDbType.Int).Value = age;
            com.Parameters.Add("@Telephone", SqlDbType.VarChar, 50).Value = telephone;
            com.Parameters.Add("@Registraion_date", SqlDbType.NVarChar, 50).Value = DateTime.Now.ToShortDateString();
            com.Parameters.Add("@Password", SqlDbType.NVarChar, 50).Value = password;
            com.Parameters.Add("@Email", SqlDbType.VarChar, 50).Value = email;

            try
            {
                com.ExecuteNonQuery();
                result = 1;
            }
            catch (Exception e)
            {
                File.AppendAllText(Globals.LogFilePath + "\\ERRORlog.txt", "class:DBService , func:InsertUser " + "date: " + DateTime.Now.ToShortDateString() + " " + e.Message + "\n");
            }
            finally
            {

                if (result == 1)
                {
                    com.CommandType = CommandType.Text;
                    com.CommandText = "SELECT  TOP 1 * FROM Players ORDER BY Uu_id DESC";
                    _rdr = com.ExecuteReader();
                    if (_rdr.Read())
                    {
                        uuId = (int)_rdr["Uu_id"];
                    }
                }

                _con.Close();
            }
            return uuId;
        }

        public static int AddPlayerToGame(int gameId, int userId)
        {
            int res;
            using (_con = new SqlConnection(ConStr))
            {
                _con.Open();
                using (var com = new SqlCommand($"INSERT INTO [Player_game]([Game_id],[Uu_id]) VALUES({gameId},{userId}) ", _con))
                {
                    res = com.ExecuteNonQuery();
                }
            }
            return res;
        }

        public static DataTable GetUserByEmail(string email)
        {
            using (_con = new SqlConnection(ConStr))
            {
                _con.Open();
                using (var adtr = new SqlDataAdapter($"SELECT * FROM Players WHERE [Email]='{email}'", _con))
                {
                    var ds = new DataSet();
                    adtr.Fill(ds, "User");

                    return ds.Tables["User"].Rows.Count != 0 ? ds.Tables["User"] : null;
                }
            }
        }

        public static string CheckTableId(int tableId, int userId)
        {
            try
            {
                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand();
                _com.Parameters.Add("@TableId", SqlDbType.Int).Value = tableId;
                _com.Parameters.Add("@UserID", SqlDbType.Int).Value = userId;
                _com.Connection = _con;

                _com.CommandText = $"SELECT Table_id FROM [TableIds] WHERE Table_id=@TableId";
                var result = Convert.ToInt32(_com.ExecuteScalar());

                if (result != 0 )
                {
                    _com.CommandText = $"SELECT Uu_id FROM [TableIds] WHERE Table_id=@TableId";
                    var userIdResult = Convert.ToInt32(_com.ExecuteScalar());

                    if (userIdResult == 0)
                    {
                        _com.CommandText = $"UPDATE TableIds SET Uu_id=@UserID  WHERE Table_id=@TableId";
                        if(_com.ExecuteNonQuery() != 0 )
                        return "ok";

                        return null;
                    }else
                    {
                        _com.CommandText = $"SELECT COUNT(1) FROM [TableIds] WHERE Table_id=@TableId AND Uu_id=@UserID";
                        var validateParam = Convert.ToInt32(_com.ExecuteScalar());

                        if(validateParam != 0)
                        {
                            return "ok";
                        }

                        return null;
                    }
                }



            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            { 
                    _con.Close();
            }
            return null;
        }

        public static string UpdateGameData(int gameId, int p1g, int p2g, int p3g, int a1g, int a2g, int a3g, int b1g, int b2g, int b3g, int c1g, int c2g, int c3g)
        {
            try
            {
                var res = "";
                int chipWhight = 100;
                List<int> chipValues=new List<int>(3);
                List<string> chipColors = new List<string>(3);
                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand();
                _com.Connection = _con;

                _com.CommandText = $"SELECT * FROM [Chip_type] WHERE [Game_id]={gameId}";
                SqlDataReader rdr =_com.ExecuteReader();

                while(rdr.Read())
                {
                    chipValues.Add(Convert.ToInt32(rdr["Chip_value"]));
                    chipColors.Add(rdr["Chipe_color"].ToString());
                }

                var list = new List<KeyValuePair<string, int>>();
                list.Add(new KeyValuePair<string, int>("P1", p1g/chipWhight* chipValues[0]));
                list.Add(new KeyValuePair<string, int>("P2", p2g / chipWhight * chipValues[1]));
                list.Add(new KeyValuePair<string, int>("P3", p3g / chipWhight * chipValues[2]));
                list.Add(new KeyValuePair<string, int>("A1", a1g / chipWhight * chipValues[0]));
                list.Add(new KeyValuePair<string, int>("A2", a2g / chipWhight * chipValues[1]));
                list.Add(new KeyValuePair<string, int>("A3", a3g / chipWhight * chipValues[2]));
                list.Add(new KeyValuePair<string, int>("B1", b1g / chipWhight * chipValues[0]));
                list.Add(new KeyValuePair<string, int>("B2", b2g / chipWhight * chipValues[1]));
                list.Add(new KeyValuePair<string, int>("B3", b3g / chipWhight * chipValues[2]));
                list.Add(new KeyValuePair<string, int>("C1", c1g / chipWhight * chipValues[0]));
                list.Add(new KeyValuePair<string, int>("C2", c2g / chipWhight * chipValues[1]));
                list.Add(new KeyValuePair<string, int>("C3", c3g / chipWhight * chipValues[2]));

                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand();
                _com.Connection = _con;


                _com.CommandText = $"UPDATE Chips_for_game_per_player SET P1={list[0].Value},P2={list[1].Value},P3={list[2].Value},A1={list[3].Value},A2={list[4].Value},A3={list[5].Value}" +
                                   $",B1={list[6].Value},B2={list[7].Value},B3={list[8].Value},C1={list[9].Value},C2={list[10].Value},C3={list[11].Value} WHERE Game_id = {gameId}";
                res = _com.ExecuteNonQuery().ToString();



            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _con.Close();
            }
            return "ok";
           
        }

        public static string EndGame(int gameId, GameStatus endGameData)
        {

           
            try
            {
                var result = -1;
                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand();
                _com.Connection = _con;

                if (endGameData.PlayerId1 != 0)
                {
                    _com.CommandText = $"INSERT INTO [Player_game]([Game_id],[Rank],[Chip_amount],[Turn_time],[Uu_id]) VALUES({gameId},0,{endGameData.Player1Total},0,{endGameData.PlayerId1}) ";
                    result = _com.ExecuteNonQuery();
                }

                if (endGameData.PlayerId2 != 0)
                {
                    _com.CommandText = $"INSERT INTO [Player_game]([Game_id],[Rank],[Chip_amount],[Turn_time],[Uu_id]) VALUES({gameId},0,{endGameData.Player2Total},0,{endGameData.PlayerId2}) ";
                    result = _com.ExecuteNonQuery();
                }

                if (endGameData.PlayerId3 != 0)
                {
                    _com.CommandText = $"INSERT INTO [Player_game]([Game_id],[Rank],[Chip_amount],[Turn_time],[Uu_id]) VALUES({gameId},0,{endGameData.Player3Total},0,{endGameData.PlayerId3}) ";
                    result = _com.ExecuteNonQuery();
                }

                if (result == 1)
                {
                    return "ok";
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _con.Close();
            }

            return null;

        }

        public static DataTable GetGameData(int gameId)
        {
            //string res = "";
            //_con = new SqlConnection(ConStr);
            //_con.Open();
            //_com = new SqlCommand($"SELECT * FROM Chips_for_game_per_player WHERE Game_id={gameId}", _con);
            //SqlDataReader reader = _com.ExecuteReader();
            //while(reader.Read())
            //{
            //    res = reader[0].ToString();
            //}
            //_con.Close();

            //return res;

            _con = new SqlConnection(ConStr);
            var adtr =
                new SqlDataAdapter($"SELECT * FROM Chips_for_game_per_player WHERE Game_id={gameId}", _con);

            var ds = new DataSet();
            adtr.Fill(ds, "StartGame");

            return ds.Tables["StartGame"].Rows.Count != 0 ? ds.Tables["StartGame"] : null;


        }

        public static string ImgUpload(string base64ImgName, int userId)
        {
            _con = new SqlConnection(ConStr);
            _con.Open();
            _com = new SqlCommand($"UPDATE Players SET [PictureName] = '{base64ImgName}' WHERE [Uu_id]={userId}", _con);
            _com.ExecuteNonQuery();
            _con.Close();

            return "OK";
        }
        //try fetch user data from data base using sql parameters and stored procedure to avoid sql injection and for better performance =>
        //if object contains data return it else return null
        public static DataTable Login(string userName, string password)
        {
            _con = new SqlConnection(ConStr);
            var adtr =
                new SqlDataAdapter("LoginProc", _con) { SelectCommand = { CommandType = CommandType.StoredProcedure } };

            adtr.SelectCommand.Parameters.Add("@User_name", SqlDbType.NVarChar, 50).Value = userName;
            adtr.SelectCommand.Parameters.Add("@Password", SqlDbType.NVarChar, 50).Value = password;


            var ds = new DataSet();
            adtr.Fill(ds, "User");

            return ds.Tables["User"].Rows.Count != 0 ? ds.Tables["User"] : null;
        }

        public static void UpdateNotificationKey(string email, string token)
        {

            try
            {
                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand($"Update Players set Token = @token where Email = @email", _con);
                _com.Parameters.Add(new SqlParameter("@token", token));
                _com.Parameters.Add(new SqlParameter("@email", email));
                _com.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (_con != null && _con.State == ConnectionState.Open)
                    _con.Close();
            }
        }



        public static DataTable GetNotificationKeys(string email)
        {
            try
            {
                _con.Open();
                _com = new SqlCommand($"Select Token from Players where Email = @email", _con);
                _com.Parameters.Add(new SqlParameter("@email", email));
                SqlDataAdapter adtr = new SqlDataAdapter(_com);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"].Columns.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (_con != null && _con.State == ConnectionState.Open)
                    _con.Close();
            }
            return null;
        }


        public static int CreateNewGame(int playersCount, int gameType, int chipCount, IEnumerable<string> chipTypes, IEnumerable<int> chipValues, int bigBlind, int smallBlind, int blindTime, int userId)
        {
            var gameId = -1;
            _con = new SqlConnection(ConStr);
            _con.Open();
            _com = new SqlCommand($"INSERT INTO Games(Game_date,Start_time,End_time,Game_winner,Players_count,Game_type,Chip_count,Big_blind,Small_blind,Blind_time,State_code,Status_code,Uu_id) VALUES(@GameDate,@StartTime,@EndTime,@GameWinner,@playersCount,@gameType,@chipCount,@bigBlind,@smallBlind,@blindTime,@StateCode,@StatusCode,@UserID); SELECT SCOPE_IDENTITY()", _con);

            _com.Parameters.Add("@GameDate", SqlDbType.VarChar, 50).Value = DateTime.Now.ToShortDateString();
            _com.Parameters.Add("@StartTime", SqlDbType.VarChar, 50).Value = DateTime.Now.ToShortTimeString();
            _com.Parameters.Add("@EndTime", SqlDbType.VarChar, 50).Value = "";
            _com.Parameters.Add("@GameWinner", SqlDbType.NVarChar, 50).Value = "";
            _com.Parameters.Add("@playersCount", SqlDbType.Int).Value = playersCount;
            _com.Parameters.Add("@gameType", SqlDbType.Int).Value = gameType;
            _com.Parameters.Add("@chipCount", SqlDbType.Int).Value = chipCount;
            _com.Parameters.Add("@bigBlind", SqlDbType.Int).Value = bigBlind;
            _com.Parameters.Add("@smallBlind", SqlDbType.Int).Value = smallBlind;
            _com.Parameters.Add("@blindTime", SqlDbType.Int).Value = blindTime;
            _com.Parameters.Add("@StateCode", SqlDbType.Bit).Value = 1;
            _com.Parameters.Add("@StatusCode", SqlDbType.Int).Value = 1;
            _com.Parameters.Add("@UserID", SqlDbType.Int).Value = userId;

            try
            {
                gameId = Convert.ToInt32(_com.ExecuteScalar());

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

            }
            finally
            {
                _con.Close();
            }

            AddChipsForPlayer(gameId, userId,true);
            UpdateChipState(chipTypes, chipValues, gameId);

            return gameId;
        }

        public static string AddChipsForPlayer(int gameId, int userID,bool isFirst = false)
        {
            string userName="";
            string userPic="";

            try
            {
                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand();
                _com.Connection = _con;

                _com.CommandText = $"SELECT * FROM Players WHERE Uu_id = {userID}";
                _rdr = _com.ExecuteReader();
                if (_rdr.Read())
                {
                    userName = _rdr["User_name"].ToString();
                    userPic = _rdr["PictureName"].ToString();
                }

                _con.Close();

                _con = new SqlConnection(ConStr);
                _con.Open();
                _com = new SqlCommand();
                _com.Parameters.Add("@GameID", SqlDbType.Int).Value = gameId;
                _com.Parameters.Add("@UserID", SqlDbType.Int).Value = userID;
                _com.Connection = _con;

               

                if (isFirst)
                {
                    _com.CommandText = $"INSERT INTO Chips_for_game_per_player(Game_id,Pot_count,P1,P2,P3,Player_id1,A1,A2,A3,Player_id2,B1,B2,B3,Player_id3,C1,C2,C3,Player1Name,Player2Name,Player3Name,Player1Pic,Player2Pic,Player3Pic) VALUES(@GameID,0,0,0,0,@UserID,0,0,0,0,0,0,0,0,0,0,0,'{userName}',' ',' ','{userPic}',' ',' ')";
                    var result = _com.ExecuteNonQuery();
                    return result == 1 ? "ok" : null;
                }
                else
                {
                    _com.CommandText = $"SELECT Player_id3 FROM Chips_for_game_per_player WHERE Game_id = @GameID";
                    var playerId3Res = Convert.ToInt32(_com.ExecuteScalar());
                    if (playerId3Res != 0)
                        return null;

                    _com.CommandText = $"SELECT Player_id2 FROM Chips_for_game_per_player WHERE Game_id = @GameID";
                    var playerId2Res = Convert.ToInt32(_com.ExecuteScalar());
                    if (playerId2Res == 0)
                    {
                        _com.CommandText = $"UPDATE  Chips_for_game_per_player SET Player_id2=@UserID,Player2Name='{userName}',Player2Pic='{userPic}' WHERE Game_id = @GameID";
                        var result = _com.ExecuteNonQuery();
                        return result == 1 ? "ok" : null;
                    }
                    else
                    {
                        _com.CommandText = $"UPDATE  Chips_for_game_per_player SET Player_id3=@UserID,Player3Name='{userName}',Player3Pic='{userPic}' WHERE Game_id = @GameID";
                        var result = _com.ExecuteNonQuery();
                        return result == 1 ? "ok" : null;
                    }
                }
   
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

            }
            finally
            {
                _con.Close();
            }

            return "ok";

        }

        private static void UpdateChipState(IEnumerable<string> chipTypes, IEnumerable<int> chipValues, int gameId)
        {
            var chipTypesArry = chipTypes.ToArray();
            var chipValuesArry = chipValues.ToArray();
            for (int i = 0; i < chipTypesArry.Length; i++)
            {
                using (_con = new SqlConnection(ConStr))
                {
                    _con.Open();
                    using (var com = new SqlCommand($"INSERT INTO [Chip_type]([Chip_value],[Chipe_color],[Game_id]) VALUES({chipValuesArry[i]},'{chipTypesArry[i]}',{gameId}) ", _con))
                    {
                        com.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
