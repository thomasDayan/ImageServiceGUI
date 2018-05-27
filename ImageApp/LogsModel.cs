using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Threading;

namespace ImageApp
{
    /// <summary>
    /// Model of the logs.
    /// We have here client,list of all the logs.
    /// </summary>
    class LogsModel
    {
        private NetworkStream ns;
        ObservableCollection<LogEvent> MyList;
        /// <summary>
        /// Constractor.
        /// </summary>
        public LogsModel()
        {
            CreateClient();
            MyList = new ObservableCollection<LogEvent>();
        }
        /// <summary>
        /// Function for reading from the network stream.
        /// </summary>
        /// <returns>Return back what we read from stream. </returns>
        public string ReadClient()
        {
            try
            {
                byte[] bytes = new byte[4096];
                int bytesRead = ns.Read(bytes, 0, bytes.Length);
                return Encoding.ASCII.GetString(bytes, 0, bytesRead);

            }
            catch (Exception e) { return " "; }
        }
        /// <summary>
        /// Function that write to client.
        /// </summary>
        /// <param name="write">The text we write to stream.</param>
        private void WriteClient(string write)
        {
            byte[] byteTime = Encoding.ASCII.GetBytes(write);
            ns.Write(byteTime, 0, byteTime.Length);
        }
        /// <summary>
        /// Function that alwayes read activities from the server.
        /// We create new thread for that.
        /// </summary>
        public void updateObserverList()
        {
            Task ta = new Task(() =>
            {
                //alwayes read from the server.
                while (true)
                {
                    string line = ReadClient();
                    int con = 0;
                    //function that read all the message and dont miss one.
                    while (true)
                    {
                        string c = "$";
                        int i = line.IndexOf("colour", con);
                        if ( i == -1 ) { break; }
                        int j = line.IndexOf("=", i);
                        int r = line.IndexOf(c, j);

                        string colur = line.Substring(j + 1, r - j - 1);

                        i = line.IndexOf("log" , r);
                        j = line.IndexOf("=", i);
                        r = line.IndexOf(c, j);

                        string log = line.Substring(j + 1, r - j - 1);

                        i = line.IndexOf("message" , r);
                        j = line.IndexOf("=", i);
                        r = line.IndexOf(c, j);

                        string message = line.Substring(j + 1, r - j - 1);

                        LogEvent l = new LogEvent(log, message, colur);
                        //update the collection.
                        App.Current.Dispatcher.BeginInvoke(
                        DispatcherPriority.Background,
                                    new Action(() => {
                                 MyList.Add(l);
                         }));
                        con = r;
                    }
                }
            });
            ta.Start();
        }
        /// <summary>
        /// Get function.
        /// </summary>
        /// <returns>Get the list of logs object.</returns>
        public ObservableCollection<LogEvent> getMyList() { return MyList; }
        /// <summary>
        /// Function that create the client , connect him to the stream.
        /// </summary>
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
                    this.ns = ns;
                    //write the server who communicate with him.
                    WriteClient("LogCommand");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }
            }
        }
        /// <summary>
        /// Close the connection.
        /// </summary>
        public void CloseClient()
        {
            try { ns.Close(); } catch (Exception e) { }
        }
    }
}
