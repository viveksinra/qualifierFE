import React from "react";
import { makeStyles, Grid, Card, CardMedia, Divider, Typography, CardActions, CardContent, Button, withWidth } from "@material-ui/core";
import Slider from "infinite-react-carousel";
import { Link } from "react-router-dom";
import { fetchData } from "../../Components/Api";
const resource = fetchData("/api/public/getcourse/getall");

const useStyles = makeStyles((theme) => ({
	courseCard: {
		minHeight: "280px",
		maxWidth: "90%",
		marginLeft: "20px",
		"&:hover": {
			boxShadow: "inset -6px -6px 10px rgba(255,255,255,0.5), inset 6px 6px 20px rgba(0,0,0,0.05)",
			borderBottom: "2px solid rgba(217,33,33,0.4)",
		},
	},
	courseImg: {
		height: 210,
	},
	topCross: {
		position: "absolute",
		left: "50px",
		top: "30px",
		transform: "rotate(-30deg)",
	},
}));

const CourseList = (props) => {
	const classes = useStyles();
	const course = resource.data.read();

	const settings = {
		autoplay: true,
		autoplayScroll: 1,
		dots: true,
		autoplaySpeed: 6000,
		overScan: 1,
		slidesToShow: props.width === "xs" || props.width === "sm" ? 1 : 3,
	};
	return (
		<Grid container spacing={4}>
			{course.map((d, i) => (
				<Grid item key={i} xs={12}>
					<Grid container justify="space-between">
						<Grid item className="hideInMob">
							<Typography variant="subtitle1" className={classes.topCross} color="secondary">
								{d.highlight}
							</Typography>
						</Grid>
						<Grid item>
							<Typography align="center" variant="h6" color="primary">
								{d.categoryTitle}
							</Typography>
							<Typography align="center" gutterBottom paragraph color="textSecondary">
								{d.description}
							</Typography>
						</Grid>
						<Grid item>
							<Link to={`/practice/${d.link}`}>
								<Button size="small" variant="outlined" color="primary">
									View All
								</Button>
							</Link>
						</Grid>
					</Grid>

					<Slider {...settings}>
						{d.cour.map((c, j) => (
							<Card key={j} className={classes.courseCard}>
								<Link to={`/practice/${d.link}/${c.link}`}>
									<CardMedia className={classes.courseImg} image={c.image} title={c.courseTitle} />
								</Link>

								<CardContent style={{ height: 90 }}>
									<CardActions>
										<img src={c.logo} alt={c.courseTitle} style={{ height: 25 }} />
										<Typography variant="body1" color="primary">
											{c.courseTitle}
										</Typography>
									</CardActions>
									<Typography variant="body2" align="center" color="textSecondary" component="p">
										{c.description.slice(0, 80)}
									</Typography>
								</CardContent>
								<CardActions disableSpacing style={{ display: "flex", justifyContent: "space-around" }}>
									<span>
										<Typography align="center" color="secondary" variant="subtitle1">
											{c.noOfQues}
										</Typography>
										<Typography align="center" color="textSecondary" variant="caption">
											Questions
										</Typography>
									</span>
									<Divider orientation="vertical" flexItem />
									<span>
										<Typography align="center" color="secondary" variant="subtitle1">
											{c.noOfChap}
										</Typography>
										<Typography align="center" color="textSecondary" variant="caption">
											Chapters
										</Typography>
									</span>
									<Divider orientation="vertical" flexItem />
									<span>
										<Typography align="center" color="secondary" variant="subtitle1">
											{c.noOfSub}
										</Typography>
										<Typography align="center" color="textSecondary" variant="caption">
											Subjects
										</Typography>
									</span>
								</CardActions>
								<CardActions style={{ borderTop: "1px solid #0A5494" }}>
									<span style={{ flexGrow: 1 }} />
									<Link to={`/practice/${d.link}/${c.link}`}>
										<Button size="small" variant="outlined" color="primary">
											Enroll For FREE
										</Button>
									</Link>
									<span style={{ flexGrow: 1 }} />
								</CardActions>
							</Card>
						))}
					</Slider>
				</Grid>
			))}
		</Grid>
	);
};

export default withWidth()(CourseList);
