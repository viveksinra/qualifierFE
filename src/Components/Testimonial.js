import React, { useState, useEffect } from "react";
import { Container, makeStyles, Typography, Avatar, Card, withWidth } from "@material-ui/core";
import Slider from "infinite-react-carousel";
import Rating from "@material-ui/lab/Rating";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
	area: {
		minHeight: "40vh",
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(5),
		background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(241,243,245,1) 100%)",
	},
	paper: {
		backgroundColor: "rgba(241, 243, 245, 0.6)",
		padding: theme.spacing(3, 2),
		borderRadius: "10px",
	},
	card: {
		marginTop: theme.spacing(3),
		paddingTop: theme.spacing(3),
		boxShadow: "-5px 10px 2px 5px rgba(0,0,0,.12)",
		paddingBottom: theme.spacing(2),
		maxWidth: "90%",
		minHeight: "280px",
	},
	avtar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		marginLeft: "auto",
		marginRight: "auto",
	},
	textArea: {
		height: 115,
		paddingLeft: theme.spacing(),
		paddingRight: theme.spacing(),
		overflowY: "hidden",
	},
}));

function Testimonial(props) {
	const classes = useStyles();
	const [data, setData] = useState([{}]);
	useEffect(() => {
		let active = true;
		axios
			.get("/api/other/review/get")
			.then((res) => {
				if (active) {
					setData(res.data);
				}
			})
			.catch((err) => console.log(err));
		return () => (active = false);
	}, []);
	const settings = {
		autoplay: true,
		autoplayScroll: 1,
		autoplaySpeed: 6000,
		centerPadding: 40,
		arrows: props.width === "xs" ? false : true,
		dots: true,
		overScan: 1,
		pauseOnHover: true,
		slidesToShow: props.width === "xs" || props.width === "sm" ? 1 : 3,
	};
	return (
		<div className={classes.area}>
			<Container>
				<div className={classes.paper}>
					<Typography align="center" variant="subtitle1" color="primary">
						Your Feedback <FaHeart /> Our Strength
					</Typography>
					<Typography align="center" paragraph color="textSecondary">
						At Qualifier, our passion drives us to work hard and deliver outstanding practice set, Your appreciation is always motivational.
					</Typography>
					<Slider {...settings}>
						{data.map((t, i) => (
							<Card key={i} className={classes.card}>
								<Avatar alt={t.name} src={t.image} className={classes.avtar} />

								<Typography paragraph color="textSecondary" className={classes.textArea} align="center">
									{t.review}
								</Typography>

								<Typography color="primary" align="center">
									{t.name}
								</Typography>
								<Typography color="secondary" align="center">
									{t.designation}
								</Typography>
								<center>
									<Rating name="rating" value={+t.rating} readOnly />
								</center>
							</Card>
						))}
					</Slider>
				</div>
			</Container>
		</div>
	);
}

export default withWidth()(Testimonial);
