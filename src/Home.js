import React, { Fragment, useContext, lazy, Suspense } from "react";
import "./App.css";
import { DRAWER } from "./Components/Context/types";
import bg from "./img/topbg.svg";
import { HideOnScroll, FullNav } from "./Components/Navigation/Nav";
import { MainContext } from "./Components/Context/MainContext";
import { Link } from "react-router-dom";
import SpeedNav from "./Components/Navigation/SpeedNav";
import { makeStyles, Grid, Typography, Fab, Avatar, Chip, IconButton, Hidden, CircularProgress } from "@material-ui/core";
import { FaAngleDown, FaUserCircle, FaArrowAltCircleRight, FaBars } from "react-icons/fa";
import { Head, Typewriter } from "./Components/NameExp";
const DataCard = lazy(() => import("./Components/DataCard/DataCard"));
const Categories = lazy(() => import("./Components/Categories/Categories"));
const MegaMenu = lazy(() => import("./Components/Navigation/MegaMenu"));
const Features2 = lazy(() => import("./Components/Decoration/Features2"));
const Features = lazy(() => import("./Components/Decoration/Features"));
const Testimonial = lazy(() => import("./Components/Testimonial"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const Particles = lazy(() => import("react-particles-js"));

const appStyles = makeStyles((theme) => ({
	hero: {
		backgroundImage: `url(${bg})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 35%",
		backgroundSize: "cover",
		height: "105vh",
		[theme.breakpoints.down("md")]: {
			height: "60vh",
		},
	},
	mobBtn: {
		position: "absolute",
		display: "flex",
		flexDirection: "column",
		top: "50vh",
		height: 70,
		right: 10,
		alignItems: "center",
		justifyContent: "space-around",
	},
	textBox: {
		position: "absolute",
		bottom: "5%",
		minWidth: 380,
		right: "16%",
	},
}));

function Home(props) {
	const classes = appStyles();

	return (
		<Fragment>
			<Head>
				<title>Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE </title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="keywords" content="Qualifier, online test & practice, online test for student." />
				<meta name="copyright" content="Softechinfra" />
				<meta name="robots" content="follow" />
				<meta
					name="description"
					content="An online TEST, Practice & Learning platform for Indian school and college Students including Government Exams, Placement Papers & CBSC Exams and much more. Try Qualifier FOR FREE."
				/>
			</Head>
			<HideOnScroll {...props}>
				<FullNav />
			</HideOnScroll>

			<div className={classes.hero}>
				<Suspense fallback={null}>
					<AppNav />
				</Suspense>
				<Suspense fallback={null}>
					<Particles height="500px" />
				</Suspense>
				<Hidden smUp>
					<div className={classes.mobBtn}>
						<Link to="/practice">
							<Chip size="small" color="primary" variant="outlined" label="Online Exam Practice" />
						</Link>
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
					</div>
				</Hidden>
				<Hidden mdDown>
					<div className={classes.textBox}>
						<Grid container justify="center" direction="column" alignItems="center">
							<Typewriter
								options={{
									strings: ["Lots to Study.", "Less to spend. ", "Practice for FREE"],
									autoStart: true,
									loop: true,
									wrapperClassName: "typewriter",
									cursorClassName: "typewriter",
								}}
							/>
							<br />
							<Typography paragraph color="secondary" align="center">
								Practice for your examination for <b>FREE</b>
								<br /> And enhance your Knowledge...
							</Typography>

							<span>
								<Link to="/practice">
									<Fab variant="extended" size="large" color="primary" aria-label="quote">
										Practice
									</Fab>
								</Link>
								{"\u00A0"}
								{"\u00A0"}
								{"\u00A0"}
								<Link to="/online-test-series">
									<Fab variant="extended" size="large" aria-label="quote" color="secondary">
										TEST SERIES
									</Fab>
								</Link>
							</span>

							<br />
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
									label="Qualifiers has international platform."
								/>
							</Link>
						</Grid>
					</div>
				</Hidden>
			</div>
			<SpeedNav />
			<Suspense fallback={<CircularProgress />}>
				<DataCard />
				<Categories />

				<Suspense fallback={<CircularProgress />}>
					<Features2 />
					<Features />
					<Testimonial />
				</Suspense>
				<Footer />
			</Suspense>
		</Fragment>
	);
}

export default Home;

const navStyles = makeStyles((theme) => ({
	appNav: {
		flexDirection: "row-reverse",
		paddingTop: 10,
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
			paddingTop: 0,
		},
	},

	ul: {
		float: "right",
	},
	li: {
		listStyle: "none",
		display: "inline-block",
		fontSize: "1.3rem",
		paddingRight: "1.2rem",
	},
	liLink: {
		textDecoration: "none",
		color: "#fff",
		"&:hover": {
			color: "#45C712",
		},
	},
	logoMob: {
		[theme.breakpoints.down("sm")]: {
			backgroundColor: "rgb(241, 241, 241)",
			width: 150,
			borderRadius: 5,
			padding: 5,
			height: 40,
		},
	},
}));

function AppNav() {
	const classes = navStyles();
	const { dispatch } = useContext(MainContext);
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};

	return (
		<Grid container justify="space-around" alignItems="center" className={classes.appNav}>
			<div className={classes.logoMob}>
				<img src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg" id="logo" alt="Qualifier-logo" />
			</div>

			<span style={{ flexGrow: 0.7 }} />
			<Hidden mdUp>
				<IconButton onClick={handleDrawerToggle} edge="start" color="primary" aria-label="menu">
					<FaBars />
				</IconButton>
			</Hidden>
			<Hidden smDown>
				<ul className={classes.ul}>
					<li className={classes.li}>
						<MegaMenu>
							<span style={{ display: "flex", alignItems: "center", color: "#fff" }}>
								Exam
								{"\u00A0"}
								<FaAngleDown />
							</span>
						</MegaMenu>
					</li>
					<li className={classes.li}>
						<Link to="/practice" className={classes.liLink}>
							Practice
						</Link>
					</li>
					<li className={classes.li}>
						<Link to="/online-test-series" className={classes.liLink}>
							Test Series
						</Link>
					</li>
					<li className={classes.li}>
						<Link to="/pricing" className={classes.liLink}>
							Pricing
						</Link>
					</li>
					<li className={classes.li}>
						<Link to="/blog" className={classes.liLink}>
							Blog & News
						</Link>
					</li>
					<li className={classes.li}>
						<Link to="/login" className={classes.liLink}>
							Login/Signup
						</Link>
					</li>
				</ul>
			</Hidden>
		</Grid>
	);
}
