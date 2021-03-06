﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

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

            int res2;
            using (_con = new SqlConnection(ConStr))

            using (_con = new SqlConnection(ConStr))

            {
                _con.Open();
                using (var com = new SqlCommand($"INSERT INTO [Player_game]([Game_id],[Uu_id]) VALUES({gameId},{userId}) ", _con))
                {
                    res = com.ExecuteNonQuery();
                }

                using (SqlCommand com = new SqlCommand($"INSERT INTO [Chips_for_game_per_player] ([Game_id],[Pot_count],[P1],[P2],[P3],[Player_id1],[A1],[A2],[A3],[Player_id2],[B1],[B2],[B3],[Player_id3],[C1],[C2],[C3],[Total_chips]) VALUES({gameId},0,0,0,0,{userId},1,1,1,0,0,0,0,0,0,0,0,0) ", _con))
                {
                    res2 = com.ExecuteNonQuery();
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

        public static int CreateNewGame(int playersCount, int gameType, int chipCount, List<int> chipType, List<int> chipValues, int bigBlind, int smallBlind, int blindTime, int userId)
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

            UpdateChipState(chipType, chipValues, gameId);

            return gameId;
        }

        private static void UpdateChipState(IReadOnlyList<int> chipType, IReadOnlyList<int> chipValues, int gameId)
        {
            for (int i = 0; i < chipValues.Count; i++)
            {
                using (_con = new SqlConnection(ConStr))
                {
                    _con.Open();
                    using (var com = new SqlCommand($"INSERT INTO [Chip_type]([Chip_value], [Chipe_color],[Game_id]) VALUES({chipType[i]},{chipValues[i]},{gameId}) ", _con))
                    {
                        com.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
