import React from "react";
import { Bar } from "react-chartjs-2";
import { fetchData } from "../../Components/Api";
import { 
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
} from 'chart.js';

// Register the required chart components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

const chatRes = fetchData("/api/report/user/activity");

export default function UserChart() {
	const chartData = chatRes.data.read();
	return (
		<Bar
			data={chartData.data}
			options={{
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}}
		/>
	);
}
