// TODO:Risk Hawk Silent code
import React, { Fragment, useContext, lazy, Suspense } from "react";
import "./App.css";
import { DRAWER } from "./Components/Context/types";
import bg from "./img/topbg.svg";
import bgRH from "./img/topbgRH.svg";
import { HideOnScroll, FullNav } from "./Components/Navigation/Nav";
import { MainContext } from "./Components/Context/MainContext";
import { Link } from "react-router-dom";
import SpeedNav from "./Components/Navigation/SpeedNav";
import { Grid, Typography, Fab, Avatar, Chip, IconButton, CircularProgress, useMediaQuery } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { FaAngleDown, FaArrowAltCircleRight, FaBars } from "react-icons/fa";
import { Head, Typewriter } from "./Components/NameExp";
import { brandImage, isQualifier } from "./theme";
const DataCard = lazy(() => import("./Components/DataCard/DataCard"));
const Categories = lazy(() => import("./Components/Categories/Categories"));
const MegaMenu = lazy(() => import("./Components/Navigation/MegaMenu"));
const Features2 = lazy(() => import("./Components/Decoration/Features2"));
const Features = lazy(() => import("./Components/Decoration/Features"));
const Testimonial = lazy(() => import("./Components/Testimonial"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const Particles = lazy(() => import("react-tsparticles"));

const StyledHeroDiv = styled('div')(({ theme }) => ({
	backgroundImage: `url(${bg})`,
	backgroundRepeat: "no-repeat",
	backgroundPosition: "50% 35%",
	backgroundSize: "cover",
	height: "105vh",
	[`@media (max-width:${theme.breakpoints.values.md}px)`]: {
		height: "60vh",
	},
}));

const StyledMobBtnDiv = styled('div')(({ theme }) => ({
	position: "absolute",
	display: "flex",
	flexDirection: "column",
	top: "50vh",
	height: 70,
	right: 10,
	alignItems: "center",
	justifyContent: "space-around",
}));

const StyledTextBoxDiv = styled('div')(({ theme }) => ({
	position: "absolute",
	bottom: "5%",
	minWidth: 380,
	right: "16%",
}));

const StyledAppNavGrid = styled(Grid)(({ theme }) => ({
	flexDirection: "row-reverse",
	paddingTop: 10,
	[`@media (min-width:${theme.breakpoints.values.md}px)`]: {
		flexDirection: "row",
		paddingTop: 0,
	},
}));

const StyledUl = styled('ul')(({ theme }) => ({
	float: "right",
}));

const StyledLi = styled('li')(({ theme }) => ({
	listStyle: "none",
	display: "inline-block",
	fontSize: "1.3rem",
	paddingRight: "1.2rem",
}));

const StyledLiLink = styled(Link)(({ theme }) => ({
	textDecoration: "none",
	color: "#fff",
	"&:hover": {
		color: "#45C712",
	},
}));

const StyledLogoMobDiv = styled('div')(({ theme }) => ({
	[`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
		backgroundColor: "rgb(241, 241, 241)",
		width: 150,
		borderRadius: 5,
		padding: 5,
		height: 40,
	},
}));

function AppNav() {

	const { state,dispatch } = useContext(MainContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};

	return (
		<StyledAppNavGrid container justifyContent="space-around" alignItems="center">
			<StyledLogoMobDiv>
				<img src={brandImage.logo} id="logo" alt="Qualifier-logo" />
			</StyledLogoMobDiv>

			<span style={{ flexGrow: 0.7 }} />
			{isMobile && (
				<IconButton onClick={handleDrawerToggle} edge="start" color="primary" aria-label="menu">
					<FaBars />
				</IconButton>
			)}
			{isDesktop && (
				<StyledUl>
				{isQualifier &&	<StyledLi>
						<MegaMenu>
							<span style={{ display: "flex", alignItems: "center", color: "#fff" }}>
								Exam
								{"\u00A0"}
								<FaAngleDown />
							</span>
						</MegaMenu>
					</StyledLi>}
				{isQualifier &&	<StyledLi>
						<StyledLiLink to="/practice">
							Practice
						</StyledLiLink>
					</StyledLi>}
					<StyledLi>
						<StyledLiLink to="/online-test-series">
							Test Series
						</StyledLiLink>
					</StyledLi>
				{isQualifier && <>	<StyledLi>
						<StyledLiLink to="/pricing">
							Pricing
						</StyledLiLink>
					</StyledLi>
					<StyledLi>
						<StyledLiLink to="/blog">
							Blog & News
						</StyledLiLink>
					</StyledLi></>}
					<StyledLi>
						<StyledLiLink to="/login">
						{state.isAuthenticated ? "Dashboard" : "Login/Signup"}
						</StyledLiLink>
					</StyledLi>
				</StyledUl>
			)}
		</StyledAppNavGrid>
	);
}

function Home(props) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Fragment>
			<Head>
				<title>{isQualifier ? "Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE" : "Risk Hawk : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE"}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="keywords" content={isQualifier ? "Qualifier, online test & practice, online test for student." : "Risk Hawk, online test & practice, online test for student."} />
				<meta name="copyright" content={isQualifier ? "Softechinfra" : "Risk Hawk"} />
				<meta name="robots" content="follow" />
				<meta
					name="description"
					content={isQualifier ? "An online TEST, Practice & Learning platform for Indian school and college Students including Government Exams, Placement Papers & CBSC Exams and much more. Try Qualifier FOR FREE." : "An online TEST, Practice & Learning platform. Try Risk Hawk FOR FREE."}	
				/>
			</Head>
			<HideOnScroll {...props}>
				<FullNav />
			</HideOnScroll>

			<StyledHeroDiv>
				<Suspense fallback={null}>
					<AppNav />
				</Suspense>
				<Suspense fallback={null}>
					<Particles height="500px" options={{
						fpsLimit: 60,
						particles: {
							color: {
								value: "#000000"
							},
							links: {
								enable: true,
								color: "#000000",
								distance: 150
							},
							move: {
								enable: true,
								speed: 2
							}
						}
					}} />
				</Suspense>
				{isMobile && (
					<StyledMobBtnDiv>
					{isQualifier &&	<Link to="/practice">
							<Chip size="small" color="primary" variant="outlined" label="Online Exam Practice" />
						</Link>}
						<Link to="/online-test-series">
							<Chip
								size="small"
								avatar={
									<Avatar
										variant="rounded"
										style={{ width: "30px", color: "#fff", background: "linear-gradient(45deg,#72d042 17%,#25cc71 70%)", borderRadius: "10px" }}
									>
										FREE
									</Avatar>
								}
								color="primary"
								onDelete={() => null}
								deleteIcon={<FaArrowAltCircleRight />}
								label="Test Series"
							/>
						</Link>
					</StyledMobBtnDiv>
				)}
				{isDesktop && (
					<StyledTextBoxDiv>
						<Grid container direction="column" alignItems="center" justifyContent="center">
							<Typewriter
								options={{
									strings: isQualifier ? ["Lots to Study.", "Less to spend. ", "Practice for FREE"] : ["Easy to use", "Mobile Friendly"],
									autoStart: true,
									loop: true,
									wrapperClassName: "typewriter",
									cursorClassName: "typewriter",
								}}
							/>
							<br />
						{isQualifier ?	<Typography paragraph color="secondary" align="center">
									Practice for your examination for <b>FREE</b>
									 <br /> And enhance your Knowledge...
								
							</Typography> : 
							<Typography paragraph color="secondary" align="center">
			Give the Test Series a try by <b>Risk Hawk</b>
								
							</Typography>
							}

							<span>
					{isQualifier &&	<Link to="/practice">
									<Fab variant="extended" size="large" color="secondary" aria-label="quote">
										Practice
									</Fab>
								</Link>}
								{"\u00A0"}
								{"\u00A0"}
								{"\u00A0"}
								<Link to="/online-test-series">
									<Fab variant="extended" size="large" aria-label="quote" color="primary">
										{isQualifier ? "TEST SERIES" : "Go To Test Series"}
									</Fab>
								</Link>
							</span>

							{/* <br />
							<Link to="/blog">
								<Chip
									size="small"
									avatar={
										<Avatar
											variant="rounded"
											style={{ width: "30px", color: "#fff", background: "linear-gradient(45deg,#72d042 17%,#25cc71 70%)", borderRadius: "10px" }}
										>
											New
										</Avatar>
									}
									color="primary"
									onDelete={() => null}
									deleteIcon={<FaArrowAltCircleRight />}
									label="Read Blogs"
								/>
							</Link> */}
						</Grid>
					</StyledTextBoxDiv>
				)}
			</StyledHeroDiv>
			<SpeedNav />
			<Suspense fallback={<CircularProgress />}>
				{isQualifier &&	<DataCard />}
				{isQualifier &&	<Categories />}
				{ isQualifier && <>	<Suspense fallback={<CircularProgress />}>
					<Features2 />
					<Features />
					 <Testimonial />
				</Suspense>
				</>}
				<Footer />
			</Suspense>
		</Fragment>
	);
}

export default Home;
