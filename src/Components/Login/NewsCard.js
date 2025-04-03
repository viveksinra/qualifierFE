import React, { memo } from "react";
import { makeStyles, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchData } from "../Api";
const resource = fetchData("/api/blog/get/two");
const useStyles = makeStyles((theme) => ({
	newsCard: {
		height: 420,
		width: 360,
		position: "absolute",
		top: "50%",
		transform: "translateY(-50%)",
		backgroundColor: "#fff",
		overflowX: "hidden",
		borderRadius: "8px",
		marginLeft: "18vw",
		padding: theme.spacing(2, 0),
		paddingTop: "5rem",
		boxShadow: "2px 3px 10px 3px #ccc",
		"& > h3": {
			color: "#1976d2 !important",
			margin: 0,
			position: "absolute",
			font: "16px Lato,Arial,sans-serif",
			top: 60,
			left: 90,
		},
		"& a": {
			textDecoration: "none",
			color: "#1976d2 !important",
		},
	},
	body: {
		height: "380px",
		padding: theme.spacing(0, 2),
		overflowY: "auto",
		"&::-webkit-scrollbar": {
			color: "#40a9ff",
			width: "6px",
		},
	},

	statusRibbon: {
		fontSize: "14px",
		fontWeight: 700,
		background: "linear-gradient(45deg,#72d042 17%,#25cc71 70%)",
		lineHeight: "2.4em",
		textAlign: "center",
		width: "13em",
		position: "relative",
		top: "-3.50em",
		left: "-3.0em",
		zIndex: 20,
		transform: "rotate(-45deg)",
		color: "#fff",
	},
	img: {
		width: "100%",
		maxHeight: "100%",
		borderRadius: 10,
	},
}));
const NewsCard = () => {
	const classes = useStyles();
	const news = resource.data.read();
	return (
		<div className={classes.newsCard}>
			<div className={classes.statusRibbon}>Qualifier's Updates</div>

			<h3>What's the Latest</h3>
			<div className={classes.body}>
				{news.map((n, i) => (
					<div key={i}>
						<Link to={`/blog/${n.link}`}>
							<img alt={n.title} className={classes.img} src={n.img} />
							<Typography noWrap variant="subtitle1">
								{n.title}
							</Typography>
						</Link>

						<Typography variant="body2" gutterBottom noWrap color="textSecondary">
							{`${n.subHeader} | By : ${n.author}`}
						</Typography>
						<Link to={`/blog/${n.link}`}>
							<Typography align="right" gutterBottom>
								Learn More
							</Typography>
						</Link>
						<Divider />
						<br />
					</div>
				))}
				<Link to={`/blog`}>
					<Typography align="center" gutterBottom>
						Read All
					</Typography>
				</Link>
			</div>
		</div>
	);
};

export default memo(NewsCard);
