import React, { lazy } from "react";
import { Nav } from "../Components/Navigation/Nav";
import SavedQuestion from "../Website/CourseDetails/SavedQuestion";
import { makeStyles } from "@mui/material";
const MyDrawer = lazy(() => import("../Components/Navigation/MyDrawer"));

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function SaveQuestions() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<SavedQuestion link="" />
			</main>
		</div>
	);
}
