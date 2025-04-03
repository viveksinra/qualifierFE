import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { FullNav } from "../../Components/Navigation/Nav";
import { TimeNav, PracBtmNav } from "./PracticsNav";
import QuesArea from "./QuesArea";
import End from "./QEnd";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import { GETQUES } from "../../Components/Context/types";
import { Grid, Container, Paper, AppBar, Divider, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Prompt } from "react-router-dom";
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

export default function Practice({ match }) {
	const { Pstate, Pdispatch } = useContext(PracContext);
	const [newlink] = useState(makeLink(Pstate.level, Pstate.ansRight, match));
	useEffect(() => {
		if (Pstate.loading) {
			axios
				.get(newlink)
				.then((res) => Pdispatch({ type: GETQUES, payload: { match, ...res.data } }))
				.catch((err) => console.log(err));
			document.title = `Practice | Qualifier : See your Daily Report & improve your weak zone - Score All India Rank For FREE`;
		}
	}, [Pdispatch, match, newlink, Pstate.loading]);

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
						<Paper className={classes.paper}>
							<TimeNav />
							<Divider style={{ marginBottom: 5 }} />
							<QuesArea />
						</Paper>
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
				)}
			</Container>
			<PracBtmNav />
			<Prompt message="Are you sure you want to leave Practice?" />
		</StyledRoot>
	);
}

const makeLink = (level, ansRight, match) => {
	let l1 = level.replace(" ", "");
	let l2 = l1.toLocaleLowerCase();
	let link;
	if (match.params.chaplink) {
		link = `/api/public/quest/chapter/${ansRight}/${l2}/${match.params.chaplink}`;
	} else if (match.params.sublink) {
		link = `/api/public/quest/subject/${ansRight}/${l2}/${match.params.sublink}`;
	} else if (match.params.corslink) {
		link = `/api/public/quest/course/${ansRight}/${l2}/${match.params.corslink}`;
	}
	return link;
};
