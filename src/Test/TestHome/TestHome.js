import React, { Suspense, lazy, useState, useContext, useMemo, useEffect } from "react";
import TopTray from "../../Components/Decoration/TopTray";
import "./common.css";
import { OfferCard } from "../../Components/Decoration/OfferCard";
import {
	makeStyles,
	CircularProgress,
	Container,
	Breadcrumbs,
	Grid,
	Card,
	ListItem,
	Button,
	Typography,
	Paper,
	Tabs,
	Tab,
	Divider,
	List,
	ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import axios from "axios";
import { FullNav } from "../../Components/Navigation/Nav";
import { Link } from "react-router-dom";
import i1 from "./tablet.svg";
import i2 from "./education2.svg";
import i3 from "./analytics.svg";
import { FcClock, FcInspection, FcKindle, FcLock, FcApproval, FcComboChart } from "react-icons/fc";
import { MainContext } from "../../Components/Context/MainContext";
const Footer = lazy(() => import("../../Components/Footer/Footer"));
const testSyle = makeStyles((theme) => ({
	titleBg: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(3),
	},
	listBg: {
		minHeight: 600,
		background: "linear-gradient(to top,#e3fcf7, #ffffff )",
	},
	seriesCard: {
		height: 310,
		maxWidth: 250,
		padding: theme.spacing(2),
		marginLeft: "auto",
		marginRight: "auto",
		lineHeight: 1.5,
		transition: "transform 0.3s",
		background: "linear-gradient(to left, #6dd5fa,  #e3e9fc, #ffffff)",
		"&:hover": {
			background: "linear-gradient(to bottom, #f0b3f9,  #C9D6FF, #ffffff)",
			transform: "scale(1.02)",
		},
	},
	avatar: {
		height: theme.spacing(7),
	},
	icon: {
		width: 75,
		height: 75,
		marginRight: 10,
	},
}));

function TestHome({ match }) {
	const classes = testSyle();
	const [tab, setTab] = useState("All");
	const [seriesData, setSD] = useState({ desp: [], tests: [] });
	const [type, setType] = useState([]);
	const { state } = useContext(MainContext);
	const [loading, setLoading] = useState(true);
	document.title = `${seriesData.shortTitle} | Online Test - Qualifier.co.in `;

	useEffect(() => {
		setLoading(true);
		if (match.params.serieslink) {
			let link = `/api/bigtest/mocktest/seriesdata/${match.params.serieslink}`;
			if (state.isAuthenticated) {
				link = `/api/bigtest/mocktest/authseriesdata/${match.params.serieslink}`;
			}
			axios
				.get(link)
				.then((res) => {
					setSD(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	}, [match.params.serieslink, state.isAuthenticated]);
	useMemo(() => {
		let ty = [];
		seriesData.tests &&
			seriesData.tests.map((t) => {
				const newTy = ty.find((o) => o === t.type);
				if (newTy !== t.type) {
					return ty.push(t.type);
				} else return null;
			});
		return setType(ty);
	}, [seriesData]);
	return (
		<div>
			<TopTray />
			<FullNav />
			<div className={classes.titleBg}>
				<Container>
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Link to="/">Home</Link>
						<Link to="/online-test-series">Test Series</Link>
						<Typography variant="body2" color="textPrimary">
							{seriesData.shortTitle}
						</Typography>
					</Breadcrumbs>
					<Typography variant="h6" color="primary">
						{seriesData.title}
					</Typography>
				</Container>
			</div>

			<div className={classes.listBg}>
				<Container>
					<Grid container spacing={4}>
						<Grid item md={9}>
							<Typography gutterBottom variant="h6">
								Free Mock Test
							</Typography>
							{loading ? (
								<div className="center">
									<CircularProgress />
								</div>
							) : (
								seriesData.tests &&
								seriesData.tests.filter((f) => f.free === true).map((t, i) => <TestCard data={t} serieslink={seriesData.link} key={i} />)
							)}
							<br />
							<br />
							<Typography variant="h6">Features of Qualifier</Typography>
							<Grid container>
								{features.map((f) => (
									<Grid item sm={4} key={f.title}>
										<List dense>
											<ListItem>
												<img alt={f.logo} src={f.logo} className={classes.icon} />
												<ListItemText
													primary={<Typography color="primary"> {f.title}</Typography>}
													secondary={
														<Typography variant="subtitle2" color="textSecondary">
															{f.desc}
														</Typography>
													}
												/>
											</ListItem>
										</List>
									</Grid>
								))}
							</Grid>
							<br />
							<br />
							<Typography variant="h6">{`All Tests ~ (${seriesData.totalTest})`}</Typography>
							<Paper>
								<Tabs variant="scrollable" textColor="secondary" value={tab} onChange={(e, v) => setTab(v)}>
									<Tab label="All" value="All" />
									{type.map((t, j) => (
										<Tab label={t} key={j} value={t} />
									))}
								</Tabs>
							</Paper>
							{tab === "All"
								? seriesData.tests.map((t, i) => <TestCard data={t} key={i} serieslink={seriesData.link} />)
								: seriesData.tests.filter((f) => f.type === tab).map((d, j) => <TestCard data={d} key={j} serieslink={seriesData.link} />)}
							<br /> <br />
						</Grid>
						<Grid item md={3} style={{ marginLeft: "auto", marginRight: "auto" }}>
							<Card className={clsx(classes.seriesCard, "shine")} elevation={2}>
								<img className={classes.avatar} src={seriesData.logo} alt="logo" />
								<Typography noWrap variant="h6">
									{seriesData.title}
								</Typography>
								<Grid container>
									<Grid item>
										<Typography gutterBottom>{`${seriesData.totalTest} Total Test`}</Typography>
									</Grid>
									<Grid item>
										<Typography gutterBottom style={{ color: "#89159b" }}>
											{"\u00A0"} | {"\u00A0"} {`${seriesData.totalFree} Free Test`}
										</Typography>
									</Grid>
								</Grid>
								<Divider light />
								<List dense style={{ height: 135, overflow: "hidden" }}>
									{seriesData.desp &&
										seriesData.desp.map((l, j) => (
											<ListItem dense key={j} style={{ padding: 0 }}>
												<FcApproval style={{ fontSize: "larger" }} />
												<span style={{ flexGrow: 0.2 }} />
												<ListItemText disableTypography primary={l.title} />
											</ListItem>
										))}
								</List>
								<Divider light />
								<center>
									<Link to="/pricing">
										<Button size="small" fullWidth style={{ marginTop: 8 }} variant="outlined" color="primary">
											Grab All Test Series
										</Button>
									</Link>
								</center>
							</Card>
							<br />
							<OfferCard />
							<br />
						</Grid>
					</Grid>
				</Container>
			</div>

			<Suspense fallback={<CircularProgress />}>
				<Footer />
			</Suspense>
		</div>
	);
}

export default TestHome;

const cardStyle = makeStyles((theme, data) => ({
	freeCard: {
		marginTop: theme.spacing(2),
		height: 80,
		border: (data) => (data.free ? "1px solid greenyellow" : data.isLock ? "1px solid fuchsia" : null),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(),
	},
	trans: {
		transform: (data) => !data.free && !data.isLock && "translateY(40%)",
		[theme.breakpoints.down("xs")]: {
			transform: (data) =>
				data.isReport ? "translateY(-10%)" : !data.isLock && !data.free ? "translateY(5%)" : !data.isLock ? "translateY(-30%)" : null,
		},
	},
	cross: {
		left: "-3em",
		top: "0.9em",
		fontSize: "10px",
		lineHeight: 1.5,
		textAlign: "center",
		width: "6em",
		position: "relative",
		letterSpacing: 1,
		zIndex: 20,
		transform: "rotate(-45deg)",
		color: "#fff",
		// [theme.breakpoints.up("sm")]: {
		// 	// top: "-0.7em",
		// },
	},
	free: {
		background: "linear-gradient(45deg,#72d042 17%,#25cc71 70%)",
	},
	lock: {
		background: "linear-gradient(45deg,#f73888 17%,#d63ed8 70%)",
	},
	righBnr: {
		fontSize: "10px",
		width: "fit-content",
		right: 0,
		letterSpacing: 1,
		lineHeight: 1.5,
		padding: "0px 5px",
		float: "right",
		borderRadius: "3px",
		color: "#fff",
		background: "linear-gradient(to right, #4BC0C8, #6441A5)",
	},
	mob: {
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	botmBtn: {
		background: "linear-gradient(45deg,#00c6ff, #b3ffab)",
		color: "navy",
		borderRadius: 10,
		padding: "2px 10px",
		fontSize: 12,
		letterSpacing: 1,
		width: "fit-content",
	},
}));

function TestCard({ data, serieslink }) {
	const classes = cardStyle(data);
	return (
		<Card className={classes.freeCard}>
			{data.free && <div className={clsx(classes.cross, classes.free)}>FREE</div>}
			{data.isLock && <div className={clsx(classes.cross, classes.lock)}>LOCK</div>}
			{!data.isReport && <div className={clsx(classes.righBnr, classes.mob)}>{data.isLock ? "BUY" : "START"}</div>}
			<Grid container alignItems="center" className={classes.trans}>
				<Grid item>
					<Link to={data.isLock === false ? `/test/${serieslink}/${data.testLink}/instruction` : "/pricing"}>
						<Typography color="primary" noWrap>
							{data.free || data.isLock ? <>&nbsp; &nbsp;</> : null}
							{data.testName}
						</Typography>
					</Link>
					<div style={{ display: "flex", justifyContent: "space-between", width: 300 }}>
						<Typography variant="caption" color="textSecondary">
							<FcKindle /> {`${data.totalQuestion} Total Question`}
						</Typography>
						<Typography variant="caption" color="textSecondary">
							<FcInspection /> {`${data.totalMarks} Total Marks`}
						</Typography>
						<Typography variant="caption" color="textSecondary">
							<FcClock /> {data.totalTime}
						</Typography>
					</div>
					{data.isReport && (
						<center>
							<Link to={`/test/${serieslink}/${data.testLink}/instruction`}>
								<span className={clsx(classes.botmBtn, classes.mob)}>REATTEMPT</span>
							</Link>
							&nbsp; &nbsp;&nbsp;
							<Link to={`/test/${serieslink}/${data.testLink}/report`}>
								<span className={clsx(classes.botmBtn, classes.mob)}>SEE REPORT</span>
							</Link>
						</center>
					)}
				</Grid>

				<span style={{ flexGrow: 1 }} />
				<Grid item className="hideInMob">
					{data.isLock ? (
						<Link to={`/pricing`}>
							<Button variant="outlined" startIcon={<FcLock />} color="secondary">
								UnLock
							</Button>
						</Link>
					) : data.isReport ? (
						<>
							<Link to={`/test/${serieslink}/${data.testLink}/report`}>
								<Button variant="outlined" startIcon={<FcComboChart />} color="secondary">
									Report
								</Button>
							</Link>
							&nbsp; &nbsp;
							<Link to={`/test/${serieslink}/${data.testLink}/instruction`}>
								<Button variant="contained" color="primary">
									Reattempt
								</Button>
							</Link>
						</>
					) : (
						<Link to={`/test/${serieslink}/${data.testLink}/instruction`}>
							<Button variant="contained" color="primary">
								Start Now
							</Button>
						</Link>
					)}
				</Grid>
			</Grid>
		</Card>
	);
}

const features = [
	{
		logo: i1,
		title: "All India Rank",
		desc: "Get a rank prediction on behalf of your score.",
	},
	{
		logo: i2,
		title: "Exam Relevant Questions",
		desc: "Only selected questions by our expert faculties.",
	},
	{
		logo: i3,
		title: "In-depth Reporting",
		desc: "Analysis of your weak & strong zone by graphs.",
	},
];
