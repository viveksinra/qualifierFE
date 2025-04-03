import React, { useContext, useMemo, useState, useEffect } from "react";
import { TESTDRAWER, SETQUES, SUBMITBOX } from "../Components/Context/types";
import { MainContext } from "../Components/Context/MainContext";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import { drawerWidth } from "./TestNav";
import clsx from "clsx";
import { makeStyles, Avatar, Typography, Drawer, Button, Badge, Hidden, SwipeableDrawer } from "@material-ui/core";
import { MdCheck } from "react-icons/md";

const drawerStyle = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	flexRow: {
		display: "flex",
		alignItems: "center",
	},
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up("sm")]: {
			height: `calc(100% - ${51}px)`,
			bottom: 0,
			top: "auto",
		},
		display: "flex",
		fontFamily: "sans-serif",
		flexDirection: "column",
		background: "linear-gradient(to bottom,#f7f9f9, #eaf4fc )",
	},
	avatar: {
		width: "100px",
		height: "90px",
		margin: theme.spacing(3, 0),
	},
	com: {
		width: 20,
		height: 16,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
		marginRight: 2,
	},
	A: {
		borderRadius: "20px 20px 0px 0px",
		backgroundColor: "#27ae60 !important",
		borderColor: "#27ae60 !important",
	},
	NA: {
		borderRadius: "0px 0px 16px 16px",
		backgroundColor: "#c0392b !important",
		borderColor: "#c0392b !important",
	},
	M: {
		borderRadius: "24px",
		backgroundColor: "#9b59b6 !important",
		borderColor: "#9b59b6 !important",
	},
	MA: {
		borderRadius: "24px",
		backgroundColor: "#9b59b6 !important",
		borderColor: "#9b59b6 !important",
	},
	NV: {
		border: "1px solid #333",
		color: "#000 !important",
	},
	secName: {
		padding: 10,
		display: "inline-block",
		height: 20,
		marginTop: 20,
		margin: "15px, 0px",
		textAlign: "center",
		color: "#0a5494",
		background: "linear-gradient(to right, #e8f3f7, #bdeaf9, #e8f3f7)",
	},
	numbers: {
		display: "flex",
		flexWrap: "wrap",
		overflowY: "auto",
		padding: "0px 0px 10px 0px",
		marginTop: 10,
	},
	numCom: {
		width: "calc(30% - 10px)",
		maxWidth: 35,
		height: 25,
		marginLeft: 12,
		marginTop: 10,
		color: "#fff",
		cursor: "pointer",
	},
	center: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 25,
	},
	badge: {
		color: "#27ae60",
		fontSize: 25,
		marginLeft: 16,
		marginTop: -7,
	},
	btmBox: {
		padding: 10,
		width: "calc(100% - 20px)",
		height: 70,
		position: "absolute",
		bottom: 0,
		zIndex: 10,
		boxShadow: "inset -6px -6px 10px rgba(255,255,255,0.5), inset 6px 6px 20px rgba(0,0,0,0.05)",
		backgroundImage: "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)",
	},
}));

function TestDrawer({ test, sw, setShow }) {
	const classes = drawerStyle();
	const { state } = useContext(MainContext);
	const { Tstate, Tdispatch } = useContext(TestContext);
	const [count, setCount] = useState({ A: 0, M: 0, NV: 0, MA: 0, NA: 0 });
	const [ques, setQues] = useState([]);
	const handleTD = () => {
		Tdispatch({ type: TESTDRAWER });
	};

	useMemo(() => {
		let acSec = Tstate.sections.filter((f) => f.title === Tstate.activeSection);
		acSec.map((q) => setQues(q.questions));
	}, [Tstate.sections, Tstate.activeSection]);
	const handleNo = (ques, i) => {
		Tdispatch({ type: SETQUES, payload: { ques, i } });
	};
	useEffect(() => {
		let A = 0,
			M = 0,
			NV = 0,
			MA = 0,
			NA = 0;
		ques.map((q) => {
			switch (q.status) {
				case "NV":
					return NV++;
				case "A":
					return A++;
				case "M":
					return M++;
				case "MA":
					return MA++;
				case "NA":
					return NA++;

				default:
					return null;
			}
		});
		return setCount({ A, M, NV, MA, NA });
	}, [Tstate, ques]);

	const DrawerData = () => {
		return (
			<div className={classes.drawerPaper}>
				<div className={classes.flexRow} style={{ height: 40, padding: "2px 10px", borderBottom: "1px solid #ececec" }}>
					<Avatar alt="User" src={state.userImage} style={{ width: 35, height: 35 }} />
					<span style={{ flexGrow: 0.1 }} />
					<Typography color="primary" noWrap>
						{state.name}
					</Typography>
				</div>
				<div
					style={{
						padding: 10,
						height: 50,
						fontSize: 11,
						borderBottom: "1px solid #ececec",
					}}
				>
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<span className={classes.flexRow}>
							<span className={clsx(classes.A, classes.com)}>{count.A}</span> Answered
						</span>
						<span className={classes.flexRow}>
							<span className={clsx(classes.M, classes.com)}>{count.M}</span> Marked
						</span>
						<span className={classes.flexRow}>
							<span className={clsx(classes.NV, classes.com)}>{count.NV}</span> Not Visited
						</span>
					</div>
					<div style={{ display: "flex", justifyContent: "space-around", marginTop: 10 }}>
						<span className={classes.flexRow}>
							<Badge badgeContent={<MdCheck style={{ color: "#27ae60" }} />}>
								<span className={clsx(classes.M, classes.com)}>{count.MA}</span>
							</Badge>
							Marked & Answered
						</span>
						<span className={classes.flexRow}>
							<span className={clsx(classes.NA, classes.com)}>{count.NA}</span> Not Answered
						</span>
					</div>
				</div>
				<div className={classes.secName}>
					<b>SECTION :</b> {Tstate.activeSection}
				</div>
				<div className={classes.numbers}>
					{ques.map((q, i) => (
						<span key={i} onClick={() => handleNo(q, i)} className={clsx(classes[q.status], classes.numCom)}>
							<span className={classes.center}>
								<Badge badgeContent={q.status === "MA" && <MdCheck className={classes.badge} />}>{i + 1}</Badge>
							</span>
						</span>
					))}
				</div>
				<div className={classes.btmBox}>
					<div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center", marginBottom: 8 }}>
						<Button variant="outlined" onClick={() => setShow(sw === "q" ? "p" : "q")} size="small" color="primary">
							{sw === "p" ? "EXAM MODE" : "Question Paper"}
						</Button>
						{"\u00A0"}
						<Button variant="outlined" onClick={() => setShow(sw === "q" ? "i" : "q")} size="small" color="primary">
							{sw === "i" ? "Hide INST" : "Instruction"}
						</Button>
					</div>
					<Button variant="contained" onClick={() => Tdispatch({ type: SUBMITBOX })} size="small" fullWidth color="primary">
						FINISH TEST
					</Button>
				</div>
			</div>
		);
	};

	if (test) {
		return (
			<div className={classes.root}>
				<Hidden smUp implementation="css">
					<SwipeableDrawer
						open={Tstate.testDrawer}
						onClose={handleTD}
						onOpen={handleTD}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<DrawerData />
					</SwipeableDrawer>
				</Hidden>

				<Hidden xsDown implementation="css">
					<Drawer
						className={classes.drawer}
						variant="permanent"
						classes={{
							paper: classes.drawerPaper,
						}}
						anchor="right"
					>
						<DrawerData />
					</Drawer>
				</Hidden>
			</div>
		);
	} else
		return (
			<div className={classes.root}>
				<div style={{ flexGrow: 1 }}>
					<Hidden xsDown implementation="css">
						<Drawer
							className={classes.drawer}
							variant="permanent"
							classes={{
								paper: classes.drawerPaper,
							}}
							anchor="right"
						>
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
								<Avatar alt="User" className={classes.avatar} src={state.userImage} />

								<Typography align="center" color="primary" noWrap>
									{state.name}
								</Typography>
							</div>
						</Drawer>
					</Hidden>
				</div>
			</div>
		);
}

export default TestDrawer;
