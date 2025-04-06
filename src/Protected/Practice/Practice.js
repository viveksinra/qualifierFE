import React, { useContext, useEffect, useState, lazy, Suspense, useCallback, useLayoutEffect } from "react";
import { FullNav } from "../../Components/Navigation/Nav";
import { TimeNav, PracBtmNav } from "./PracticsNav";
import QuesArea from "./QuesArea";
import End from "./QEnd";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import { GETQUES } from "../../Components/Context/types";
import { Grid, Container, Paper, AppBar, Divider, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useBeforeUnload, useNavigate } from "react-router-dom";
import axios from "axios";
const ChatBox = lazy(() => import("./ChatBox"));

const PREFIX = 'Practice';
const classes = {
	root: `${PREFIX}-root`,
	toolbar: `${PREFIX}-toolbar`,
	load: `${PREFIX}-load`,
	paper: `${PREFIX}-paper`,
};

const StyledRoot = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		background: "#fff",
		height: `calc(100vh - ${50}px)`,
		overflowY: "auto",
	},
	[`& .${classes.toolbar}`]: theme.mixins.toolbar,
	[`& .${classes.load}`]: {
		display: "flex",
		flexDirection: "column",
		height: 400,
		justifyContent: "center",
		alignItems: "center",
	},
	[`& .${classes.paper}`]: {
		padding: theme.spacing(),
		marginTop: theme.spacing(2),
		width: 860,
		fontSize: "14px",
		height: "100%",
		overflowX: "hidden",
	},
}));

export default function Practice({ params }) {
	const { Pstate, Pdispatch } = useContext(PracContext);
	const [newlink] = useState(makeLink(Pstate.level, Pstate.ansRight, params));
	const navigate = useNavigate();
	
	// Add this useLayoutEffect to prevent scroll issues
	useLayoutEffect(() => {
		// Disable animations temporarily to avoid scrollTop errors
		const originalScrollTop = window.scrollY;
		document.body.style.overflow = 'hidden';
		
		return () => {
			document.body.style.overflow = '';
			window.scrollTo(0, originalScrollTop);
		};
	}, []);
	
	// Handle beforeunload event
	useBeforeUnload(
		useCallback((event) => {
			if (!Pstate.end) {
				event.preventDefault();
				return "Are you sure you want to leave Practice?";
			}
		}, [Pstate.end])
	);
	
	// Handle back/forward navigation
	useEffect(() => {
		const handleBeforeNavigate = (event) => {
			if (!Pstate.end) {
				if (window.confirm("Are you sure you want to leave Practice?")) {
					return;
				}
				event.preventDefault();
			}
		};
		
		window.addEventListener("beforeunload", handleBeforeNavigate);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeNavigate);
		};
	}, [Pstate.end, navigate]);
	
	useEffect(() => {
		if (Pstate.loading) {
			axios
				.get(newlink)
				.then((res) => Pdispatch({ type: GETQUES, payload: { params, ...res.data } }))
				.catch((err) => console.log(err));
			document.title = `Practice | Qualifier : See your Daily Report & improve your weak zone - Score All India Rank For FREE`;
		}
	}, [Pdispatch, params, newlink, Pstate.loading]);

	if (Pstate.end) {
		return <End />;
	}

	return (
		<StyledRoot className={classes.root}>
			<AppBar>
				<FullNav />
			</AppBar>
			<div className={classes.toolbar} />
			<Container>
				{Pstate.loading ? (
					<div className={classes.load}>
						<CircularProgress />
						<br />
						Please Wait, New Question is loading...
					</div>
						) : (
					<Grid container spacing={2} justify={Pstate.submitted ? "space-between" : "center"}>
						<Grid item size={{xs: 12,md: 9 }}>
						<Paper className={classes.paper}>
							<TimeNav />
							<Divider style={{ marginBottom: 5 }} />
							<QuesArea />
						</Paper>
						</Grid>
						<Grid item size={{xs: 12,md: 3 }}>
						{Pstate.submitted && (
							<Suspense
								fallback={
									<div className={classes.load}>
										<CircularProgress />
									</div>
								}
							>
								<ChatBox />
							</Suspense>
						)}
						</Grid>
					</Grid>
				)}
			</Container>
			<PracBtmNav />
		</StyledRoot>
	);
}

const makeLink = (level, ansRight, params) => {
	let l1 = level.replace(" ", "");
	let l2 = l1.toLocaleLowerCase();
	let link;
	if (params.chaplink) {
		link = `/api/public/quest/chapter/${ansRight}/${l2}/${params.chaplink}`;
	} else if (params.sublink) {
		link = `/api/public/quest/subject/${ansRight}/${l2}/${params.sublink}`;
	} else if (params.corslink) {
		link = `/api/public/quest/course/${ansRight}/${l2}/${params.corslink}`;
	}
	return link;
};
