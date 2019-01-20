using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BALProj
{
   public class StartGame
    {

        public int GameId { get; set; }
        public int PotCount { get; set; }
        public int P1 { get; set; }
        public int P2 { get; set; }
        public int P3 { get; set; }
        public int PlayerId1 { get; set; }
        public int A1 { get; set; }
        public int A2 { get; set; }
        public int A3 { get; set; }
        public int PlayerId2 { get; set; }
        public int B1 { get; set; }
        public int B2 { get; set; }
        public int B3 { get; set; }
        public int PlayerId3 { get; set; }
        public int C1 { get; set; }
        public int C2 { get; set; }
        public int C3 { get; set; }
        public string Player1Name { get; set; }
        public string Player2Name { get; set; }
        public string Player3Name { get; set; }
        public string Player1Pic { get; set; }
        public string Player2Pic { get; set; }
        public string Player3Pic { get; set; }



        public StartGame()
        {

        }

        public StartGame(int gameId, int potCount, int p1, int p2, int p3, int playerId1, int a1, int a2, int a3, int playerId2, int b1, int b2, int b3, int playerId3, int c1, int c2, int c3,string player1Name, string player2Name, string player3Name, string player1Pic, string player2Pic, string player3Pic)
        {
            GameId = gameId;
            PotCount = potCount;
            P1 = p1;
            P2 = p2;
            P3 = p3;
            PlayerId1 = playerId1;
            A1 = a1;
            A2 = a2;
            A3 = a3;
            PlayerId2 = playerId2;
            B1 = b1;
            B2 = b2;
            B3 = b3;
            PlayerId3 = playerId3;
            C1 = c1;
            C2 = c2;
            C3 = c3;
            Player1Name = player1Name;
            Player2Name = player2Name;
            Player3Name = player3Name;
            Player1Pic = "http://ruppinmobile.tempdomain.co.il/site02/ProfileUsersImages/"+ player1Pic;
            Player2Pic = "http://ruppinmobile.tempdomain.co.il/site02/ProfileUsersImages/"+ player2Pic;
            Player3Pic = "http://ruppinmobile.tempdomain.co.il/site02/ProfileUsersImages/"+ player3Pic;

        }
    }
}
