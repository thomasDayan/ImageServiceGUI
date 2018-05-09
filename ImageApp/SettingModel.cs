using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ImageApp
{
    
    class SettingModel
    {
        private string outputDir;
        public string getoutputDir() { return outputDir; }

        private string sourceName;
        public string getsourceName() { return sourceName; }

        private string logName;
        public string getlogName() { return logName; }

        private string thumbSize;
        public string getthumbSize() { return thumbSize; }

        private ObservableCollection<String> Handlers;
      
        private NetworkStream ns;
        private ApplicationClient client;
        public SettingModel()
        {
            Handlers = new ObservableCollection<string>();
            //client = new ApplicationClient();
            CreateClient();
        }

        private string ReadClient() {
            byte[] bytes = new byte[1024];
            int bytesRead = ns.Read(bytes, 0, bytes.Length);

            return Encoding.ASCII.GetString(bytes, 0, bytesRead);
        }

        private void WriteClient(string write)
        {
            byte[] byteTime = Encoding.ASCII.GetBytes(write);
            ns.Write(byteTime, 0, byteTime.Length);
        }

        private void CreateClient()
        {
            /*string text = client.ReadClient();
            read_text(text);*/
            {
                try
                {
                    IPAddress ipAddress = IPAddress.Parse("127.0.0.1");
                    IPEndPoint ipLocalEndPoint = new IPEndPoint(ipAddress, 8888);
                    TcpClient client = new TcpClient();
                    client.Connect("127.0.0.1", 8888);
                    //this.client = client;
                    NetworkStream ns = client.GetStream();

                    byte[] bytes = new byte[4096];
                    int bytesRead = ns.Read(bytes, 0, bytes.Length);

                    string c = Encoding.ASCII.GetString(bytes, 0, bytesRead);
                    read_text(c);

                    this.ns = ns;

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }
            }
        }

        private void read_text(string text1)
        {
            string text;
            text = String.Copy(text1);
            int i, j, r;
            string c ="$";
            i = text1.IndexOf("OutputDir");
            j = text1.IndexOf("=" , i);
            r = text1.IndexOf(c, j);
            outputDir = text1.Substring(j + 1, r - j - 1);

            i = text1.IndexOf("SourceName");
            j = text1.IndexOf("=", i);
            r = text1.IndexOf(c, j);
            char s = text1[r - 1];
            char s1 = text1[j + 1];
            sourceName = text1.Substring(j + 1, r-j -1 );

            i = text1.IndexOf("LogName");
            j = text1.IndexOf("=", i);
            r = text1.IndexOf(c, j);
            logName = text1.Substring(j + 1, r - j - 1);

            i = text1.IndexOf("ThumbSize");
            j = text1.IndexOf("=", i);
            r = text1.IndexOf(c, j);
            thumbSize = text1.Substring(j + 1, r -j -1);
            int index = 0;
            while (true)
            {
                if (index == 0) { i = text1.IndexOf("Handler"); }
                else { i = text1.IndexOf("Handler" + index); }
                if (i == -1) { break; }
                j = text1.IndexOf("=", i);
                r = text1.IndexOf(c, j);
                Handlers.Add(text.Substring(j + 1, r - j -1));
                index++;
            }
        }

        public void DeleteHandler(string handler)
        {
            Handlers.Remove(handler);
            WriteClient("CloseCommand$" + handler + "$");
        }
        public void CloseClient() { ns.Close(); }
        public ObservableCollection<string> getHandler()
        {
            return Handlers;
        }

        public void ExitServer()
        {

        }
    }
}
