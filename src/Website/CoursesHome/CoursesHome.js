import React, { Fragment, Suspense } from "react";
import { makeStyles, Paper, Container, Fab, CircularProgress } from "@material-ui/core";
import CourseList from "./CourseList";
import { FullNav, HideOnScroll } from "../../Components/Navigation/Nav";
import Footer from "../../Components/Footer/Footer";
import Particles from "react-particles-js";

const useStyles = makeStyles((theme) => ({
	topSection: {
		position: "absolute",
		width: "100%",
		maxHeight: "80vh",
		background: "linear-gradient(to top, rgba(171,230,85,0.7066176812521884) 0%, rgba(85,230,226,0.706617) 100%)",
		linearGradient: "(230deg, #f533d4, #2461bb)",
	},
	skewed: {
		position: "absolute",
		bottom: "-100%",
		left: 0,
		width: "100%",
		height: "100%",
		background: "#fff",
		transform: "skewY(-10deg)",
		transformOrigin: "top left",
	},
	courseContainer: {
		marginTop: "20vh",
		position: "relative",
	},
	paper: {
		borderRadius: "20px",
		padding: "20px",
	},
}));

function CoursesHome() {
	const classes = useStyles();
	document.title = "Course List - Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";

	return (
		<Fragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<div className={classes.topSection}>
				<div className={classes.skewed}></div>
				<Particles />
			</div>
			<div style={{ display: "flex", position: "absolute", marginTop: "4%", width: "100%", justifyContent: "center" }}>
				<Fab color="primary" variant="extended" size="medium">
					Course Collection
				</Fab>
			</div>

			<Container className={classes.courseContainer}>
				<Paper elevation={4} className={classes.paper}>
					<Suspense
						fallback={
							<div style={{ display: "flex", alignItems: "center", height: 500, justifyContent: "center" }}>
								<CircularProgress />
							</div>
						}
					>
						<CourseList />
					</Suspense>
				</Paper>
			</Container>

			<br />
			<br />
			<br />
			<br />
			<div style={{ position: "relative" }}>
				<Footer />
			</div>
		</Fragment>
	);
}
export default CoursesHome;
