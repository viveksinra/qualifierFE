import React, { useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
import { Card, Divider, Typography, Button, CardActions, LinearProgress, useTheme, useMediaQuery } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import { Link } from "react-router-dom";

const StyledBgDiv = styled('div')(({ theme }) => ({
	width: "100%",
	backgroundImage: 'url("https://res.cloudinary.com/qualifier/image/upload/v1586008563/Default/dottedBG_p2fzfo.webp")',
	marginTop: 10,
	paddingTop: 20,
	paddingBottom: 10,
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
	width: "100%",
}));

const StyledCard = styled(Card)(({ theme }) => ({
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
}));

const StyledCardLogoImg = styled('img')(({ theme }) => ({
	height: 70,
	margin: theme.spacing(),
	marginLeft: "auto",
	marginRight: "auto",
	marginBottom: theme.spacing(),
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-around",
	background: "#e5f8ff",
	borderTop: "1px solid rgba(0, 0, 0, 0.12)",
	position: "absolute",
	bottom: 0,
	width: "90%",
	borderBottomRightRadius: 10,
	borderBottomLeftRadius: 10,
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
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const isXsSm = useMediaQuery(theme.breakpoints.down('md'));

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
		arrows: !isXsSm,
		centerPadding: 40,
		autoplaySpeed: 6000,
		overScan: 1,
		dots: true,
		slidesToShow: isXsSm ? 1 : 4,
	};

	return (
		<StyledBgDiv>
			<Typography align="center" gutterBottom color="primary" variant="h6">
				Popular Courses | Dedicated to You
			</Typography>
			<br />
			{loading ? (
				<center>
					<LinearProgress color="secondary" />
				</center>
			) : (
				<StyledSlider {...setting}>
					{recom.map((d, i) => (
						<Link to={`/practice/${d.categoryLink}/${d.link}`} key={i}>
							<StyledCard elevation={3}>
								<StyledCardLogoImg alt={d.courseTitle} src={d.logo} />
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
								<StyledCardActions disableSpacing>
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
								</StyledCardActions>
							</StyledCard>
						</Link>
					))}
				</StyledSlider>
			)}
		</StyledBgDiv>
	);
}

export default Recommendation;
