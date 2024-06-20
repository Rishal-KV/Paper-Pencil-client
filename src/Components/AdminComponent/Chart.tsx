import  { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import adminAPI from '../../API/adminAPI';
import { ApexOptions } from 'apexcharts'; // Import the ApexOptions type

const ApexChart = () => {
  const [series, setSeries] = useState([{
    name: 'Profit',
    data: []
  }]);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    adminAPI.fetchProfit().then((res) => {
      const profitData = res.map((item: any) => item.profit);
      const monthNames = res.map((item: any) => {
        const date = new Date(item.year, item.month - 1); // Month is 0-based
        return date.toLocaleString('default', { month: 'short' });
      });

      setSeries([{
        name: 'Profit',
        data: profitData
      }]);
      setCategories(monthNames);
    }).catch((error) => {
      console.error("Error fetching profit data:", error);
    });
  }, []);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return "₹" + val.toFixed(2);
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: categories,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: number) {
          return "₹" + val.toFixed(2);
        }
      }
    },
    title: {
      text: 'Monthly Profit',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  return (
    <div className='w-screen'>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexChart;
