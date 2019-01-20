using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DALProj
{
    public class GameStatus
    {

        public int PotCount { get; set; }
        public int PotTotal { get; set; }
        public int PlayerId1 { get; set; }
        public int Player1Total { get; set; }
        public string Player1Name { get; set; }
        public string Player1Pic { get; set; }
        public int PlayerId2 { get; set; }
        public int Player2Total { get; set; }
        public string Player2Name { get; set; }
        public string Player2Pic { get; set; }
        public int PlayerId3 { get; set; }
        public int Player3Total { get; set; }
        public string Player3Name { get; set; }
        public string Player3Pic { get; set; }


        public static GameStatus ToGameStats(int potCount, int p1, int p2, int p3, int playerId1, int a1, int a2, int a3, int playerId2, int b1, int b2, int b3, int playerId3, int c1, int c2, int c3, string player1Name, string player2Name, string player3Name, string player1Pic, string player2Pic, string player3Pic)
        {
            return new GameStatus
            {
                PotCount = potCount,
                PotTotal = p1 + p2 + p3,
                PlayerId1 = playerId1,
                Player1Total = a1 + a2 + a3,
                PlayerId2 = playerId2,
                Player2Total = b1 + b2 + b3,
                PlayerId3 = playerId3,
                Player3Total = c1 + c2 + c3,
                Player1Name = player1Name,
                Player2Name = player2Name,
                Player3Name = player3Name,
                Player1Pic = player1Pic,
                Player2Pic = player2Pic,
                Player3Pic = player3Pic


        };
        }
    }
}
