using Newtonsoft.Json.Linq;
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
    /// <summary>
    /// The model of the settings tab.
    /// </summary>
    class SettingModel
    {
        private bool there_is_connection;
        private string outputDir = " ";
        /// <summary>
        /// Get function.
        /// </summary>
        /// <returns>The output diriectory name. </returns>
        public string getoutputDir() { return outputDir; }

        private string sourceName = " ";
        /// <summary>
        /// Get function.
        /// </summary>
        /// <returns>The source name.</returns>
        public string getsourceName() { return sourceName; }

        private string logName = " ";
        /// <summary>
        /// Get function.
        /// </summary>
        /// <returns>The log name.</returns>
        public string getlogName() { return logName; }

        private string thumbSize = " ";
        /// <summary>
        /// Get function.
        /// </summary>
        /// <returns>The size of the thunm image.</returns>
        public string getthumbSize() { return thumbSize; }

        private ObservableCollection<String> Handlers;
      
        private NetworkStream ns;
        private ApplicationClient client;
        /// <summary>
        /// Constractor.
        /// </summary>
        public SettingModel()
        {
            there_is_connection = false;
            Handlers = new ObservableCollection<string>();
            //client = new ApplicationClient();
            CreateClient();
        }
        /// <summary>
        /// Read from client.
        /// </summary>
        /// <returns>What we read from the stream.</returns>
        private string ReadClient() {
            byte[] bytes = new byte[1024];
            int bytesRead = ns.Read(bytes, 0, bytes.Length);

            return Encoding.ASCII.GetString(bytes, 0, bytesRead);
        }
        /// <summary>
        /// Write to client stream.
        /// </summary>
        /// <param name="write">What we want to write in stream.</param>
        private void WriteClient(string write)
        {
            byte[] byteTime = Encoding.ASCII.GetBytes(write);
            ns.Write(byteTime, 0, byteTime.Length);
        }
        /// <summary>
        /// Function that create client.
        /// </summary>
        private void CreateClient()
        {
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

                    WriteClient("GetConfigCommand");

                    byte[] bytes = new byte[4096];
                    int bytesRead = ns.Read(bytes, 0, bytes.Length);

                    string c = Encoding.ASCII.GetString(bytes, 0, bytesRead);
                    
                    read_text(c); 

                    this.ns = ns;
                    there_is_connection = true;
                    ClientConnected temp = ClientConnected.GetInstance;
                    
                }
                catch (Exception e)
                {
                    there_is_connection = false;
                    Console.WriteLine(e.ToString());
                }
            }
        }
        /// <summary>
        /// Funcion that convert all the details of settings.
        /// </summary>
        /// <param name="text1">All the details seperated with $ .</param>
        private void read_text(string text1)
        {

            JObject jObject = JObject.Parse(text1);
            outputDir = (string)jObject["OutputDir"];
            sourceName = (string)jObject["SourceName"];
            logName = (string)jObject["LogName"];
            thumbSize = (string)jObject["ThumbSize"];

            int index = 0;

            string handlers = (string)jObject["Handler"];
            string[] arr = handlers.Split(new[] { ";" }, StringSplitOptions.None);

            for (int i = 0; i < arr.Length; i++)
            {
                Handlers.Add(arr[i]);
            }

            string deletehandlers = (string)jObject["DeleteHandler"];
            string[] arr2 = deletehandlers.Split(new[] { ";" }, StringSplitOptions.None);
            for (int i = 0; i < arr2.Length; i++)
            {
                Handlers.Remove(arr2[i]);
            }
           
        }
        
        /// <summary>
        /// Function that delete the handler.
        /// </summary>
        /// <param name="handler">Which handler to delete.</param>
        public void DeleteHandler(string handler)
        {
            Handlers.Remove(handler);
            WriteClient("CloseCommand$" + handler + "$");
        }
        /// <summary>
        /// Function that close the stream.
        /// </summary>
        public void CloseClient() {
            try { WriteClient("Exit Server"); ns.Close(); } catch (Exception e) { }  }
        /// <summary>
        /// Function that get a list of handlers.
        /// </summary>
        /// <returns>Return the list of the handlers.</returns>
        public ObservableCollection<string> getHandler()
        {
            return Handlers;
        }
        
        public bool thereIsConnection()
        {
            return there_is_connection;
        }
    }
}
