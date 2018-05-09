using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ImageApp
{
    class ApplicationClient
    {
        private NetworkStream ns;

        public ApplicationClient()
        {
            CreateClient();
        }

        public void CreateClient() {

                try
                {
                    IPAddress ipAddress = IPAddress.Parse("127.0.0.1");
                    IPEndPoint ipLocalEndPoint = new IPEndPoint(ipAddress, 8888);
                    TcpClient client = new TcpClient();
                    client.Connect("127.0.0.1", 8888);

                    NetworkStream ns = client.GetStream();

                   /* byte[] bytes = new byte[4096];
                    int bytesRead = ns.Read(bytes, 0, bytes.Length);

                    string c = Encoding.ASCII.GetString(bytes, 0, bytesRead);
                    read_text(c);*/

                    this.ns = ns;

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }
            
        }

        public string ReadClient()
        {
            byte[] bytes = new byte[4096];
            int bytesRead = ns.Read(bytes, 0, bytes.Length);

            return Encoding.ASCII.GetString(bytes, 0, bytesRead);
        }

        public void WriteClient(string write)
        {
            byte[] byteTime = Encoding.ASCII.GetBytes(write);
            ns.Write(byteTime, 0, byteTime.Length);
        }
    }
}
