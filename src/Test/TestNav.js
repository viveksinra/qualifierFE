import React, { useContext, useState, useEffect } from "react";
import { SETSECTION, MARKED, SAVENEXT, CLEARANS } from "../Components/Context/types";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import TestTimer from "../Components/Timer/TestTimer";
import { AppBar, Toolbar, Typography, Button, Divider, Paper, Tabs, Tab, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { MdArrowBack, MdArrowForward, MdFullscreen, MdFullscreenExit, MdReportProblem } from "react-icons/md";
import axios from "axios";
import { brandImage, brandText } from "../theme";
export const drawerWidth = 260;

const StyledSectionPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	position: "fixed",
	borderTopColor: "#fff",
	height: 45,
	top: 52,
	background: "#fcfdff",
	[theme.breakpoints.up("sm")]: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginRight: drawerWidth,
	},
}));

const StyledBottomAppBar = styled(AppBar)(({ theme }) => ({
	top: "auto",
	bottom: 0,
	[theme.breakpoints.up("sm")]: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginRight: drawerWidth,
	},
}));

const StyledNavButton = styled(Button)(({ theme }) => ({
	[theme.breakpoints.down("sm")]: {
		fontSize: 8,
	},
}));

const StyledMarkSpan = styled('span')(({ theme }) => ({
	color: "#fff",
	borderRadius: 10,
	padding: theme.spacing(0.2, 1),
	fontSize: 12,
	fontFamily: "sans-serif",
}));

const StyledQuestionNavContainer = styled('div')(({ theme }) => ({
	position: 'fixed',
	width: '100%',
	top: 102,
	height: 45,
	borderBottom: "1px solid #cde4f7",
	[theme.breakpoints.up("sm")]: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginRight: drawerWidth,
	},
}));

export function TestTopNav({ test }) {
	const { Tstate } = useContext(TestContext);
	const [fullSrn, setSrn] = useState(true);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	document.title = `${Tstate.testName} | Online Test - ${brandText.brandName} `;

	const handleScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setSrn(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
				setSrn(false);
			}
		}
	};

	return (
		<div>
			<AppBar position="fixed" elevation={test ? 0 : 3} style={{ backgroundColor: "rgb(255,255,255)" }}>
				<Toolbar variant="dense">
					<img
						style={{ maxHeight: 50 }}
						src={brandImage.logo}
						alt="Qualifier-logo"
						border="0"
					/>
					<span style={{ flexGrow: 0.1 }} />

					{!isSmallScreen && (
						<Typography style={{ flexGrow: 1 }} color="primary">
							{Tstate.loading ? "Test is Loading..." : Tstate.testName}
						</Typography>
					)}

					<span style={{ flexGrow: 0.7 }} />
					{!isSmallScreen && test && <TestTimer m={Tstate.totalTime} />}
					<span style={{ flexGrow: 0.2 }} />
					<Button
						variant="outlined"
						onClick={() => handleScreen()}
						startIcon={fullSrn ? <MdFullscreenExit /> : <MdFullscreen />}
						size="small"
						color="primary"
					>
						{fullSrn ? "Exit Full Screen" : "Full Screen"}
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export function IntroBNav({ loading, showGen, setInst, agree, TseriesLink, testLink }) {
	return (
		<StyledBottomAppBar position="fixed" color="default">
			<Toolbar variant="dense">
				{showGen ? (
					<>
						<Link to={`/test/${testLink}`}>
							<Button startIcon={<MdArrowBack />} size="small" variant="outlined" color="primary">
								Go To Tests
							</Button>
						</Link>
						<span style={{ flexGrow: 1 }} />
						<Button endIcon={<MdArrowForward />} disabled={loading} size="small" onClick={() => setInst(false)} variant="contained" color="primary">
							{loading ? "Loading Test..." : "Next"}
						</Button>
					</>
				) : (
					<>
						<Button startIcon={<MdArrowBack />} size="small" onClick={() => setInst(true)} variant="contained" color="primary">
							Back
						</Button>
						<span style={{ flexGrow: 0.5 }} />
						<Link to={agree ? `/test/${TseriesLink}/${testLink}/on` : "#"}>
							<Button endIcon={<MdArrowForward />} disabled={!agree} size="small" variant="contained" color="primary">
								Start Test NOW
							</Button>
						</Link>
					</>
				)}
			</Toolbar>
		</StyledBottomAppBar>
	);
}

export function TestBNav() {
	const { Tdispatch } = useContext(TestContext);
	const handleMark = () => {
		Tdispatch({ type: MARKED });
	};
	const handleSave = () => {
		Tdispatch({ type: SAVENEXT });
	};
	const handleClear = () => {
		Tdispatch({ type: CLEARANS });
	};
	useEffect(() => {
		if (!document.fullscreenElement) {
			document.documentElement &&
				document.documentElement.requestFullscreen().catch((err) => {
					console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
				});
		} else {
			document.exitFullscreen();
		}
	}, []);
	return (
		<StyledBottomAppBar position="fixed" color="default">
			<Toolbar variant="dense">
				<StyledNavButton size="small" onClick={handleMark} variant="contained" color="primary">
					Mark for Review & Next
				</StyledNavButton>
				<span style={{ flexGrow: 0.05 }} />
				<StyledNavButton onClick={handleClear} size="small" variant="outlined" color="primary">
					Clear Response
				</StyledNavButton>
				<span style={{ flexGrow: 1 }} />
				<StyledNavButton onClick={handleSave} endIcon={<MdArrowForward />} size="small" variant="contained" color="secondary">
					Save & Next
				</StyledNavButton>
			</Toolbar>
		</StyledBottomAppBar>
	);
}

export function SectionNav() {
	const { Tstate, Tdispatch } = useContext(TestContext);
	const changeSection = (v) => {
		return Tdispatch({ type: SETSECTION, payload: v });
	};
	return (
		<StyledSectionPaper elevation={2}>
			<div style={{ display: "flex", alignItems: "center", paddingLeft: 15, paddingRight: 15 }}>
				<Typography variant="caption">SECTIONS </Typography>
				<Divider orientation="vertical" flexItem style={{ height: 30, marginLeft: 20, marginRight: 20, marginTop: 7.5 }} />
				{Tstate.sections && (
					<Tabs variant="scrollable" textColor="secondary" value={Tstate.activeSection} onChange={(e, v) => changeSection(v)}>
						{Tstate.sections.map((s, i) => (
							<Tab label={s.title} key={i} value={s.title} />
						))}
					</Tabs>
				)}
			</div>
		</StyledSectionPaper>
	);
}

export function QuestionNav({ qNo, qId, marks }) {
	const [rMenu, setMenu] = useState(null);

	const handleReport = (issue) => {
		axios
			.post("/api/private/qreport", { questionId: qId, issue })
			.then((res) => alert(res.data.message))
			.catch((err) => console.log(err));
		setMenu(null);
	};
	return (
		<StyledQuestionNavContainer>
			<Toolbar variant="dense">
				<Typography variant="body2">
					<b>Question No. {qNo} </b>
				</Typography>
				<span style={{ flexGrow: 1 }} />
				<div style={{ display: "flex", flexDirection: "column", marginTop: -8 }}>
					<Typography variant="caption">Marks</Typography>
					<span>
						<StyledMarkSpan style={{ background: "#27ae60" }}>
							+{marks && marks.correct}
						</StyledMarkSpan>
						{"\u00A0"}
						<StyledMarkSpan style={{ background: "#c0392b" }}>
							-{marks && marks.incorrect}
						</StyledMarkSpan>
					</span>
				</div>
				<span style={{ flexGrow: 0.06 }} />
				<Button size="small" variant="text" onClick={(e) => setMenu(e.currentTarget)} startIcon={<MdReportProblem />}>
					Report
				</Button>
				<Menu id="simple-menu" anchorEl={rMenu} open={Boolean(rMenu)} onClose={() => setMenu(null)}>
					<MenuItem onClick={() => handleReport("Wrong Question")}>Wrong Question</MenuItem>
					<MenuItem onClick={() => handleReport("Wrong Answer")}>Wrong Answer</MenuItem>
					<MenuItem onClick={() => handleReport("Formating Issue")}>Formating Issue</MenuItem>
					<MenuItem onClick={() => handleReport("Other")}>Other Problem</MenuItem>
				</Menu>
			</Toolbar>
		</StyledQuestionNavContainer>
	);
}
