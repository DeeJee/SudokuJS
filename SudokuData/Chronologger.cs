using NLog;
using System;
using System.Collections.Generic;
using System.Timers;

namespace SudokuData
{
    public class Chronologger
    {
        int key = 0;
        Dictionary<int, string> waarden = new Dictionary<int, string>();
        Logger Logger = LogManager.GetLogger("javascript");

        public void Log(string text)
        {
            lock (waarden)
            {
                string[] velden = text.Split('|');
                int index = Int32.Parse(velden[0]);
                waarden.Add(index, velden[1]);

                SchrijfIndienMogelijk();
            }
        }

        private void SchrijfIndienMogelijk()
        {
            string value = null;
            while (waarden.TryGetValue(key, out value))
            {
                Logger.Info("{0}:{1}", key, value);
                key++;
            }
        }
    }
}