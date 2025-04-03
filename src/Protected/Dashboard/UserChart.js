import React from "react";
import { Bar } from "react-chartjs-2";
import { fetchData } from "../../Components/Api";
const chatRes = fetchData("/api/report/user/activity");

export default function UserChart() {
	const chartData = chatRes.data.read();
	return (
		<Bar
			data={chartData.data}
			options={{
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			}}
		/>
	);
}
