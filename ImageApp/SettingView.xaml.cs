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
        public SettingView()
        {
            InitializeComponent();
            svm = new SettingViewModel();
            this.DataContext = svm;
            click = false;

            Application.Current.Exit += CloseApplication;
        }
        private void CloseApplication(object sender, ExitEventArgs exitEventArgs)
        {
            Application.Current.Exit -= CloseApplication;
            svm.CloseClient();

        }

        public void onClickDo(object sender, RoutedEventArgs e)
        {
            svm.onClickDo();
        }
    }
}
