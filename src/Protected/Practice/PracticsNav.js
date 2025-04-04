import React, { useContext, useState } from "react";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import { AppBar, Toolbar, Fab, Typography, Fade, Breadcrumbs, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import clsx from "clsx";
import { NEXTQUES } from "../../Components/Context/types";
import TimeSlider from "./TimeSlider";
import { MdBookmark, MdBookmarkBorder, MdNearMe, MdFullscreenExit, MdFullscreen } from "react-icons/md";
import axios from "axios";

const PREFIX = 'PracticsNav';
const navClasses = {
	maxSize: `${PREFIX}-maxSize`,
	bottomNav: `${PREFIX}-bottomNav`,
	extendedIcon: `${PREFIX}-extendedIcon`
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	[`&.${navClasses.maxSize}`]: {
		[theme.breakpoints.up("sm")]: {
			maxWidth: `calc(100% - ${22}vw)`,
			marginRight: "11vw",
			marginLeft: "11vw",
		},
	},
	[`&.${navClasses.bottomNav}`]: {
		top: "auto",
		bottom: 0,
	},
	[`& .${navClasses.extendedIcon}`]: {
		marginLeft: theme.spacing(1),
	},
}));

export function TimeNav() {
	const { Pstate } = useContext(PracContext);
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
				{isDesktop && (
					<>
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
					</>
				)}

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
				{!Pstate.submitted && (
					<TimeSlider maxTime={Pstate.maxTime} />
				)}
			</div>
		);
	}
}

export function PracBtmNav() {
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
		<StyledAppBar position="fixed" elevation={3} color="default" className={clsx(navClasses.bottomNav, navClasses.maxSize)}>
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
					<span className={navClasses.extendedIcon}>{Pstate.loading ? "Loading" : Pstate.submitted ? "Next" : "Skip"}</span>
					<MdNearMe className={navClasses.extendedIcon} />
				</Fab>
			</Toolbar>
		</StyledAppBar>
	);
}
