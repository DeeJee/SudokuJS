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
    public class LogController : ApiController
    {
        Logger Log = LogManager.GetLogger("javascript");
        public JToken Get(string id = null)
        {
            Log.Info(id);
            return new JObject();
        }

        [HttpPost]
        public void Post(string id, JToken eventData)
        {
            Log.Info("Post({0})", id);
        }
    }
}
