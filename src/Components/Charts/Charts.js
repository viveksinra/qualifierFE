import React from "react";
import { Bar } from "react-chartjs-2";

export function Distribution({ data }) {
	// Default data structure if data is undefined or invalid
	const defaultData = {
		labels: [],
		datasets: [
			{
				label: "Correct",
				data: [],
				barPercentage: 0.5,
				minBarLength: 2,
				backgroundColor: ["rgba(39, 174, 96, 0.2)"],
				borderColor: ["rgba(39, 174, 96, 1)"],
				borderWidth: 1,
			},
			{
				label: "Incorrect",
				data: [],
				barPercentage: 0.5,
				minBarLength: 2,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
			{
				label: "Skipped",
				data: [],
				barPercentage: 0.5,
				minBarLength: 2,
				backgroundColor: ["rgba(99, 31, 244, 0.2)"],
				borderColor: ["rgba(99, 31, 244, 1)"],
				borderWidth: 1,
			},
		],
	};

	// Use provided data if it exists and has required properties, otherwise use default
	const chartData = data && data.labels && data.datasets ? data : defaultData;

	return <Bar data={chartData} options={{ maintainAspectRatio: true }} />;
}
