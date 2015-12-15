using Newtonsoft.Json.Linq;
using NLog;
using System;
using System.Web.Http;

namespace SudokuData.Controllers
{
    public class LogController : ApiController
    {
        Logger internalLogger = LogManager.GetCurrentClassLogger();
        private static readonly Chronologger logger = new Chronologger();
        public JToken Get(string id = null)
        {
            logger.Log(id);
            return new JObject();
        }

        [HttpPost]
        public void Post(string id, JToken eventData)
        {
            try {

                logger.Log(id);
            }
            catch(Exception ex)
            {
                internalLogger.Info(ex.Message);
            }
        }
    }
}
