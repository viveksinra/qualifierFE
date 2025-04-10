import React, { Suspense, lazy, Component } from "react";
import { CircularProgress, Fab, useMediaQuery, Alert, Box, Button, Typography } from "@mui/material";
import { FullNav } from "../../Components/Navigation/Nav";
import lp from "./lp.png";
import rlp from "./rlp.png";
import { Head } from "../../Components/NameExp";
import { FcElectricalSensor } from "react-icons/fc";
import { alpha, styled, useTheme } from '@mui/material/styles';
import { isQualifier } from "../../theme";
const SeriesList = lazy(() => import("./SeriesList"));
const Features2 = lazy(() => import("../../Components/Decoration/Features2"));
const Footer = lazy(() => import("../../Components/Footer/Footer"));

// Error Boundary component to catch errors in children components
class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<Box sx={{ p: 4, textAlign: 'center' }}>
					<Alert severity="error" sx={{ mb: 2 }}>
						Something went wrong loading the test series.
					</Alert>
					<Button 
						variant="contained" 
						color="primary" 
						onClick={() => {
							this.setState({ hasError: false });
							window.location.reload();
						}}
					>
						Retry
					</Button>
				</Box>
			);
		}
		return this.props.children;
	}
}

// Loading fallback component with retry option
const LoadingFallback = () => (
	<Box sx={{ p: 4, textAlign: 'center' }}>
		<CircularProgress sx={{ mb: 2 }} />
		<Typography variant="body2" color="textSecondary">
			Loading test series...
		</Typography>
	</Box>
);

const PREFIX = 'TestSeries';
const classes = {
	testTop: `${PREFIX}-testTop`,
	topText: `${PREFIX}-topText`,
	smallText: `${PREFIX}-smallText`,
	topImg: `${PREFIX}-topImg`,
	startTestBtn: `${PREFIX}-startTestBtn`
};

const StyledDiv = styled('div')(({ theme }) => ({
	[`& .${classes.testTop}`]: {
		background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.7)})`,
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
	[`& .${classes.startTestBtn}`]: {
	
		backgroundColor: alpha(theme.palette.primary.main, 0.8),
		color: "#fff",
		"&:hover": {
			backgroundColor: alpha(theme.palette.primary.main, 0.6),
		},
	},
}));

function TestSeries() {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	
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
					<Fab size="medium" variant="extended" onClick={scrollDown} aria-label="add" className={classes.startTestBtn}>
						<FcElectricalSensor />
						Take the Test Now
					</Fab>

					<p className={classes.smallText}>*Free & Simple, no hidden cost.</p>
				</div>
			</div>
			{isDesktop && (
				<img src={isQualifier ? lp : rlp} className={classes.topImg} alt="Laptop" />
			)}
			<Suspense
				fallback={<LoadingFallback />}
			>
				<div id="bundle">
					<ErrorBoundary>
						<SeriesList />
					</ErrorBoundary>
				</div>
				<Suspense fallback={<LoadingFallback />}>
					<Features2 />
					<Footer />
				</Suspense>
			</Suspense>
		</StyledDiv>
	);
}

export default TestSeries;
