import React, { Suspense, lazy } from "react";
import TopTray from "../../Components/Decoration/TopTray";
import { CircularProgress, Fab, Hidden } from "@mui/material";
import { FullNav } from "../../Components/Navigation/Nav";
import lp from "./lp.png";
import { Head } from "../../Components/NameExp";
import { FcElectricalSensor } from "react-icons/fc";
import { styled } from '@mui/material/styles';
const SeriesList = lazy(() => import("./SeriesList"));
const Features2 = lazy(() => import("../../Components/Decoration/Features2"));
const Footer = lazy(() => import("../../Components/Footer/Footer"));

const PREFIX = 'TestSeries';
const classes = {
	testTop: `${PREFIX}-testTop`,
	topText: `${PREFIX}-topText`,
	smallText: `${PREFIX}-smallText`,
	topImg: `${PREFIX}-topImg`
};

const StyledDiv = styled('div')(({ theme }) => ({
	[`& .${classes.testTop}`]: {
		background: "rgba(66,142,218,1)",
		marginTop: -50,
		[theme.breakpoints.up("sm")]: {
			height: 530,
		},
	},
	[`& .${classes.topText}`]: {
		marginBotom: 50,
		paddingTop: 110,
		marginTop: 50,
		lineHeight: 0.4,
		paddingLeft: "10%",
		color: "#fff",
		"& p": {
			fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
			lineHeight: 1.5,
		},
		"& h1": {
			fontWeight: 300,
			fontSize: 42,
			lineHeight: 1.1,
			paddingBottom: "8px",
		},
		"& button": {
			background: "#48DE75",
			color: "#fff",
		},
		"& button:hover": {
			background: "#25dd25",
		},
		"& button svg": {
			marginRight: theme.spacing(1),
			fontSize: 25,
		},
		[theme.breakpoints.down("sm")]: {
			textAlign: "center",
			padding: "50px 6px 20px",
			"& h1": {
				fontWeight: 300,
				fontSize: 34,
				lineHeight: 1.1,
			},
			"& p": {
				lineHeight: 1,
			},
		},
	},
	[`& .${classes.smallText}`]: {
		marginLeft: 25,
		paddingTop: 5,
		fontSize: 12,
	},
	[`& .${classes.topImg}`]: {
		width: 1000,
		height: 510,
		position: "absolute",
		top: 125,
		right: "10%",
	},
}));

function TestSeries() {
	const scrollDown = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#bundle");
		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<StyledDiv>
			<Head>
				<title>
					Online Test Series | Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE
				</title>
				<meta
					name="description"
					content="Online Test Series | Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FRE. Specialy on Qualifier.co.in"
				/>
			</Head>
			<TopTray />
			<FullNav />
			<div className={classes.testTop}>
				<div className={classes.topText}>
					<h1>
						One place to Test your Knowledge
						<br /> as well as boost your skill.
					</h1>
					<p>Solve exam related questions with real interface.</p>
					<p>Upgrade your skill, improve confidence in real exam!</p>
					<br />
					<br />
					<Fab size="medium" variant="extended" onClick={scrollDown} aria-label="add">
						<FcElectricalSensor />
						Start Test Now
					</Fab>

					<p className={classes.smallText}>*Free & Simple, no hidden cost.</p>
				</div>
			</div>
			<Hidden mdDown>
				<img src={lp} className={classes.topImg} alt="Laptop" />
			</Hidden>
			<Suspense
				fallback={
					<div className="center">
						<CircularProgress />
					</div>
				}
			>
				<div id="bundle">
					<SeriesList />
				</div>
				<Suspense fallback={<CircularProgress />}>
					<Features2 />
					<Footer />
				</Suspense>
			</Suspense>
		</StyledDiv>
	);
}

export default TestSeries;
