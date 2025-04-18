import React from "react";
import { Container, Grid, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import pcSvg from "../../img/pc.svg";
import clock from "../../img/clock.svg";
import chart from "../../img/chart.svg";
import step from "../../img/step.svg";
import save from "../../img/save.svg";
import mobile from "../../img/mobile.svg";
import discussion from "../../img/discussion.svg";

const StyledAreaDiv = styled('div')(({ theme }) => ({
	minHeight: "40vh",
	margin: "20px 0px",
	// background: "linear-gradient(90deg, rgba(28,147,203,0.6) 0%, rgba(83,204,206,0.720) 35%, rgba(244,251,255,1) 99%)",
}));

const StyledCrossDivider = styled(Divider)(({ theme }) => ({
	marginLeft: "auto",
	marginRight: "auto",
	transform: "rotate(30deg)",
	color: "#fff",
}));

const StyledGridCardListItem = styled(ListItem)(({ theme }) => ({
	backgroundColor: "rgba(167, 239, 239, 0.8)",
	borderRadius: "10px",
	color: "#0a5494",
	height: "225",
}));

export default function Features() {
	return (
		<StyledAreaDiv>
			<Container>
				<Grid container justify="space-between">
					<Grid item style={{ display: "flex", alignItems: "center", marginLeft: 10, maxWidth: 510 }}>
						<List>
							<Grid container justify="center" spacing={2}>
								{cardData.map((c) => (
									<Grid item size={{xs: 12, md:6 }}  key={c.text}>
										<StyledGridCardListItem dense key={c.text}>
											<ListItemAvatar>
												<Avatar alt={c.text} src={c.icon} />
											</ListItemAvatar>
											<ListItemText primary={c.text} secondary={c.subtext} />
										</StyledGridCardListItem>
									</Grid>
								))}
							</Grid>
						</List>
					</Grid>
					<Grid item className="hideInMob">
						<StyledCrossDivider orientation="vertical" />
					</Grid>
					<Grid item>
						<List>
							{listData.map((l) => (
								<ListItem key={l.text}>
									<ListItemAvatar>
										<Avatar variant="square" alt={l.text} src={l.icon} />
									</ListItemAvatar>
									<ListItemText primary={l.text} secondary={l.subtext} />
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>
			</Container>
		</StyledAreaDiv>
	);
}
const cardData = [
	{
		icon: pcSvg,
		text: "Real Exam Feeling",
		subtext: "Experience your real online Exams.",
	},
	{
		icon: "https://i.ibb.co/7C73Lzv/noAds.png",
		text: "No Advertisement",
		subtext: "Smooth Study without annoying Ads.",
	},
	{
		icon: clock,
		text: "Time Based Question",
		subtext: "Practice in pre-defined Time.",
	},
	{
		icon: chart,
		text: "Indepth Reporting",
		subtext: "Analysis & improve your preparation.",
	},
];

const listData = [
	{
		icon: step,
		text: "Step Wise Question Level",
		subtext: "Automatic understand your level",
	},
	{
		icon: save,
		text: "Save Question for Future",
		subtext: "Revise your saved questions.",
	},
	{
		icon: mobile,
		text: "Interactive Sound Notification",
		subtext: "Get all time access on Mobile devices.",
	},
	{
		icon: discussion,
		text: "Discussion & Doubt - Solution",
		subtext: "Get the proper solution of each question in depth.",
	},
];
