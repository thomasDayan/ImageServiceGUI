using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageApp
{
    /// <summary>
    /// The logs view model.
    /// </summary>
    public class LogsViewModel : INotifyPropertyChanged
    {
        
        private ObservableCollection<LogEvent> mylist;
        private LogsModel model;
        /// <summary>
        /// Constractor.
        /// </summary>
        public LogsViewModel()
        {
            this.model = new LogsModel();
            this.mylist = model.getMyList();
           
            mylist.CollectionChanged += CollectionChange;
          
        }
        /// <summary>
        /// Function that update the list.
        /// </summary>
        public void UpdateCollection()
        {
            model.updateObserverList();
        }
        /// <summary>
        /// Function that taking care when collection is change.
        /// </summary>
        /// <param name="sender">What we send.</param>
        /// <param name="e">The events arguments</param>
        public void CollectionChange(object sender, NotifyCollectionChangedEventArgs e)
        {
            onPropertyChanged("MyList");

        }
        /// <summary>
        /// get and set function for MyList .
        /// </summary>
        public ObservableCollection<LogEvent> MyList { get { return mylist; }
            set { mylist = model.getMyList();
                onPropertyChanged("MyList");
            }
            
        }

        public event PropertyChangedEventHandler PropertyChanged = delegate { };
        /// <summary>
        /// Function that apply when the list have a change.
        /// </summary>
        /// <param name="name"></param>
        protected void onPropertyChanged(string name)
        {
            PropertyChangedEventHandler handler = PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(name));
            }
        }
        /// <summary>
        /// Function that close the client.
        /// </summary>
        public void CloseClient()
        {
            model.CloseClient();
        }
    }
}
