import React, { Suspense, lazy, useState, useContext, useMemo, useEffect } from "react";
import "./common.css";
import { OfferCard } from "../../Components/Decoration/OfferCard";
import {
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
} from "@mui/material";
import { styled } from '@mui/material/styles';
import clsx from "clsx";
import axios from "axios";
import { FullNav } from "../../Components/Navigation/Nav";
import { Link, useParams } from "react-router-dom";
import i1 from "./tablet.svg";
import i2 from "./education2.svg";
import i3 from "./analytics.svg";
import {  FcKindle, FcLock, FcApproval, FcComboChart } from "react-icons/fc";
import { MainContext } from "../../Components/Context/MainContext";
import { brandText } from "../../theme";
const Footer = lazy(() => import("../../Components/Footer/Footer"));

// Styles for TestHome component
const testHomePrefix = 'TestHome';
const testHomeClasses = {
	titleBg: `${testHomePrefix}-titleBg`,
	listBg: `${testHomePrefix}-listBg`,
	seriesCard: `${testHomePrefix}-seriesCard`,
	avatar: `${testHomePrefix}-avatar`,
	icon: `${testHomePrefix}-icon`
};

const StyledTestHomeContainer = styled('div')(({ theme }) => ({
	[`& .${testHomeClasses.titleBg}`]: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(3),
	},
	[`& .${testHomeClasses.listBg}`]: {
		minHeight: 600,
		background: "linear-gradient(to top,#e3fcf7, #ffffff )",
	},
	[`& .${testHomeClasses.seriesCard}`]: {
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
	[`& .${testHomeClasses.avatar}`]: {
		height: theme.spacing(7),
	},
	[`& .${testHomeClasses.icon}`]: {
		width: 75,
		height: 75,
		marginRight: 10,
	},
}));

function TestHome() {
	const { serieslink } = useParams();
	const [tab, setTab] = useState("All");
	const [seriesData, setSD] = useState({ desp: [], tests: [] });
	const [type, setType] = useState([]);
	const { state } = useContext(MainContext);
	const [loading, setLoading] = useState(true);
	document.title = `${seriesData.shortTitle} | Online Test - ${brandText.brandName} `;

	useEffect(() => {
		setLoading(true);
		if (serieslink) {
			let link = `/api/bigtest/mocktest/seriesdata/${serieslink}`;
			if (state.isAuthenticated) {
				link = `/api/bigtest/mocktest/authseriesdata/${serieslink}`;
			}
			axios
				.get(link)
				.then((res) => {
					console.log(res.data);
					setSD(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	}, [serieslink, state.isAuthenticated]);
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
		<StyledTestHomeContainer>
			<FullNav />
			<div className={testHomeClasses.titleBg}>
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

			<div className={testHomeClasses.listBg}>
				<Container>
					<Grid container spacing={4}>
						<Grid size={{xs: 12, md: 9}}>
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
									<Grid size={{xs: 12, sm: 4}} key={f.title}>
										<List dense>
											<ListItem>
												<img alt={f.logo} src={f.logo} className={testHomeClasses.icon} />
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
						<Grid size={{xs: 12, md: 3}} style={{ marginLeft: "auto", marginRight: "auto" }}>
							<Card className={clsx(testHomeClasses.seriesCard, "shine")} elevation={2}>
								<img className={testHomeClasses.avatar} src={seriesData.logo} alt="logo" />
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
		</StyledTestHomeContainer>
	);
}

export default TestHome;

// Styles for TestCard component
const testCardPrefix = 'TestCard';
const testCardClasses = {
	freeCard: `${testCardPrefix}-freeCard`,
	trans: `${testCardPrefix}-trans`,
	cross: `${testCardPrefix}-cross`,
	free: `${testCardPrefix}-free`,
	lock: `${testCardPrefix}-lock`,
	righBnr: `${testCardPrefix}-righBnr`,
	mob: `${testCardPrefix}-mob`,
	botmBtn: `${testCardPrefix}-botmBtn`,
	badge: `${testCardPrefix}-badge`,
	examIcon: `${testCardPrefix}-examIcon`,
};

const StyledTestCard = styled(Card)(({ theme, data }) => ({
	[`&.${testCardClasses.freeCard}`]: {
		marginTop: theme.spacing(2),
		height: 90,
		position: "relative",
		border: data.free ? `1px solid ${theme.palette.success.light}` : data.isLock ? `1px solid ${theme.palette.secondary.light}` : null,
		borderRadius: theme.shape.borderRadius * 1.5,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(),
		transition: 'all 0.3s ease',
		boxShadow: data.free ? '0 4px 8px rgba(0, 200, 83, 0.15)' : data.isLock ? '0 4px 8px rgba(233, 30, 99, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
		'&:hover': {
			transform: 'translateY(-3px)',
			boxShadow: data.free ? '0 6px 12px rgba(0, 200, 83, 0.2)' : data.isLock ? '0 6px 12px rgba(233, 30, 99, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.15)',
		},
	},
	[`& .${testCardClasses.trans}`]: {
		transform: !data.free && !data.isLock && "translateY(40%)",
		[theme.breakpoints.down("xs")]: {
			transform: data.isReport ? "translateY(-10%)" : !data.isLock && !data.free ? "translateY(5%)" : !data.isLock ? "translateY(-30%)" : null,
		},
	},
	[`& .${testCardClasses.cross}`]: {
		left: "-2.5em",
		top: "0.9em",
		fontSize: "10px",
		lineHeight: 1.5,
		textAlign: "center",
		width: "8em",
		height: "2.5em",
		color: "#fff",
		position: "absolute",
		transform: "rotate(-45deg)",
		background: data.free 
			? `linear-gradient(45deg, ${theme.palette.success.main} 17%, ${theme.palette.success.dark} 70%)`
			: `linear-gradient(45deg, ${theme.palette.secondary.main} 17%, ${theme.palette.secondary.dark} 70%)`,
		boxShadow: data.free 
			? '0 2px 4px rgba(0, 200, 83, 0.3)' 
			: '0 2px 4px rgba(233, 30, 99, 0.3)',
		zIndex: 1,
		fontWeight: 'bold',
	},
	[`& .${testCardClasses.badge}`]: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		padding: '2px 8px',
		borderRadius: theme.shape.borderRadius,
		fontSize: '0.7rem',
		fontWeight: 'bold',
		color: theme.palette.getContrastText(data.free ? theme.palette.success.main : theme.palette.secondary.main),
		background: data.free 
			? theme.palette.success.main 
			: theme.palette.secondary.main,
		zIndex: 1,
	},
	[`& .${testCardClasses.examIcon}`]: {
		width: 32,
		height: 32,
		marginRight: theme.spacing(2),
		objectFit: 'contain',
	},
	[`& .${testCardClasses.righBnr}`]: {
		fontSize: "10px",
		width: "fit-content",
		right: 0,
		letterSpacing: 1,
		lineHeight: 1.5,
		padding: "0px 5px",
		float: "right",
		borderRadius: "3px",
		color: "#fff",
		background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
	},
	[`& .${testCardClasses.mob}`]: {
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	[`& .${testCardClasses.botmBtn}`]: {
		background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
		color: theme.palette.primary.contrastText,
		borderRadius: 10,
		padding: "2px 10px",
		fontSize: 12,
		letterSpacing: 1,
		width: "fit-content",
	},
}));

function TestCard({ data, serieslink }) {
	const { state } = useContext(MainContext);

	return (
		<StyledTestCard className={testCardClasses.freeCard} data={data} elevation={1}>
			{(data.free || data.isLock) && (
				<div className={testCardClasses.cross}>{data.free ? "Free" : "Locked"}</div>
			)}
			{(data.type) && (
				<div className={testCardClasses.badge}>{data.type}</div>
			)}
			<Grid container alignItems="center">
				<Grid size={{xs: 12, sm: 6}}>
					<ListItem style={{ marginLeft: 15 }}>
						{data.icon && <img alt={data.testName} className={testCardClasses.examIcon} src={data.icon} />}
						<ListItemText
							primary={<Typography variant="subtitle1" fontWeight="medium">{data.testName}</Typography>}
							secondary={
								data.totalQuestion 
									? <Typography variant="body2" color="textSecondary">{`${data.totalQuestion} Ques | ${data.totalMarks} marks | ${data.totalTime} min`}</Typography>
									: <Typography variant="body2" color="error">Details not available</Typography>
							}
						/>
					</ListItem>
				</Grid>
				<span style={{ flexGrow: 0.1 }} />
				<Grid size={{xs: 12, sm: 5}}>
					<Grid container spacing={1} className={testCardClasses.trans}>
						{data.isReport ? (
							<Grid item>
								<Link to={`/test/${serieslink}/${data.testLink}/report`} style={{ textDecoration: 'none' }}>
									<Button 
										endIcon={<FcComboChart />} 
										variant="outlined" 
										color="primary" 
										size="small"
										sx={{ fontWeight: 'medium' }}
									>
										View Report
									</Button>
								</Link>
							</Grid>
						) : (
							<>
								<Grid item>
									<Link to={data.isLock ? "/pricing" : `/test/${serieslink}/${data.testLink}/instruction`} style={{ textDecoration: 'none' }}>
										<Button
											startIcon={data.isLock && <FcLock />}
											endIcon={<FcKindle />}
											variant="contained"
											color={data.isLock ? "secondary" : "primary"}
											size="small"
											sx={{ fontWeight: 'medium' }}
										>
											{data.isLock ? "Unlock" : data.attempt > 0 ? "Re-Attempt" : "Start Now"}
										</Button>
									</Link>
								</Grid>
								
							</>
						)}
					</Grid>
				</Grid>
			</Grid>
		</StyledTestCard>
	);
}

const features = [
	{ logo: i1, title: "Exam Interface", desc: "Interface is same as actual exam interface." },
	{ logo: i2, title: "Quality Questions", desc: "Selected question by experienced teacher & Toppers" },
	{ logo: i3, title: "Detail Analysis", desc: "Know your accuracy, percentile, weak & strong area." },
];
