import React, { useContext, useState } from "react";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import { makeStyles, AppBar, Toolbar, Fab, Typography, Fade, Breadcrumbs, IconButton, Tooltip, Hidden } from "@mui/material";
import clsx from "clsx";
import { NEXTQUES } from "../../Components/Context/types";
import TimeSlider from "./TimeSlider";
import { MdBookmark, MdBookmarkBorder, MdNearMe, MdFullscreenExit, MdFullscreen } from "react-icons/md";
import axios from "axios";

const navStyle = makeStyles((theme) => ({
	maxSize: {
		[theme.breakpoints.up("sm")]: {
			maxWidth: `calc(100% - ${22}vw)`,
			marginRight: "11vw",
			marginLeft: "11vw",
		},
	},
	bottomNav: {
		top: "auto",
		bottom: 0,
	},
	extendedIcon: {
		marginLeft: theme.spacing(1),
	},
}));

export function TimeNav() {
	const { Pstate } = useContext(PracContext);

	const timeFormat = (s) => {
		let minutes = Math.floor(+s / 60);
		let second = +s - minutes * 60;
		if (second < 10) {
			second = `0${second}`;
		}
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		return `${minutes} : ${second} Sec`;
	};
	if (Pstate.submitted) {
		return (
			<Toolbar variant="dense">
				<Hidden mdDown>
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						<Typography variant="body2" color="textSecondary">
							{Pstate.category && Pstate.category.categoryTitle}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{Pstate.course && Pstate.course.courseTitle}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{Pstate.subject && Pstate.subject.subjectTitle}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{Pstate.chapter && Pstate.chapter.chapterTitle}
						</Typography>
					</Breadcrumbs>
					<span style={{ flexGrow: 0.5 }} />
				</Hidden>

				<Typography variant="body2" color="secondary">
					{Pstate.level}
				</Typography>
				<span style={{ flexGrow: 0.5 }} />

				<span style={{ display: "flex", alignItems: "center" }}>
					<img src="https://res.cloudinary.com/qualifier/image/upload/v1585829078/Default/timer_vbx4tk.svg" alt="Timer" />
					{"\u00A0"}
					{"\u00A0"}
					<Typography variant="body2" color="secondary">
						{timeFormat(Pstate.timeTaken)}
					</Typography>
				</span>
			</Toolbar>
		);
	} else {
		return (
			<div>
				<Fade in={!Pstate.submitted} unmountOnExit>
					<TimeSlider maxTime={Pstate.maxTime} />
				</Fade>
			</div>
		);
	}
}

export function PracBtmNav() {
	const classes = navStyle();
	const [fullSrn, setSrn] = useState(false);
	const [save, setSave] = useState(false);
	const { Pstate, Pdispatch } = useContext(PracContext);
	const saveQues = () => {
		axios
			.post("/api/private/qsaved", { questionId: Pstate.question._id })
			.then(() => setSave(!save))
			.catch((err) => console.log(err));
	};
	const handleNext = () => {
		Pdispatch({ type: NEXTQUES });
	};
	const setScrn = () => {
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
		<AppBar position="fixed" elevation={3} color="default" className={clsx(classes.bottomNav, classes.maxSize)}>
			<Toolbar variant="dense">
				<Tooltip title="Full Screen">
					<IconButton color="primary" onClick={setScrn} aria-label="Screen">
						{fullSrn ? <MdFullscreenExit /> : <MdFullscreen />}
					</IconButton>
				</Tooltip>
				<Tooltip title={save ? "Unsave it" : "Save the Question"}>
					<IconButton color="primary" onClick={saveQues} aria-label="Save">
						{save ? <MdBookmark /> : <MdBookmarkBorder />}
					</IconButton>
				</Tooltip>
				<span style={{ flexGrow: 1 }} />
				<Fab color="secondary" onClick={handleNext} disabled={Pstate.loading} size="small" variant="extended">
					<span className={classes.extendedIcon}>{Pstate.loading ? "Loading" : Pstate.submitted ? "Next" : "Skip"}</span>
					<MdNearMe className={classes.extendedIcon} />
				</Fab>
			</Toolbar>
		</AppBar>
	);
}
