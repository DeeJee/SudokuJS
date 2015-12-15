using SudokuData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] regels = new string[28];
            regels[0] = "0|'0 - (0,0) == 4'";
            regels[1] = "1|'0 - (0,1) == 8'";
            regels[2] = "2|'0 - (0,2) heeft mogelijkheden 1 2 '";
            regels[3] = "3|'0 - (0,2) probeer 1'";
            regels[4] = "4|'1 - (0,0) == 4'";
            regels[5] = "5|'1 - (0,1) == 8'";
            regels[6] = "7|'1 - (0,3) heeft mogelijkheden 7 '";
            regels[7] = "6|'1 - (0,2) == 1'";
            regels[8] = "8|'1 - (0,3) probeer 7'";
            regels[9] = "11|'2 - (0,2) == 1'";
            regels[10] = "9|'2 - (0,0) == 4'";
            regels[11] = "12|'2 - (0,3) == 7'";
            regels[12] = "13|'2 - (0,4) == 3'";
            regels[13] = "10|'2 - (0,1) == 8'";
            regels[14] = "14|'2 - (0,5) == 6'";
            regels[15] = "15|'2 - (0,6) heeft mogelijkheden '";
            regels[16] = "18|'1 - (0,4) == 3'";
            regels[17] = "19|'1 - (0,5) == 6'";
            regels[18] = "16|'2 - Geen mogelijkheden voor cel 0-6'";
            regels[19] = "17|'1 - Terugkomst uit solveRecursively'";
            regels[20] = "21|'1 - Geen mogelijkheden voor cel 0-6'";
            regels[21] = "22|'0 - Terugkomst uit solveRecursively'";
            regels[22] = "24|'1 - (0,0) == 4'";
            regels[23] = "23|'0 - (0,2) probeer 2'";
            regels[24] = "20|'1 - (0,6) heeft mogelijkheden '";
            regels[25] = "25|'1 - (0,1) == 8'";
            regels[26] = "26|'1 - (0,2) == 2'";
            regels[27] = "30|'2 - (0,1) == 8'";


            Chronologger logger = new Chronologger();
            foreach (var regel in regels)
            {
                logger.Log(regel);
            }
        }
    }
}
