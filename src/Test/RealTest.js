import React, { useState, useEffect } from "react";
import { TestTopNav, drawerWidth, TestBNav, SectionNav } from "./TestNav";
import TestDrawer from "./TestDrawer";
import QuestionArea from "./QuestionArea";
import { styled } from '@mui/material/styles';
import { TestIntro } from "./Instructions";
import QPaper from "./QPaper";

const StyledRoot = styled('div')(({ theme }) => ({
	flexGrow: 1,
	background: "#fff",
	height: `calc(100vh - ${48}px)`,
}));

const StyledMain = styled('main')(({ theme }) => ({
	flexGrow: 1,
	margin: theme.spacing(5.5, 0, 0),
	[theme.breakpoints.up("sm")]: {
		width: `calc(100vw - ${drawerWidth + 5}px)`,
		marginRight: drawerWidth + 5,
		height: `calc(100vh - ${170}px)`,
	},
}));

const StyledToolbarSpacer = styled('div')(({ theme }) => theme.mixins.toolbar);

function RealTest() {
	const [sw, setShow] = useState("q");

	useEffect(() => {
		// Handle the confirmation dialog when leaving the page
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			const message = "Leaving Test will lose all data. Are you sure to skip the Test?";
			e.returnValue = message;
			return message;
		};
		
		window.addEventListener('beforeunload', handleBeforeUnload);
		
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return (
		<StyledRoot>
			<TestTopNav test={true} />
			<SectionNav />
			<StyledToolbarSpacer />
			<StyledMain>{sw === "q" ? <QuestionArea /> : sw === "i" ? <TestIntro /> : <QPaper />}</StyledMain>
			<TestDrawer test={true} sw={sw} setShow={setShow} />
			<TestBNav />
		</StyledRoot>
	);
}

export default RealTest;
