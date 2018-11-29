using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALProj
{
    public class DBService
    {
        static string conStr = Globals.connectionString;
        static SqlConnection con;
        static SqlCommand com = new SqlCommand();
        static SqlDataReader rdr;

        static public int Register(string UserName, string Fname, string Lname, int Age, string Telephone, string Password, string email)
        {


            con = new SqlConnection(conStr);

            SqlCommand com = new SqlCommand("ValidateUserExists", con);
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.Add("@User_name", SqlDbType.NVarChar, 50).Value = UserName;
            com.Parameters.Add("@Email", SqlDbType.VarChar, 50).Value = email;
            SqlParameter outPutParameter = new SqlParameter();
            outPutParameter.ParameterName = "@isExists";
            outPutParameter.SqlDbType = System.Data.SqlDbType.Int;
            outPutParameter.Direction = System.Data.ParameterDirection.Output;
            com.Parameters.Add(outPutParameter);

            con.Open();
            com.ExecuteNonQuery();
            int res = (int)outPutParameter.Value;
            


            if (res == 2)
            {

                int result = 0;
                int Uu_id = 0;
                com = new SqlCommand("RegistrationProc",con);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.Add("@User_name", SqlDbType.NVarChar, 50).Value = UserName;
                com.Parameters.Add("@F_name", SqlDbType.NVarChar, 50).Value = Fname;
                com.Parameters.Add("@L_name", SqlDbType.NVarChar, 50).Value = Lname;
                com.Parameters.Add("@Age", SqlDbType.Int).Value = Age;
                com.Parameters.Add("@Telephone", SqlDbType.VarChar, 50).Value = Telephone;
                com.Parameters.Add("@Registraion_date", SqlDbType.NVarChar, 50).Value = DateTime.Now.ToShortDateString();
                com.Parameters.Add("@Password", SqlDbType.NVarChar, 50).Value = Password;
                com.Parameters.Add("@Email", SqlDbType.VarChar, 50).Value = email;


               // testc;



                try
                {
                   
                    com.ExecuteNonQuery();
                    result = 1;
                }
                catch (Exception e)
                {
                    File.AppendAllText(Globals.LogFilePath + "\\ERRORlog.txt", "class:DBService , func:InsertUser " + "date: " + DateTime.Now.ToShortDateString() + " " + e.Message +"\n");
                }
                finally
                {

                    if (result == 1)
                    {
                        com.CommandType = CommandType.Text;
                        com.CommandText = "SELECT  TOP 1 * FROM Players ORDER BY Uu_id DESC";
                        rdr = com.ExecuteReader();
                        if (rdr.Read())
                        {
                            Uu_id = (int)rdr["Uu_id"];

                        }
                    }

                    con.Close();


                }
                return Uu_id;
            }
            else
            {
                return 0;
            }
        }

        public static int AddPlayerToGame(int gameID, int userId)
        {
            int res;
            using (con = new SqlConnection(conStr))
            {
                con.Open();
                using (SqlCommand com = new SqlCommand($"INSERT INTO [Player_game]([Game_id],[Uu_id]) VALUES({gameID},{userId}) ", con))
                {
                  res = com.ExecuteNonQuery();
                }
            }
            return res;
        }

        public static DataTable GetUserByEmail(string email)
        {
            using (con = new SqlConnection(conStr))
            {
                con.Open();
                using (SqlDataAdapter adtr = new SqlDataAdapter($"SELECT * FROM Players WHERE [Email]='{email}'", con))
                {
                    DataSet ds = new DataSet();
                    adtr.Fill(ds, "User");

                    if (ds.Tables["User"].Rows.Count != 0)
                    {
                        return ds.Tables["User"];
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        public static string ImgUpload(string base64imgName, int userID)
        {
           
            con = new SqlConnection(conStr);
            con.Open();
            com = new SqlCommand($"UPDATE Players SET [PictureName] = '{base64imgName}' WHERE [Uu_id]={userID}", con);
            com.ExecuteNonQuery();
            con.Close();

            return "OK";
        }

        static public DataTable Login(string UserName, string Password)
        {
            con = new SqlConnection(conStr);
            SqlDataAdapter adtr = new SqlDataAdapter("LoginProc", con);
            adtr.SelectCommand.CommandType = CommandType.StoredProcedure;

            adtr.SelectCommand.Parameters.Add("@User_name", SqlDbType.NVarChar, 50).Value = UserName;
            adtr.SelectCommand.Parameters.Add("@Password", SqlDbType.NVarChar, 50).Value = Password;


            DataSet ds = new DataSet();
            adtr.Fill(ds, "User");

            if (ds.Tables["User"].Rows.Count != 0)
            {
                return ds.Tables["User"];
            }else
            {
                return null;
            }


        }

        public static void UpdateNotificationKey(string email, string Token)
        {

            try
            {
                con = new SqlConnection(conStr);
                con.Open();
                com = new SqlCommand($"Update Players set Token = @token where Email = @email",con);
                com.Parameters.Add(new SqlParameter("@token", Token));
                com.Parameters.Add(new SqlParameter("@email", email));
                com.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        }

        public static DataTable GetNotificationKeys(string email)
        {
            try
            {
                con.Open();
               com = new SqlCommand($"Select Token from Players where Email = @email", con);
                com.Parameters.Add(new SqlParameter("@email", email));
                SqlDataAdapter adtr = new SqlDataAdapter(com);

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
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }

            return null;

        }

        public static int CreateNewGame(int playersCount,int gameType,int chipCount,List<int> chipType, List<int> chipValues, int bigBlind,int smallBlind,int blindTime,int userID)
        {
            int gameID = -1;
            con = new SqlConnection(conStr);
            con.Open();
            com = new SqlCommand($"INSERT INTO Games(Game_date,Start_time,End_time,Game_winner,Players_count,Game_type,Chip_count,Big_blind,Small_blind,Blind_time,State_code,Status_code,Uu_id) VALUES(@GameDate,@StartTime,@EndTime,@GameWinner,@playersCount,@gameType,@chipCount,@bigBlind,@smallBlind,@blindTime,@StateCode,@StatusCode,@UserID); SELECT SCOPE_IDENTITY()", con);

            com.Parameters.Add("@GameDate", SqlDbType.VarChar, 50).Value = DateTime.Now.ToShortDateString();
            com.Parameters.Add("@StartTime", SqlDbType.VarChar, 50).Value = DateTime.Now.ToShortTimeString();
            com.Parameters.Add("@EndTime", SqlDbType.VarChar,50).Value = "";
            com.Parameters.Add("@GameWinner", SqlDbType.NVarChar,50).Value = "";
            com.Parameters.Add("@playersCount", SqlDbType.Int).Value = playersCount;
            com.Parameters.Add("@gameType", SqlDbType.Int).Value = gameType;
            com.Parameters.Add("@chipCount", SqlDbType.Int).Value = chipCount;
            //com.Parameters.Add("@chipType", SqlDbType.Int).Value = chipType;
            //com.Parameters.Add("@chipValues", SqlDbType.Int).Value = chipValues;
            com.Parameters.Add("@bigBlind", SqlDbType.Int).Value = bigBlind;
            com.Parameters.Add("@smallBlind", SqlDbType.Int).Value = smallBlind;
            com.Parameters.Add("@blindTime", SqlDbType.Int).Value = blindTime;
            com.Parameters.Add("@StateCode", SqlDbType.Bit).Value = 1;
            com.Parameters.Add("@StatusCode", SqlDbType.Int).Value = 1;
            com.Parameters.Add("@UserID", SqlDbType.Int).Value = userID;
            try
            {
                 gameID = Convert.ToInt32(com.ExecuteScalar());
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                
            }finally
            {
                con.Close(); 
            }

            UpdateChipState(chipType, chipValues,gameID);

            return gameID;
        }

        private static void UpdateChipState(List<int> chipType, List<int> chipValues,int gameID)
        {
            for (int i = 0; i < chipValues.Count; i++)
            {
                using (con = new SqlConnection(conStr))
                {
                    con.Open();
                    using (SqlCommand com = new SqlCommand($"INSERT INTO [Chip_type]([Chip_value], [Chipe_color],[Game_id]) VALUES({chipType[i]},{chipValues[i]},{gameID}) ", con))
                    {
                        com.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
