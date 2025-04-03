import React, { useState } from "react";
import { TestTopNav, drawerWidth, TestBNav, SectionNav } from "./TestNav";
import TestDrawer from "./TestDrawer";
import QuestionArea from "./QuestionArea";
import { makeStyles } from "@mui/material";
import { TestIntro } from "./Instructions";
import QPaper from "./QPaper";
import { Prompt } from "react-router-dom";

const testStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		background: "#fff",
		height: `calc(100vh - ${48}px)`,
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		margin: theme.spacing(5.5, 0, 0),
		[theme.breakpoints.up("sm")]: {
			width: `calc(100vw - ${drawerWidth + 5}px)`,
			marginRight: drawerWidth + 5,
			height: `calc(100vh - ${170}px)`,
		},
	},
}));

function RealTest() {
	const classes = testStyle();
	const [sw, setShow] = useState("q");

	return (
		<div className={classes.root}>
			<TestTopNav test={true} />
			<SectionNav />
			<div className={classes.toolbar} />
			<main className={classes.content}>{sw === "q" ? <QuestionArea /> : sw === "i" ? <TestIntro /> : <QPaper />}</main>
			<TestDrawer test={true} sw={sw} setShow={setShow} />
			<TestBNav />
			<Prompt message="Leaving Test will loss all data. Are you sure to skip the Test ?" />
		</div>
	);
}

export default RealTest;
