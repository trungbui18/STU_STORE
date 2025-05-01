import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";

const RevenueExport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartDate, setChartDate] = useState("");
  const [chartData, setChartData] = useState([]);
  const [exportData, setExportData] = useState([]);

  const getToday = () => new Date().toLocaleDateString("sv-SE").split("T")[0];

  // Gọi API doanh thu theo khoảng ngày
  const fetchRevenueForExport = async (start, end) => {
    try {
      const res = await fetch(
        `http://localhost:8080/order/revenue?startDate=${start}&endDate=${end}`
      );
      if (!res.ok) throw new Error("Failed to fetch revenue");
      const data = await res.json();
      setExportData(data);
      return data;
    } catch (error) {
      console.error("Lỗi khi gọi API export:", error);
      return [];
    }
  };

  // Gọi API doanh thu theo ngày để vẽ biểu đồ
  const fetchChartRevenue = async (date) => {
    try {
      const res = await fetch(
        `http://localhost:8080/order/revenue/oneday?date=${date}`
      );
      if (!res.ok) throw new Error("Failed to fetch chart revenue");
      const data = await res.json();
      // Tạo mảng đầy đủ từ 0 đến 23
      const fullHours = Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        revenue: 0,
      }));
      // Kết hợp dữ liệu API vào mảng đầy đủ
      data.forEach((item) => {
        const hour = Math.round(item.hour);
        if (hour >= 0 && hour <= 23) {
          fullHours[hour] = { hour, revenue: item.revenue };
        }
      });
      setChartData(fullHours);
    } catch (error) {
      console.error("Lỗi khi gọi API biểu đồ:", error);
      setChartData(
        Array.from({ length: 24 }, (_, i) => ({ hour: i, revenue: 0 }))
      );
    }
  };

  useEffect(() => {
    const today = getToday();
    setChartDate(today);
    fetchChartRevenue(today);
  }, []);

  const handleExportClick = async () => {
    if (!startDate || !endDate) {
      alert("Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
      return;
    }

    const data = await fetchRevenueForExport(startDate, endDate);
    if (data.length > 0) {
      handleExportExcel(data);
    } else {
      alert("Không có dữ liệu để xuất.");
    }
  };

  const handleExportExcel = () => {
    if (!exportData || exportData.length === 0) return;

    const sortedData = [...exportData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA.getTime() === dateB.getTime()) {
        return a.hour - b.hour;
      }
      return dateA - dateB;
    });

    const formattedData = sortedData.map((item) => ({
      Ngày: new Date(item.date).toLocaleDateString("vi-VN"),
      Giờ: `${Math.round(item.hour).toString().padStart(2, "0")}:00`,
      "Doanh thu": item.revenue,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue");
    XLSX.writeFile(workbook, "doanh-thu-theo-ngay.xlsx");
  };

  const handleChartDateChange = (e) => {
    const selectedDate = e.target.value;
    setChartDate(selectedDate);
    fetchChartRevenue(selectedDate);
  };

  // Cấu hình ApexCharts
  const chartOptions = {
    chart: {
      type: "bar",
      height: 400,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        distributed: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${(val / 1000).toFixed(0)}K`,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      title: {
        text: "Giờ",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Doanh thu (VND)",
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (val) => `${(val / 1000).toFixed(0)}K`,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString("vi-VN")} VND`,
      },
    },
    colors: ["#f59e0b"],
    grid: {
      borderColor: "#e7e7e7",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 300,
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Doanh thu",
      data: chartData.map((item) => item.revenue),
    },
  ];

  return (
    <div className="p-6">
      {/* --- Nhóm export --- */}
      <div className="mb-4 flex items-center gap-4">
        <div>
          <label className="font-semibold mr-2">Từ ngày:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded"
            max={getToday()}
          />
        </div>
        <div>
          <label className="font-semibold mr-2">Đến ngày:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded"
            max={getToday()}
          />
        </div>
        <button
          onClick={handleExportClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Xuất Excel
        </button>
      </div>

      {/* --- Nhóm biểu đồ --- */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Chọn ngày vẽ biểu đồ:</label>
        <input
          type="date"
          value={chartDate}
          onChange={handleChartDateChange}
          className="px-4 py-2 border rounded"
          max={getToday()}
        />
      </div>

      {chartData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={400}
          />
        </div>
      ) : (
        <p className="text-gray-500">Không có dữ liệu để vẽ biểu đồ.</p>
      )}
    </div>
  );
};

export default RevenueExport;
