import Chart from "react-apexcharts";

const PieChart = () => {
  return (
    <Chart
      type="pie"
      width={500}
      height={390}
      options={{
        chart: {
          id: "basic-bar",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      }}
      series={[44, 55, 13, 43, 22]}
    />
  );
};
export default PieChart;
