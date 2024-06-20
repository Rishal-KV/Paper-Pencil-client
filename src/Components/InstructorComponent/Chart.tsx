import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import instructorAPI from '../../API/instructor';
import { useSelector } from 'react-redux';
import { ApexOptions } from 'apexcharts';

// Define types for sales data
interface SalesData {
  totalSales: number;
  year: number;
  month: string;
}

// Define types for the Redux state
interface InstructorState {
  instructor: {
    _id: string;
  };
}

const SalesChart: React.FC = () => {
  const instructor = useSelector((state: any) => state.instructor) as InstructorState;
  const instructorId = instructor.instructor._id;
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    instructorAPI.fetchSales(instructorId).then((res: SalesData[]) => {
      setSalesData(res);
    });
  }, [instructorId]);

  // Combine year and month for each data point
  const categories = salesData && salesData?.map(sale => `${sale.year}-${sale.month}`);

  // Extract and round sales data
  const salesAmounts = salesData && salesData?.map(sale => Math.round(sale.totalSales));

  // Chart options configuration
  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString(); // Display as string without decimals
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toString(); // Display as string without decimals
        }
      }
    },
  };

  const series = [{
    name: 'Total Sales',
    data: salesAmounts,
  }];

  return (
    <div className="w-screen">
      <h2>Monthly Sales Data</h2>
      <div id="chart">
        <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default SalesChart;
