using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ImageApp
{
    /// <summary>
    /// Interaction logic for LogsView.xaml
    /// </summary>
    partial class LogsView : UserControl
    {
        private LogsViewModel lvm;
        /// <summary>
        /// Constractor of log view.
        /// </summary>
        public LogsView()
        {
            InitializeComponent();
            lvm = new LogsViewModel();
            this.DataContext = lvm;
            Application.Current.Exit += CloseApplication;

            lvm.UpdateCollection();
        }
        /// <summary>
        /// Apply this function when the window closed.
        /// </summary>
        /// <param name="sender">what we send.</param>
        /// <param name="exitEventArgs">the exit arguments.</param>
        private void CloseApplication(object sender, ExitEventArgs exitEventArgs)
        {
            Application.Current.Exit -= CloseApplication;
            lvm.CloseClient();

        }
    }
}
