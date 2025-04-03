import React, { useState, useEffect } from "react";
import { Container, Typography, Avatar, Card, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from "@mui/material/Rating";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Area = styled('div')(({ theme }) => ({
	minHeight: "40vh",
	paddingTop: theme.spacing(5),
	paddingBottom: theme.spacing(5),
	background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(241,243,245,1) 100%)",
}));

const Paper = styled('div')(({ theme }) => ({
	backgroundColor: "rgba(241, 243, 245, 0.6)",
	padding: theme.spacing(3, 2),
	borderRadius: "10px",
}));

const StyledCard = styled(Card)(({ theme }) => ({
	marginTop: theme.spacing(3),
	paddingTop: theme.spacing(3),
	boxShadow: "-5px 10px 2px 5px rgba(0,0,0,.12)",
	paddingBottom: theme.spacing(2),
	maxWidth: "90%",
	minHeight: "280px",
	margin: "0 auto",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	width: theme.spacing(10),
	height: theme.spacing(10),
	marginLeft: "auto",
	marginRight: "auto",
}));

const TextArea = styled(Typography)(({ theme }) => ({
	height: 115,
	paddingLeft: theme.spacing(),
	paddingRight: theme.spacing(),
	overflowY: "hidden",
}));

function Testimonial() {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));
	const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
	
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

	const centerSlidePercentage = isXs || isSm ? 100 : 33.33;

	return (
		<Area>
			<Container>
				<Paper>
					<Typography align="center" variant="subtitle1" color="primary">
						Your Feedback <FaHeart /> Our Strength
					</Typography>
					<Typography align="center" paragraph color="textSecondary">
						At Qualifier, our passion drives us to work hard and deliver outstanding practice set, Your appreciation is always motivational.
					</Typography>
					<Carousel 
						autoPlay 
						infiniteLoop 
						showStatus={false} 
						showThumbs={false} 
						showArrows={!isXs} 
						showIndicators={true}
						centerMode={true}
						centerSlidePercentage={centerSlidePercentage}
						interval={6000}
					>
						{data.map((t, i) => (
							<StyledCard key={i}>
								<StyledAvatar alt={t.name} src={t.image} />

								<TextArea paragraph color="textSecondary" align="center">
									{t.review}
								</TextArea>

								<Typography color="primary" align="center">
									{t.name}
								</Typography>
								<Typography color="secondary" align="center">
									{t.designation}
								</Typography>
								<center>
									<Rating name="rating" value={+t.rating} readOnly />
								</center>
							</StyledCard>
						))}
					</Carousel>
				</Paper>
			</Container>
		</Area>
	);
}

export default Testimonial;
