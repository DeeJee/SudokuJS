using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace SudokuData.Controllers
{
    public class PuzzleController : ApiController
    {
        Logger Log = LogManager.GetCurrentClassLogger();
        public JToken Get(string id = null)
        {
            Log.Info("Get({0})", id);
            var path = HostingEnvironment.MapPath("/");
            string filename = path + @"puzzles\" + id + ".json";
            //return JObject.Parse(File.ReadAllText(@"D:\Projecten\SudokuJs\SudokuData\puzzles\1.json"));            
            return JObject.Parse(File.ReadAllText(filename));
        }

        [HttpPost]
        public void Post(string id, JToken eventData)
        {
            Log.Info("Post({0})", id);
            var path = HostingEnvironment.MapPath("/");
            var file = path + @"puzzles\" + id + ".json";
            Log.Info("Saving file : {0}", file);
            File.WriteAllText(file, eventData.ToString(Formatting.None));
        }
    }
}
