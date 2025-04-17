import React from "react";
import Footer from "../Components/Footer/Footer";
import { 
	Container, 
	Typography, 
	Grid, 
	Box, 
	Paper, 
	Button, 
	Divider,
	Stack
} from "@mui/material";
import { HideOnScroll, FullNav } from "../Components/Navigation/Nav";
import { styled } from '@mui/material/styles';
import { isQualifier } from "../theme";

const StyledBox = styled(Box)(({ theme }) => ({
	'.banner': {
		background: "url(https://i.ibb.co/CWnH4H4/bg.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "50vh",
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.4)",
		}
	},
	'.banner-content': {
		position: "relative",
		zIndex: 1,
		color: "white",
		textAlign: "center",
		padding: theme.spacing(2),
	},
	'.main-container': {
		background: "#fff",
		padding: theme.spacing(4),
		position: "relative",
		marginTop: "-5%",
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
		boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.1)",
	},
	'.about-image': {
		width: "100%",
		height: "auto",
		borderRadius: "16px",
		boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
	},
	'.feature-card': {
		height: "100%",
		borderRadius: "16px",
		padding: theme.spacing(3),
		transition: "all 0.3s ease",
		"&:hover": {
			transform: "translateY(-10px)",
			boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
			background: "linear-gradient(135deg, rgba(34,195,120,0.05) 0%, rgba(45,168,253,0.1) 100%)",
			borderColor: theme.palette.primary.main,
		},
	},
	'.feature-icon': {
		width: theme.spacing(8),
		height: theme.spacing(8),
		marginBottom: theme.spacing(2),
		borderRadius: "12px",
		boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
	},
	'.charity-section': {
		background: "url(https://i.ibb.co/KjXnWKy/csr-qualifier.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "500px",
		position: "relative",
		display: "flex",
		alignItems: "center",
		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.6)",
		}
	},
	'.charity-content': {
		position: "relative",
		zIndex: 1,
		color: "white",
		padding: theme.spacing(4),
		[theme.breakpoints.up("md")]: {
			width: "50%",
			marginLeft: "auto",
			textAlign: "right",
		},
		[theme.breakpoints.down("md")]: {
			width: "100%",
			textAlign: "center",
		},
	},
}));

const featureCards = [
	{
		icon: "https://paytm.com/about-us/wp-content/uploads/sites/3/2015/03/trophy.png",
		title: "Achievement",
		description: "Recognize your hard work with rewards & certificates",
	},
	{
		icon: "https://i.ibb.co/rcM9KMG/intern.png",
		title: "Join Internship",
		description: "Gain real-world experience with our internship programs",
	},
	{
		icon: "https://cdn-icons-png.flaticon.com/512/2490/2490396.png",
		title: "Practice Tests",
		description: "Prepare effectively with thousands of practice questions",
	},
	{
		icon: "https://cdn-icons-png.flaticon.com/512/5309/5309779.png",
		title: "Mobile Access",
		description: "Study anytime, anywhere with our mobile platform",
	},
];

export default function About(props) {
	document.title = "About - | " +  isQualifier ? "Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE" : "Risk Hawk : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";

	return (
		<StyledBox>
			<FullNav />
			
			{/* Hero Banner */}
			<Box className="banner">
				<Box className="banner-content">
					<Typography variant="h2" gutterBottom>
						About <strong>Qualifier</strong>
					</Typography>
					<Typography variant="h5">
						India's Leading Online Practice & Test Portal
					</Typography>
				</Box>
			</Box>
			
			{/* Main Content */}
			<Container maxWidth="lg" className="main-container">
				<Box mb={6}>
					<Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
						Welcome to <strong>Qualifier</strong>
					</Typography>
					<Divider sx={{ mb: 4, width: '80px', margin: '0 auto', borderWidth: '2px', backgroundColor: 'primary.main' }} />
					<Typography variant="body1" paragraph align="center" color="text.secondary" sx={{ maxWidth: '800px', margin: '0 auto' }}>
						Qualifier is India's leading online practice, test and Study platform for Indian students & exam aspirants. We have a huge question bank of
						several courses in different categories, like Government Exams, Bank Practices, C.B.S.E, State Board Exams and much more. We offer mobile
						application and cross platform accessibility so that study can be smooth & stress-free. After a large experience in the education sector we
						understand the student's needs and provide them the best study content so that they can crack the examination as if playing a game. Enjoy Studying!
					</Typography>
				</Box>
				
				<Grid container spacing={4} alignItems="center" mb={6}>
					<Grid item size={{ xs: 12, sm: 12, md: 6 }}>
						<Box
							component="img"
							src="https://i.ibb.co/zx5wzvF/happy.jpg"
							alt="Happy students"
							className="about-image"
						/>
					</Grid>
					<Grid item size={{ xs: 12, sm: 12, md: 6 }}>
						<Typography variant="h5" color="primary" gutterBottom>
							Study By Practice & Chase Success
						</Typography>
						<Typography variant="body1" paragraph color="text.secondary">
							Exams are now full of fun! With Qualifier, improve your skills & knowledge through an engaging learning experience designed to make your preparation effective and enjoyable.
						</Typography>
						<Typography variant="body1" paragraph color="text.secondary">
							Our platform offers thousands of practice questions, mock tests, and study materials tailored to your specific exam needs.
						</Typography>
						<Button 
							variant="contained" 
							color="primary" 
							size="large"
							sx={{ mt: 2 }}
						>
							Start Learning
						</Button>
					</Grid>
				</Grid>
				
				{/* Features Section */}
				<Box mb={8}>
					<Typography variant="h4" align="center" color="primary" gutterBottom>
						Why Choose Qualifier
					</Typography>
					<Divider sx={{ mb: 4, width: '80px', margin: '0 auto', borderWidth: '2px', backgroundColor: 'primary.main' }} />
					
					<Grid container spacing={3} mt={2}>
						{featureCards.map((feature, index) => (
							<Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
								<Paper elevation={0} variant="outlined" className="feature-card">
									<Stack alignItems="center" spacing={1}>
										<Box
											component="img"
											src={feature.icon}
											alt={feature.title}
											className="feature-icon"
										/>
										<Typography variant="h6" color="primary" align="center">
											{feature.title}
										</Typography>
										<Typography variant="body2" color="text.secondary" align="center">
											{feature.description}
										</Typography>
									</Stack>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
			
			{/* Charity Section */}
			<Box className="charity-section">
				<Container>
					<Box className="charity-content">
						<Typography variant="h4" gutterBottom>
							Let's make the Nation a better place
						</Typography>
						<Typography variant="body1" paragraph>
							At <strong>Qualifier</strong>, we strongly believe in supporting the needy youth through education and empowerment.
						</Typography>
						<Typography variant="body1" paragraph>
							Our social initiatives aim to bridge the educational gap and provide equal opportunities for all students regardless of their background.
						</Typography>
						<Button 
							variant="contained" 
							color="secondary" 
							size="large"
							sx={{ mt: 2 }}
						>
							Join Our Mission
						</Button>
					</Box>
				</Container>
			</Box>
			
			<HideOnScroll {...props}>
				<FullNav />
			</HideOnScroll>
			<Footer />
		</StyledBox>
	);
}
