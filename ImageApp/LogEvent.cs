using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageApp
{
    public class LogEvent
    {
        private string log;
        /// <summary>
        /// Get and Set functions for Log field.
        /// </summary>
        public string Log { get { return log; } set { log = value; } }
        private string message;
        /// <summary>
        /// Get and Set functions for message field.
        /// </summary>
        public string Message { get { return message; } set { Message = value; } }
        private string colur;
        /// <summary>
        /// Get and Set functions for colour field.
        /// </summary>
        public string Colur { get { return colur; } }
        /// <summary>
        /// Constractor for log event object.
        /// </summary>
        /// <param name="log"> The type of the message .</param>
        /// <param name="massage"> The message .</param>
        /// <param name="colour1"> The colour of the field. </param>
        public LogEvent(string log, string massage, string colour1)
        {
            this.log = log;
            this.message = massage;
            this.colur = colour1;
        }
    }
}
