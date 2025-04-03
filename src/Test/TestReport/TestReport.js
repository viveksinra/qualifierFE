import React, { useState, useEffect } from "react";
import { FullNav, HideOnScroll } from "../../Components/Navigation/Nav";
import { makeStyles, Container, Paper, Typography, CardActions, Avatar, Grid, ListItemText, Chip } from "@material-ui/core";
import { SectionBreakdown } from "../../Protected/Report";
import CourseAnalysis from "../../Website/CourseDetails/CourseAnalysis";
import Rating from "@material-ui/lab/Rating";
import { Distribution } from "../../Components/Charts/Charts";
import axios from "axios";
import { OfferCard } from "../../Components/Decoration/OfferCard";
import i1 from "./icon1.svg";
import i2 from "./icon2.svg";
import i3 from "./icon3.svg";
import i4 from "./icon4.svg";
const reportStyle = makeStyles((theme) => ({
	topBg: {
		backgroundColor: "#ffffff",
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E\")",
		fontSize: "1.5rem",
		backgroundSize: "cover",
		paddingTop: theme.spacing(5),
		display: "flex",
		justifyContent: "center",
		height: "20vh",
	},
	repTop: {
		marginTop: "-8vh",
		minHeight: "12vh",
		textAlign: "center",
		fontFamily: "sans-serif",
		color: "#0a5494",
		maxWidth: 1080,
		padding: theme.spacing(),
		zIndex: 2,
		marginBottom: "30px",
		marginLeft: "auto",
		marginRight: "auto",
		[theme.breakpoints.down("md")]: {
			maxWidth: "90%",
		},
	},
	rating: {
		position: "fixed",
		top: "auto",
		right: 20,
		bottom: 0,
		paddingTop: 10,
		width: 180,
		textAlign: "center",
		borderRadius: "20px 20px 0px 0px",
		backgroundImage: "linear-gradient(to top, #defafc, #f2fcfe)",
		borderBottomStyle: "none",
	},
}));

function TestReport({ match }) {
	const classes = reportStyle();
	const [rating, setRating] = useState(0);
	const [data, setData] = useState({
		testName: "Gerenating your Report, Please Wait...",
		offerImg: "",
		summary: [],
		qdata: {},
		Report: [],
		final3: [],
	});
	document.title = `${data.testName} | Report - Qualifier `;
	useEffect(() => {
		let isSubscribed = true;
		axios
			.get(`/api/bigtest/testresponse/report/${match.params.testlink}`)
			.then((res) => {
				if (isSubscribed) {
					setData(res.data);
				}
			})
			.catch((err) => console.log(err));
		return () => (isSubscribed = false);
	}, [match]);
	return (
		<div>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<div className={classes.topBg}>
				<Chip label={data.testName} color="primary" />
			</div>
			<Paper className={classes.repTop}>
				Overall Performance
				<Grid container spacing={2} justify="space-evenly">
					{data &&
						data.summary.map((d, i) => (
							<Grid item key={d.name}>
								<CardActions>
									{icon(i)}
									<ListItemText primary={d.value} secondary={d.name} />
								</CardActions>
							</Grid>
						))}
				</Grid>
			</Paper>
			<Container>
				<CourseAnalysis fig={data && data.Report} />
				<SectionBreakdown data={data && data.final3} />
				<br />
				<br />
				<Grid container spacing={2}>
					<Grid item xs={12} md={7}>
						<Typography gutterBottom variant="subtitle1" align="center" color="secondary">
							Question statistics
						</Typography>
						<Distribution data={data && data.qdata} />
					</Grid>
					<Grid item xs={12} md={5} className="center">
						<OfferCard />
					</Grid>
				</Grid>
			</Container>

			<div className={classes.rating}>
				<Rating
					name="feedback"
					value={rating}
					onChange={(e, v) => {
						setRating(v);
					}}
					// onChangeActive={(e, hv) => {
					// 	setHvr(hv);
					// }}
				/>
				<Typography gutterBottom color="textSecondary">
					Rate your Test
				</Typography>

				{/* {rating !== null && <Box ml={2}>{labels[hvr !== -1 ? hvr : rating]}</Box>} */}
			</div>
		</div>
	);
}

export default TestReport;

// const labels = {
// 	1: "Useless",
// 	2: "Poor",
// 	3: "Ok",
// 	4: "Good",
// 	5: "Excellent",
// };
const icon = (i) => {
	switch (i) {
		case 0:
			return <Avatar alt="icon1" src={i1} style={{ width: 50, height: 50 }} />;
		case 1:
			return <Avatar alt="icon2" src={i4} style={{ width: 50, height: 50 }} />;
		case 2:
			return <Avatar alt="icon3" src={i3} style={{ width: 50, height: 50 }} />;
		case 3:
			return <Avatar alt="icon4" src={i2} style={{ width: 50, height: 50 }} />;
		default:
			return null;
	}
};
