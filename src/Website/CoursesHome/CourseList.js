import React from "react";
import { styled, Grid, Card, CardMedia, Divider, Typography, CardActions, CardContent, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { fetchData } from "../../Components/Api";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const resource = fetchData("/api/public/getcourse/getall");

const CourseCard = styled(Card)(({ theme }) => ({
	minHeight: "280px",
	maxWidth: "90%",
	marginLeft: "20px",
	"&:hover": {
		boxShadow: "inset -6px -6px 10px rgba(255,255,255,0.5), inset 6px 6px 20px rgba(0,0,0,0.05)",
		borderBottom: "2px solid rgba(217,33,33,0.4)",
	},
}));

const CourseImg = styled(CardMedia)(({ theme }) => ({
	height: 210,
}));

const TopCrossTypography = styled(Typography)(({ theme }) => ({
	position: "absolute",
	left: "50px",
	top: "30px",
	transform: "rotate(-30deg)",
}));

const CourseList = () => {
	const course = resource.data.read();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

	const settings = {
		autoPlay: true,
		infiniteLoop: true,
		showThumbs: false,
		showStatus: false,
		showIndicators: true,
		interval: 6000,
		centerMode: true,
		centerSlidePercentage: isSmallScreen ? 100 : 33.33,
	};
	return (
		<Grid container spacing={4}>
			{course.map((d, i) => (
				<Grid item key={i} xs={12}>
					<Grid container justifyContent="space-between">
						<Grid item className="hideInMob">
							<TopCrossTypography variant="subtitle1" color="secondary">
								{d.highlight}
							</TopCrossTypography>
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

					<Carousel {...settings}>
						{d.cour.map((c, j) => (
							<CourseCard key={j}>
								<Link to={`/practice/${d.link}/${c.link}`}>
									<CourseImg image={c.image} title={c.courseTitle} />
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
							</CourseCard>
						))}
					</Carousel>
				</Grid>
			))}
		</Grid>
	);
};

export default CourseList;
