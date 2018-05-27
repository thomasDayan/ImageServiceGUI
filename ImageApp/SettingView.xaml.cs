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
    /// Interaction logic for SettingView.xaml
    /// </summary>
    public partial class SettingView : UserControl
    {
        private SettingViewModel svm;
        private bool click;
        /// <summary>
        /// Constractor.
        /// </summary>
        public SettingView()
        {
            InitializeComponent();
            svm = new SettingViewModel();
            this.DataContext = svm;
            click = false;
            //add function of close application.
            Application.Current.Exit += CloseApplication;
        }
        /// <summary>
        /// Function that called when closed window.
        /// </summary>
        /// <param name="sender">  </param>
        /// <param name="exitEventArgs">  </param>
        private void CloseApplication(object sender, ExitEventArgs exitEventArgs)
        {
            Application.Current.Exit -= CloseApplication;
            svm.CloseClient();
        }
        /// <summary>
        /// Funtion that called when we click on.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void onClickDo(object sender, RoutedEventArgs e)
        {
            svm.onClickDo();
        }
    }
}
