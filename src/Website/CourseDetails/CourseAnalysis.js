import React, { Fragment, useState, useEffect } from "react";
import { styled, Typography, Card, Grid, List, ListItem, ListItemText, IconButton, CircularProgress } from "@mui/material";
import axios from "axios";
import { FaChartLine, FaBullseye, FaCheckCircle } from "react-icons/fa";
import NoContent from "../../Components/NoContent";

import { Doughnut } from "react-chartjs-2";

const ReportCard = styled(Card)(({ theme }) => ({
	maxWidth: "307px",
	height: "415px",
	padding: 30,
	marginTop: theme.spacing(2),
	"&:hover": {
		boxShadow: "0 0 11px rgba(33,33,33,.2)",
	},
}));

const ChartContainer = styled('div')(({ theme }) => ({
	maxWidth: 272,
	maxHeight: 174,
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
	marginTop: theme.spacing(20),
}));

export default function CourseAnalysis({ link, fig }) {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [notAuth, setNotAuth] = useState(null);

	useEffect(() => {
		let isSubscribed = true;
		if (fig) {
			setData(fig);
			setLoading(false);
		} else {
			axios
				.get(`/api/report/analytics/${link}`)
				.then((res) => {
					if (isSubscribed) {
						setData(res.data);
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setNotAuth(true);
					setLoading(false);
				});
		}

		return () => (isSubscribed = false);
	}, [link, fig]);
	if (loading) {
		return (
			<center>
				<LoadingSpinner />
			</center>
		);
	}
	return (
		<Fragment>
			<br />
			<Typography color="primary" variant="h6">
				Your Progress Status
			</Typography>
			<center>
				{notAuth && <NoContent msg="Kindly Login to see Analysis" />}

				<Grid container spacing={2}>
					{data.map &&
						data.map((d, i) => (
							<Grid key={i} item xs={12} md={4}>
								<ReportCard>
									<Typography gutterBottom align="center" color="primary" variant="h6">
										<IconButton color="primary" aria-label="saved">
											<Icon i={i} />
										</IconButton>
										{d.title}
									</Typography>
									<ChartContainer>
										<Doughnut data={d.chartData} width={272} height={174} />
									</ChartContainer>
									<List>
										{d.list &&
											d.list.map((l) => (
												<ListItem key={l.name} button>
													<ListItemText primary={l.name} />
													<Typography>{l.value}</Typography>
												</ListItem>
											))}
									</List>
								</ReportCard>
							</Grid>
						))}
				</Grid>
			</center>
		</Fragment>
	);
}

function Icon(props) {
	if (props.i === 0) return <FaChartLine />;
	else if (props.i === 1) return <FaBullseye />;
	else if (props.i === 2) return <FaCheckCircle />;
	else return null;
}
