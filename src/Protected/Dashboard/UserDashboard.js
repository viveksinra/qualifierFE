import React, { lazy, Suspense } from "react";
import { Nav } from "../../Components/Navigation/Nav";
import { makeStyles, Grid, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import HomeSlider from "../../Components/Decoration/HomeSlider";
import { OfferCard } from "../../Components/Decoration/OfferCard";
import { FcReading, FcInspection, FcGraduationCap, FcCollaboration } from "react-icons/fc";
const MyDrawer = lazy(() => import("../../Components/Navigation/MyDrawer"));
const UserChart = lazy(() => import("./UserChart"));
const ResumeList = lazy(() => import("./ResumeList"));
const CourseAnalysis = lazy(() => import("../../Website/CourseDetails/CourseAnalysis"));
const Recommendation = lazy(() => import("../../Components/Recommendation"));

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(),
	},
	navBtn: {
		borderRadius: "20px",
		marginTop: 5,
		maxWidth: "95%",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		boxShadow: "-6px -6px 25px rgba(255,255,255,1), 6px 6px 25px rgba(0,0,0,0.2)",
		padding: 5,
		height: 80,
	},
	iCover: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		fontSize: "small",
	},
}));

export default function UserDashboard() {
	const classes = useStyles();
	document.title = "Dashboard | Qualifier : Online Test Series & Practice - Railway, SSC, Banking, Placement & CBSE Exams.";

	return (
		<div className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container>
					<Grid item xs={12} md={8} style={{ maxHeight: 300 }}>
						<Suspense fallback={<LinearProgress />}>
							<HomeSlider />
						</Suspense>
					</Grid>
					<Grid item xs={12} md={4} style={{ height: 300 }}>
						<div style={{ minHeight: 180 }}>
							<Suspense fallback={<LinearProgress />}>
								<ResumeList />
							</Suspense>
						</div>
						<div className={classes.navBtn}>
							{navBtn.map((n, i) => (
								<Link to={n.link} key={i}>
									<span className={classes.iCover}>
										{n.icon} {n.text}
									</span>
								</Link>
							))}
						</div>
					</Grid>
				</Grid>
				<Suspense fallback={<LinearProgress />}>
					<Recommendation />
				</Suspense>
				<Suspense fallback={<LinearProgress />}>
					<CourseAnalysis link="" />
					<br />
					<Grid container justify="center">
						<Grid item xs={12} md={8} className="center">
							<UserChart />
						</Grid>
						<Grid item xs={12} md={4} className="center">
							<OfferCard />
						</Grid>
					</Grid>
				</Suspense>
			</main>
		</div>
	);
}

const navBtn = [
	{
		icon: <FcInspection style={{ fontSize: 25 }} />,
		text: "Test Series",
		link: "/online-test-series",
	},
	{
		icon: <FcGraduationCap style={{ fontSize: 25 }} />,
		text: "Practice",
		link: "/practice",
	},
	{
		icon: <FcReading style={{ fontSize: 25 }} />,
		text: "Blog & News",
		link: "/blog",
	},
	{
		icon: <FcCollaboration style={{ fontSize: 25 }} />,
		text: "Share & Earn",
		link: "/profile",
	},
];
// {
// 	 <UserChart />

// }
