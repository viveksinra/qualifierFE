import React from "react";
import { Bar } from "react-chartjs-2";

export function Distribution({ data }) {
	// const qdata = {
	// 	labels: ["Physics", "CBS", "MATH", "SCIENCE"],
	// 	datasets: [
	// 		{
	// 			label: "Correct",
	// 			data: [10, 20, 30, 45],
	// 			barPercentage: 0.5,
	// 			minBarLength: 2,
	// 			backgroundColor: ["rgba(39, 174, 96, 0.2)", "rgba(39, 174, 96, 0.2)", "rgba(39, 174, 96, 0.2)", "rgba(39, 174, 96, 0.2)"],
	// 			borderColor: ["rgba(39, 174, 96, 1)", "rgba(39, 174, 96, 1)", "rgba(39, 174, 96, 1)", "rgba(39, 174, 96, 1)"],
	// 			borderWidth: 1,
	// 		},
	// 		{
	// 			label: "Incorrect",
	// 			data: [15, 25, 30, 20],
	// 			barPercentage: 0.5,
	// 			minBarLength: 2,
	// 			backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 0.2)"],
	// 			borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 1)"],
	// 			borderWidth: 1,
	// 		},
	// 		{
	// 			label: "Skiped",
	// 			data: [5, 30, 25, 15],
	// 			barPercentage: 0.5,
	// 			minBarLength: 2,
	// 			backgroundColor: ["rgba(99, 31, 244, 0.2)", "rgba(99, 31, 244, 0.2)", "rgba(99, 31, 244, 0.2)", "rgba(99, 31, 244, 0.2)"],
	// 			borderColor: ["rgba(99, 31, 244, 1)", "rgba(99, 31, 244, 1)", "rgba(99, 31, 244, 1)", "rgba(99, 31, 244, 1)"],
	// 			borderWidth: 1,
	// 		},
	// 	],
	// };
	return <Bar data={data} options={{ maintainAspectRatio: true }} />;
}
