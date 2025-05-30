import React, { useState, useContext } from "react";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import { SUBMITANS, SHOWSOL } from "../../Components/Context/types";
import { List, ListItem, ListItemIcon, MenuItem, Fab, Fade, Divider, Tooltip, Toolbar, IconButton, Menu, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import parse from "html-react-parser";
import { FaFeatherAlt } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import axios from "axios";
import { OptionNo } from "../../img/numbers/numbers";
import { Link } from "react-router-dom";

const PREFIX = 'QuesArea';
const classes = {
	qArea: `${PREFIX}-qArea`,
	img: `${PREFIX}-img`,
	optList: `${PREFIX}-optList`,
	optionIcon: `${PREFIX}-optionIcon`,
	r: `${PREFIX}-r`,
	w: `${PREFIX}-w`,
	extendedIcon: `${PREFIX}-extendedIcon`,
	paper: `${PREFIX}-paper`,
	center: `${PREFIX}-center`
};

const StyledRoot = styled('div')(({ theme }) => ({
	[`&.${classes.qArea}`]: {
		overflowY: "auto",
		fontFamily: "sans-serif",
	},
	[`& .${classes.img}`]: {
		maxWidth: "100%",
		maxHeight: "100%",
		display: "block",
	},
	[`& .${classes.optList}`]: {
		"&:hover": {
			backgroundColor: theme.palette.grey[300],
			borderRadius: "10px",
			color: "#0f84dd",
			cursor: "grab",
		},
	},
	[`& .${classes.optionIcon}`]: {
		fontSize: theme.typography.pxToRem(20),
		color: "#4c76e8",
	},
	[`& .${classes.r}`]: {
		backgroundColor: "#27ae60",
		borderRadius: "10px",
		color: "#ffffff",
	},
	[`& .${classes.w}`]: {
		backgroundColor: "#ff8e77",
		borderRadius: "10px",
		color: "#ffffff",
	},
	[`& .${classes.extendedIcon}`]: {
		marginLeft: theme.spacing(1),
	},
	[`& .${classes.paper}`]: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(),
		overflowX: "hidden",
	},
	[`& .${classes.center}`]: {
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		flexFlow: "row nowrap",
		maxWidth: "100%",
		[theme.breakpoints.down("sm")]: {
			alignItems: "center",
		},
	},
}));

function QuesArea() {
	const [rMenu, setRMenu] = useState(null);
	const { Pstate, Pdispatch } = useContext(PracContext);
	const handleSubmit = (ans, ind) => {
		if (Pstate.submitted === false) {
			Pdispatch({ type: SUBMITANS, payload: { ans, ind } });
		}
	};
	const handleReport = (c) => {
		axios
			.post(`/api/private/qreport`, { questionId: Pstate.question._id, issue: c })
			.then((res) => alert(res.data.message))
			.catch((err) => console.log(err));
		setRMenu(null);
	};
	const reportLink = () => {
		let reportLink = "/report";
		let match = Pstate.match;
		if (!match) return reportLink;
		
		if (match.chaplink) {
			reportLink = `/report/${match.catlink}/${match.corslink}/${match.sublink}/${match.chaplink}`;
		} else if (match.sublink) {
			reportLink = `/report/${match.catlink}/${match.corslink}/${match.sublink}`;
		} else if (match.corslink) {
			reportLink = `/report/${match.catlink}/${match.corslink}`;
		}
		return reportLink;
	};
	return (
		<StyledRoot className={classes.qArea}>
			<div className={classes.center}>
				{parse(Pstate.question.questionTitle)}
				{Pstate.question.highlight && (
					<span style={{ display: "flex", alignSelf: "flex-end" }}>
						<b>~ {Pstate.question.highlight}</b>
					</span>
				)}
				{Pstate.question.hint && (
					<p>
						<b>Hint ~ </b> {Pstate.question.hint}
					</p>
				)}
				{Pstate.question.image && <img className={classes.img} src={Pstate.question.image} alt="Question" />}
			</div>
			<br />
			<List dense>
				{Pstate.options &&
					Pstate.options.map((o, i) => (
						<ListItem
							dense
							key={i}
							onClick={() => handleSubmit(o.number, i)}
							className={Pstate.submitted === false ? classes.optList : classes[o.status]}
						>
							<ListItemIcon className={classes.optionIcon}>
								<OptionNo index={i} />
							</ListItemIcon>
							{parse(o.title)}
						</ListItem>
					))}
			</List>
			<Divider light />
			{Pstate.submitted && (
				<Toolbar variant="dense">
					<div>
						<Tooltip title="Report a problem">
							<IconButton onClick={(e) => setRMenu(e.currentTarget)} aria-label="report-problem">
								<FcAbout />
							</IconButton>
						</Tooltip>
						<Menu id="simple-menu" anchorEl={rMenu} open={Boolean(rMenu)} onClose={() => setRMenu(null)}>
							<MenuItem onClick={() => handleReport("Wrong Question")}>Wrong Question</MenuItem>
							<MenuItem onClick={() => handleReport("Wrong Answer")}>Wrong Answer</MenuItem>
							<MenuItem onClick={() => handleReport("Formating Issue")}>Formating Issue</MenuItem>
							<MenuItem onClick={() => handleReport("Other")}>Other Problem</MenuItem>
						</Menu>
					</div>
					<span style={{ flexGrow: 1 }} />
					{Pstate.question.solTitle && (
						<Fab color="primary" onClick={() => Pdispatch({ type: SHOWSOL })} size="small" variant="extended">
							<span className={classes.extendedIcon}>{Pstate.showSol ? "Hide Solution" : "View Solution"}</span>
							<FaFeatherAlt className={classes.extendedIcon} />
						</Fab>
					)}
					<span style={{ flexGrow: 1 }} />
					<Link to={reportLink()}>Finish</Link>
				</Toolbar>
			)}
			{Pstate.showSol && (
				<Paper className={classes.paper}>
					<div className={classes.center}>
						{parse(Pstate.question.solTitle)}
						{Pstate.question.solImage && <img className={classes.img} src={Pstate.question.solImage} alt="Solution" />}
					</div>
				</Paper>
			)}
		</StyledRoot>
	);
}

export default QuesArea;
