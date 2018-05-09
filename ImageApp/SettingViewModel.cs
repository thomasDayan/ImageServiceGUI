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
    class SettingViewModel : INotifyPropertyChanged
    {
        private bool isCheck;
        private string delete_handler;
        private SettingModel model;
        private string outputDir;
        public String OutPutDir { get { return outputDir; } }
        private string sourceName;
        public string SourceName { get { return sourceName; } }

        private string logName;
        public string LogName { get { return logName; } }

        private string thumbSize;
        public string ThumbSize { get {return thumbSize; } }
        private ObservableCollection<string> handler;
        public ObservableCollection<String> Handlers { get { return handler; }
            set { handler = model.getHandler(); PropertyChanged(this, new PropertyChangedEventArgs("Handlers")); }
        }
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

        public void onClickDo()
        {
            string c = delete_handler;
            model.DeleteHandler(c);
            isCheck = false;
            PropertyChanged(this, new PropertyChangedEventArgs("IsCheck"));
            PropertyChanged(this, new PropertyChangedEventArgs("Handlers"));

        }

        public bool IsCheck
        {
            get { return isCheck; }
            set
            {
                isCheck = value;
                PropertyChanged(this, new PropertyChangedEventArgs("IsCheck"));
            }
        }

        public string Delete { get { return delete_handler; }
        set {
                isCheck = true;
                delete_handler = value;
                if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs("IsCheck"));
                
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        public void CloseClient() { model.CloseClient(); }
    }
}
