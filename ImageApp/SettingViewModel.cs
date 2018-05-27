using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace ImageApp
{
    /// <summary>
    /// The view model of the settings tab.
    /// </summary>
    class SettingViewModel : INotifyPropertyChanged
    {
        private bool isCheck;
        private string delete_handler;
        private SettingModel model;
        private string outputDir;
        /// <summary>
        /// get of the output directory.
        /// </summary>
        public String OutPutDir { get { return outputDir; } }
        public String ColourBackground
        {
            get
            {
                if (model.thereIsConnection()) { return "White"; }
                else { return "Gray"; }
            }
            set
            {

            }
        }
        private string sourceName;
        /// <summary>
        /// get of the source name.
        /// </summary>
        public string SourceName { get { return sourceName; } }

        private string logName;
        /// <summary>
        /// get the log name.
        /// </summary>
        public string LogName { get { return logName; } }

        private string thumbSize;
        /// <summary>
        /// get the thumb size.
        /// </summary>
        public string ThumbSize { get {return thumbSize; } }
        private ObservableCollection<string> handler;
        /// <summary>
        /// get the list of all the handlers.
        /// </summary>
        public ObservableCollection<String> Handlers { get { return handler; }
            set { handler = model.getHandler(); PropertyChanged(this, new PropertyChangedEventArgs("Handlers")); }
        }
        /// <summary>
        /// Constractor.
        /// </summary>
        public SettingViewModel()
        {
            model = new SettingModel();
            outputDir = model.getoutputDir();
            sourceName = model.getsourceName();
            logName = model.getlogName();
            thumbSize = model.getthumbSize();
            handler = model.getHandler();
            isCheck = false;
            delete_handler = "ff";
        }
        /// <summary>
        /// What we do when we click the botom.
        /// </summary>
        public void onClickDo()
        {
            string c = delete_handler;
            model.DeleteHandler(c);
            isCheck = false;
            PropertyChanged(this, new PropertyChangedEventArgs("IsCheck"));
            PropertyChanged(this, new PropertyChangedEventArgs("Handlers"));

        }
        /// <summary>
        /// get if there some handlers is checked.
        /// </summary>
        public bool IsCheck
        {
            get { return isCheck; }
            set
            {
                isCheck = value;
                PropertyChanged(this, new PropertyChangedEventArgs("IsCheck"));
            }
        }
        /// <summary>
        /// Function that apply when delete handler.
        /// </summary>
        public string Delete { get { return delete_handler; }
        set {
                isCheck = true;
                delete_handler = value;
                if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs("IsCheck"));
                
            }
        }

        public event PropertyChangedEventHandler PropertyChanged = delegate { };
        /// <summary>
        /// Function that apply when closed window that close client.
        /// </summary>
        public void CloseClient() { model.CloseClient(); }
    }
}
