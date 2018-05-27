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
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private string color;
        public string Color
        {
            get { return color; }
        }
        /// <summary>
        /// Constraction of the main window.
        /// </summary>
        public MainWindow()
        {
            InitializeComponent();
            int count = ClientConnected.GetInstance.getConnect();
            if (count >= 3) { color = "White"; }
            else { color = "Gray";  }
            this.DataContext = this;
        }
        
    }
}
