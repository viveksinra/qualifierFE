import React, { lazy, Suspense } from "react";
import { Nav } from "../../Components/Navigation/Nav";
import { Grid, LinearProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import HomeSlider from "../../Components/Decoration/HomeSlider";
import { OfferCard } from "../../Components/Decoration/OfferCard";
import { FcReading, FcInspection, FcGraduationCap, FcCollaboration } from "react-icons/fc";
const MyDrawer = lazy(() => import("../../Components/Navigation/MyDrawer"));
const UserChart = lazy(() => import("./UserChart"));
const ResumeList = lazy(() => import("./ResumeList"));
const CourseAnalysis = lazy(() => import("../../Website/CourseDetails/CourseAnalysis"));
const Recommendation = lazy(() => import("../../Components/Recommendation"));

const PREFIX = 'UserDashboard';
const classes = {
	root: `${PREFIX}-root`,
	toolbar: `${PREFIX}-toolbar`,
	content: `${PREFIX}-content`,
	navBtn: `${PREFIX}-navBtn`,
	iCover: `${PREFIX}-iCover`
};

const StyledRoot = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		display: "flex",
	},
	[`& .${classes.toolbar}`]: theme.mixins.toolbar,
	[`& .${classes.content}`]: {
		flexGrow: 1,
		padding: theme.spacing(),
	},
	[`& .${classes.navBtn}`]: {
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
	[`& .${classes.iCover}`]: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		fontSize: "small",
	},
}));

export default function UserDashboard() {
	document.title = "Dashboard | Qualifier : Online Test Series & Practice - Railway, SSC, Banking, Placement & CBSE Exams.";

	return (
		<StyledRoot className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container>
					<Grid item size={{xs: 12, md:8 }}  style={{ maxHeight: 300 }}>
						<Suspense fallback={<LinearProgress />}>
							<HomeSlider />
						</Suspense>
					</Grid>
					<Grid item size={{xs: 12, md:4}} style={{ height: 300 }}>
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
					<Grid container justifyContent="center">
						<Grid item size={{xs: 12, md:8 }}  className="center">
							<UserChart />
						</Grid>
						<Grid item size={{xs: 12, md:4}} className="center">
							<OfferCard />
						</Grid>
					</Grid>
				</Suspense>
			</main>
		</StyledRoot>
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
