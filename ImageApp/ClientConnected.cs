using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageApp
{

    class ClientConnected
    {
        private static ClientConnected c;
        private static int connect = 0;
        private ClientConnected()
        {
            
        }
        public int getConnect() { return connect; }
        public static ClientConnected GetInstance
        {
            get
            {
                if (c == null)
                {
                    connect = 0;
                    c = new ClientConnected();
                    connect++;
                }
                connect++;
                return c;
            }
        }
    }
}
