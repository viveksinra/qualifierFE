import React from "react";
import {
	Container,
	Grid,
	Typography,
	makeStyles,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
} from "@mui/material";
import shield from "./shield.svg";
import exam from "./exam.svg";
import doubt from "./computer.svg";
import calender from "./calender.svg";
import question from "./question.svg";
import target from "./target.svg";

const useStyles = makeStyles((theme) => ({
	dataBg: {
		marginBottom: 25,
	},
	list: {
		width: "100%",
		backgroundColor: "#f1f3f5",
		transition: "all 0.1s ease-out",
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		transitionDuration: ".3s",
		"&:hover": {
			background: "linear-gradient(0deg, rgba(240,134,255,0.252) 0%, rgba(68,208,255,0.35) 100%)",
			border: "1px solid rgb(47, 78, 255)",
			cursor: "grab",
			borderTopLeftRadius: "25px",
			borderBottomRightRadius: "25px",
			transform: "scale(0.8) rotate(1deg)",
			borderTopRightRadius: "0px",
			borderBottomLeftRadius: "0px",
		},
	},
}));

export default function DataCard() {
	const classes = useStyles();
	const cardData = [
		{
			logo: shield,
			title: "Trusted by",
			value: "3,598+ Students",
			link: "/",
		},
		{
			logo: exam,
			title: "Total Test",
			value: "310+ Test Series",
			link: "/",
		},
		{
			logo: question,
			title: "Total Question",
			value: "65205+ Questions",
			link: "/",
		},
		{
			logo: doubt,
			title: "Doubt Asked",
			value: "5405+",
			link: "/",
		},
		{
			logo: target,
			title: "Question Attempted",
			value: "156423+",
			link: "/",
		},

		{
			logo: calender,
			title: "Events & Exams",
			value: "12+ Upcoming",
			link: "/",
		},
	];
	return (
		<div className={classes.dataBg}>
			<Container>
				<Grid container spacing={2}>
					{cardData.map((d) => (
						<Grid key={d.title} item xs={12} sm={6} md={4}>
							<List dense disablePadding className={classes.list}>
								<ListItem dense>
									<ListItemAvatar>
										<Avatar alt={d.title} src={d.logo} style={{ width: 80, height: 80 }} />
									</ListItemAvatar>
									<ListItemText
										primary={<Typography color="primary"> {d.title}</Typography>}
										secondary={
											<Typography variant="h6" color="secondary">
												{d.value}
											</Typography>
										}
									/>
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="delete">
											→
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							</List>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}
