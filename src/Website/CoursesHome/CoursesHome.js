import React, { Fragment, Suspense } from "react";
import { styled, Paper, Container, Fab, CircularProgress } from "@mui/material";
import CourseList from "./CourseList";
import { FullNav, HideOnScroll } from "../../Components/Navigation/Nav";
import Footer from "../../Components/Footer/Footer";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { isQualifier } from "../../theme";

const TopSection = styled('div')(({ theme }) => ({
	position: "absolute",
	width: "100%",
	maxHeight: "80vh",
	background: "linear-gradient(to top, rgba(171,230,85,0.7066176812521884) 0%, rgba(85,230,226,0.706617) 100%)",
	linearGradient: "(230deg, #f533d4, #2461bb)",
}));

const SkewedBg = styled('div')(({ theme }) => ({
	position: "absolute",
	bottom: "-100%",
	left: 0,
	width: "100%",
	height: "100%",
	background: "#fff",
	transform: "skewY(-10deg)",
	transformOrigin: "top left",
}));

const CourseContainer = styled(Container)(({ theme }) => ({
	marginTop: "20vh",
	position: "relative",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	borderRadius: "20px",
	padding: "20px",
}));

function CoursesHome() {
	document.title = "Course List - | " +  isQualifier ? "Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE" : "Risk Hawk : Test Platform";

	const particlesInit = async (engine) => {
		await loadFull(engine);
	};

	return (
		<Fragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<TopSection>
				<SkewedBg />
				<Particles 
					init={particlesInit}
					options={{
						particles: {
							number: {
								value: 80,
								density: {
									enable: true,
									value_area: 800
								}
							}
						}
					}}
				/>
			</TopSection>
			<div style={{ display: "flex", position: "absolute", marginTop: "4%", width: "100%", justifyContent: "center" }}>
				<Fab color="primary" variant="extended" size="medium">
					Course Collection
				</Fab>
			</div>

			<CourseContainer>
				<StyledPaper elevation={4}>
					<Suspense
						fallback={
							<div style={{ display: "flex", alignItems: "center", height: 500, justifyContent: "center" }}>
								<CircularProgress />
							</div>
						}
					>
						<CourseList />
					</Suspense>
				</StyledPaper>
			</CourseContainer>

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
