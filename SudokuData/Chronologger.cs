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
            try
            {
                lock (waarden)
                {                    
                    string[] velden = text.Split('|');
                    int index = Int32.Parse(velden[0]);
                    waarden.Add(index, velden[1]);
                                        SchrijfIndienMogelijk();
                }
            }
            catch(ArgumentException ex)
            {
                Logger.Info(ex.Message);
                foreach(var aap in ex.Data)
                {

                    Logger.Info("data: {0}",aap);
                }
                
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
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