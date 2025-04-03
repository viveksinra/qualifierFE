import React, { lazy } from "react";
import { Nav } from "../Components/Navigation/Nav";
import SavedQuestion from "../Website/CourseDetails/SavedQuestion";
import { styled } from '@mui/material/styles';
const MyDrawer = lazy(() => import("../Components/Navigation/MyDrawer"));

const PREFIX = 'SaveQuestions';
const classes = {
	root: `${PREFIX}-root`,
	toolbar: `${PREFIX}-toolbar`,
	content: `${PREFIX}-content`
};

const StyledRoot = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		display: "flex",
	},
	[`& .${classes.toolbar}`]: theme.mixins.toolbar,
	[`& .${classes.content}`]: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function SaveQuestions() {
	return (
		<StyledRoot className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<SavedQuestion link="" />
			</main>
		</StyledRoot>
	);
}
