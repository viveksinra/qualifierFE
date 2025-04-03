import React, { useContext, useState, useEffect } from "react";
import { SETSECTION, MARKED, SAVENEXT, CLEARANS } from "../Components/Context/types";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import TestTimer from "../Components/Timer/TestTimer";
import { makeStyles, AppBar, Toolbar, Typography, Button, Hidden, Divider, Paper, Tabs, Tab, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdArrowBack, MdArrowForward, MdFullscreen, MdFullscreenExit, MdReportProblem } from "react-icons/md";
import axios from "axios";
export const drawerWidth = 260;

const navStyle = makeStyles((theme) => ({
	secNav: {
		width: "100%",
		position: "fixed",
		borderTopColor: "#fff",
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginRight: drawerWidth,
		},
	},
	mark: {
		color: "#fff",
		borderRadius: 10,
		padding: theme.spacing(0.2, 1),
		fontSize: 12,
		fontFamily: "sans-serif",
	},
	bottomNav: {
		top: "auto",
		bottom: 0,
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginRight: drawerWidth,
		},
	},
	btn: {
		[theme.breakpoints.down("sm")]: {
			fontSize: 8,
		},
	},
}));

export function TestTopNav({ test }) {
	const { Tstate } = useContext(TestContext);
	const [fullSrn, setSrn] = useState(true);
	document.title = `${Tstate.testName} | Online Test - Qualifier.co.in `;

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
						src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
						alt="Qualifier-logo"
						border="0"
					/>
					<span style={{ flexGrow: 0.1 }} />

					<Hidden xsDown implementation="css">
						<Typography style={{ flexGrow: 1 }} color="primary">
							{Tstate.loading ? "Test is Loading..." : Tstate.testName}
						</Typography>
					</Hidden>

					<span style={{ flexGrow: 0.7 }} />
					<Hidden xsDown implementation="css">
						{test && <TestTimer m={Tstate.totalTime} />}
					</Hidden>
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
	const classes = navStyle();
	return (
		<AppBar position="fixed" color="default" className={classes.bottomNav}>
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
		</AppBar>
	);
}

export function TestBNav() {
	const classes = navStyle();
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
		<AppBar position="fixed" color="default" className={classes.bottomNav}>
			<Toolbar variant="dense">
				<Button size="small" className={classes.btn} onClick={handleMark} variant="contained" color="primary">
					Mark for Review & Next
				</Button>
				<span style={{ flexGrow: 0.05 }} />
				<Button onClick={handleClear} className={classes.btn} size="small" variant="outlined" color="primary">
					Clear Response
				</Button>
				<span style={{ flexGrow: 1 }} />
				<Button onClick={handleSave} className={classes.btn} endIcon={<MdArrowForward />} size="small" variant="contained" color="secondary">
					Save & Next
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export function SectionNav() {
	const classes = navStyle();
	const { Tstate, Tdispatch } = useContext(TestContext);
	const changeSection = (v) => {
		return Tdispatch({ type: SETSECTION, payload: v });
	};
	return (
		<Paper className={classes.secNav} style={{ height: 45, top: 52, background: "#fcfdff" }} elevation={2}>
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
		</Paper>
	);
}

export function QuestionNav({ qNo, qId, marks }) {
	const classes = navStyle();
	const [rMenu, setMenu] = useState(null);

	const handleReport = (issue) => {
		axios
			.post("/api/private/qreport", { questionId: qId, issue })
			.then((res) => alert(res.data.message))
			.catch((err) => console.log(err));
		setMenu(null);
	};
	return (
		<div className={classes.secNav} style={{ top: 102, height: 45, borderBottom: "1px solid #cde4f7" }}>
			<Toolbar variant="dense">
				<Typography variant="body2">
					<b>Question No. {qNo} </b>
				</Typography>
				<span style={{ flexGrow: 1 }} />
				<div style={{ display: "flex", flexDirection: "column", marginTop: -8 }}>
					<Typography variant="caption">Marks</Typography>
					<span>
						<span className={classes.mark} style={{ background: "#27ae60" }}>
							+{marks && marks.correct}
						</span>
						{"\u00A0"}
						<span className={classes.mark} style={{ background: "#c0392b" }}>
							-{marks && marks.incorrect}
						</span>
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
		</div>
	);
}
