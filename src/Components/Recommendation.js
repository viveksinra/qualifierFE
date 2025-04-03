import React, { useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
import { makeStyles, Card, Divider, withWidth, Typography, Button, CardActions, LinearProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	bg: {
		width: "100%",
		backgroundImage: 'url("https://res.cloudinary.com/qualifier/image/upload/v1586008563/Default/dottedBG_p2fzfo.webp")',
		marginTop: 10,
		paddingTop: 20,
		paddingBottom: 10,
	},
	slider: {
		width: "100%",
	},
	card: {
		height: 250,
		maxWidth: "90%",
		borderRadius: 10,
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
		boxShadow: "inset -6px -6px 10px rgba(255,255,255,0.5), inset 6px 6px 20px rgba(0,0,0,0.05)",
		"&:hover": {
			boxShadow: "-6px -6px 20px rgba(255,255,255,1), 6px 6px 20px rgba(0,0,0,0.1)",
		},
	},
	cardLogo: {
		height: 70,
		margin: theme.spacing(),
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: theme.spacing(),
	},
	action: {
		display: "flex",
		justifyContent: "space-around",
		background: "#e5f8ff",
		borderTop: "1px solid rgba(0, 0, 0, 0.12)",
		position: "absolute",
		bottom: 0,
		width: "90%",
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},
}));
function Recommendation(props) {
	const [recom, setRecom] = useState([
		{
			categoryTitle: "Just a Second more",
			categoryLink: "",
			courseTitle: "Please Wait...",
			link: "",
			logo: "https://res.cloudinary.com/qualifier/image/upload/v1577177570/gmn8flu6lwhcwxh2dfws.svg",
			noOfQues: 12346,
			noOfChap: 14,
			noOfSub: 124,
		},
	]);
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let active = true;

		const getData = async () => {
			await axios
				.get("/api/report/user/rec")
				.then((res) => {
					if (active) {
						setRecom(res.data);
						setLoading(false);
					}
				})
				.catch((err) => {
					if (active) {
						console.log(err);
						setLoading(false);
					}
				});
		};
		getData();

		return () => (active = false);
	}, []);

	const setting = {
		autoplay: true,
		autoplayScroll: 1,
		arrows: props.width === "xs" || props.width === "sm" ? false : true,
		centerPadding: 40,
		autoplaySpeed: 6000,
		overScan: 1,
		dots: true,
		slidesToShow: props.width === "xs" || props.width === "sm" ? 1 : 4,
	};

	return (
		<div className={classes.bg}>
			<Typography align="center" gutterBottom color="primary" variant="h6">
				Popular Courses | Dedicated to You
			</Typography>
			<br />
			{loading ? (
				<center>
					<LinearProgress color="secondary" />
				</center>
			) : (
				<Slider className={classes.slider} {...setting}>
					{recom.map((d, i) => (
						<Link to={`/practice/${d.categoryLink}/${d.link}`} key={i}>
							<Card elevation={3} className={classes.card}>
								<img alt={d.courseTitle} className={classes.cardLogo} src={d.logo} />
								<Typography align="center" color="primary" noWrap variant="body2">
									{d.courseTitle}
								</Typography>
								<Typography gutterBottom align="center" noWrap color="textSecondary" variant="body2">
									{d.categoryTitle}
								</Typography>

								<center>
									<Button size="small" variant="outlined" color="secondary">
										Get Started
									</Button>
								</center>
								<br />
								{/* <Divider variant="fullWidth" /> */}
								<CardActions disableSpacing className={classes.action}>
									<span>
										<Typography align="center" color="secondary" variant="subtitle1">
											{d.noOfQues}
										</Typography>
										<Typography align="center" color="textSecondary" variant="caption">
											Questions
										</Typography>
									</span>
									<Divider orientation="vertical" flexItem style={{ backgroundColor: "##abacab" }} />
									<span>
										<Typography align="center" color="secondary" variant="subtitle1">
											{d.noOfChap}
										</Typography>
										<Typography align="center" color="textSecondary" variant="caption">
											Chapters
										</Typography>
									</span>
									<Divider orientation="vertical" flexItem style={{ backgroundColor: "##abacab" }} />
									<span>
										<Typography align="center" color="secondary" variant="subtitle1">
											{d.noOfSub}
										</Typography>
										<Typography align="center" color="textSecondary" variant="caption">
											Subjects
										</Typography>
									</span>
								</CardActions>
							</Card>
						</Link>
					))}
				</Slider>
			)}
		</div>
	);
}

export default withWidth()(Recommendation);
