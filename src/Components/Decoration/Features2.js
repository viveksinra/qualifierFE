import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledAreaDiv = styled('div')(({ theme }) => ({
	minHeight: 340,
	display: "flex",
	alignItems: "center",
}));

const StyledCardGrid = styled(Grid)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
}));

export default function Testimonial() {
	return (
		<StyledAreaDiv>
			<Container>
				<Grid container justify="center" alignItems="center" spacing={2}>
					{cardData.map((d, i) => (
						<StyledCardGrid key={i} item size={{xs: 12,sm:3 }} >
							<img src={d.icon} alt={d.text} />
							<br />
							<Typography variant="h6" gutterBottom align="center">
								{d.text}
							</Typography>
							<Typography gutterBottom align="center" color="textSecondary">
								{d.subtext}
							</Typography>
						</StyledCardGrid>
					))}
				</Grid>
			</Container>
		</StyledAreaDiv>
	);
}
const cardData = [
	{
		icon: "https://res.cloudinary.com/qualifier/image/upload/v1585491230/Default/certificate_l3qg78.svg",
		text: "Full Access",
		subtext: "At Qualifier, we firmly believe that learning should not have any boundary. Pay once & Get all the Courses available for you.",
	},
	{
		icon: "https://res.cloudinary.com/qualifier/image/upload/v1585491230/Default/diamond_irofgr.svg",
		text: "Exclusive Questions",
		subtext: "We understand the value of your every minute. Our all questions are crafted in such a way that you can get the best content only.",
	},
	{
		icon: "https://res.cloudinary.com/qualifier/image/upload/v1585491230/Default/infinity_aupbx4.svg",
		text: "Continuous Addition",
		subtext: "Our dedicated team continuously upgrades the contents to ensure that all courses can meet the same standard as the actual exam.",
	},
	{
		icon: "https://res.cloudinary.com/qualifier/image/upload/v1585491230/Default/no-ads_nixmjn.svg",
		text: "No Promotional Content",
		subtext: "Our 'Zero advertisement policy' helps the students to focus on the only study without getting distracted by advertisements.",
	},
];
