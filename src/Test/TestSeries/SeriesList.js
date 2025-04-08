import React, { Fragment, useState, useEffect } from "react";
import {
	Container,
	Grid,
	Card,
	Typography,
	Divider,
	List,
	Tabs,
	Tab,
	ListItem,
	ListItemText,
	Button,
	Alert,
	Box,
	Skeleton,
	Chip,
	Paper,
	CircularProgress,
	useMediaQuery,
} from "@mui/material";
import { styled, useTheme, alpha } from '@mui/material/styles';
import "../TestHome/common.css";
import { Link } from "react-router-dom";
import { FullOffer } from "../../Components/Decoration/OfferCard";
import { FcFlashOn, FcApproval } from "react-icons/fc";
import clsx from "clsx";
import axios from "axios";

// Series Card styled component - moved before it's used
const StyledSeriesCard = styled(Card)(({ theme }) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	transition: 'all 0.3s ease',
	overflow: 'hidden',
	position: 'relative',
	'&:hover': {
		transform: 'translateY(-5px)',
		boxShadow: theme.shadows[10],
	},
	'& .cardHeader': {
		background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.4)}, ${alpha(theme.palette.secondary.light, 0.4)})`,
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	'& .cardLogo': {
		height: 70,
		width: 70,
		objectFit: 'contain',
		marginBottom: theme.spacing(1),
	},
	'& .countChips': {
		display: 'flex',
		justifyContent: 'center',
		gap: theme.spacing(1),
		marginTop: theme.spacing(1),
		flexWrap: 'wrap',
	},
	'& .cardContent': {
		padding: theme.spacing(2),
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	'& .cardFooter': {
		padding: theme.spacing(2),
		borderTop: `1px solid ${theme.palette.divider}`,
		display: 'flex',
		justifyContent: 'center',
	},
}));

// SeriesCard Component definition before it's used
function SeriesCard({ data, lg }) {
	if (!data || data.length === 0) {
		return (
			<Box sx={{ p: 2, textAlign: 'center', my: 2 }}>
				<Alert severity="info">No test series available in this category</Alert>
			</Box>
		);
	}

	return (
		<Grid container spacing={3}>
			{data.map((t, i) => (
				t && (
					<Grid item size={{ xs: 12, sm: 6, lg }} key={i}>
						<Link to={`/test/${t.link}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
							<StyledSeriesCard elevation={3}>
								<div className="cardHeader">
									<img className="cardLogo" alt={t.title} src={t.logo} />
									<Typography variant="h6" align="center" noWrap>
										{t.title}
									</Typography>
									<div className="countChips">
										<Chip 
											label={`${t.totalTest} Tests`}
											size="small"
											color="primary"
											sx={{ 
												minWidth: 80,
												color: '#fff',
												fontWeight: 'medium'
											}}
										/>
										<Chip 
											label={`${t.totalFree} Free`}
											size="small"
											sx={{ 
												bgcolor: 'orange',
												color: '#fff',
												minWidth: 80,
												fontWeight: 'medium'
											}}
										/>
									</div>
								</div>
								<div className="cardContent">
									<List dense disablePadding>
										{t.desp &&
											t.desp.slice(0, 4).map((l, j) => (
												<ListItem dense key={j} disableGutters>
													<FcApproval style={{ marginRight: 8 }} />
													<ListItemText 
														primary={l.title}
														primaryTypographyProps={{ 
															variant: 'body2',
															noWrap: true,
														}} 
													/>
												</ListItem>
											))}
									</List>
								</div>
								<div className="cardFooter">
									<Button 
										variant="contained" 
										color="primary" 
										size="small"
										fullWidth
									>
										View Details
									</Button>
								</div>
							</StyledSeriesCard>
						</Link>
					</Grid>
				)
			))}
		</Grid>
	);
}

// Styled components
const StyledSeriesListContainer = styled('div')(({ theme }) => ({
	padding: theme.spacing(3, 0),
	'& .heroSection': {
		background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.secondary.main, 0.7)})`,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(4, 2),
		marginBottom: theme.spacing(4),
		color: '#fff',
		textAlign: 'center',
		boxShadow: theme.shadows[4],
	},
	'& .categorySection': {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	'& .tabsContainer': {
		background: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[1],
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			height: '100%',
		},
	},
	'& .verticalTabs': {
		borderRight: `1px solid ${theme.palette.divider}`,
		'& .MuiTab-root': {
			alignItems: 'flex-start',
			textAlign: 'left',
			[theme.breakpoints.up('md')]: {
				minHeight: 60,
			},
		},
	},
	'& .horizontalTabs .MuiTab-root': {
		minWidth: 'auto',
		padding: theme.spacing(1, 2),
	},
}));

// Loading Skeleton Component
const SeriesCardSkeleton = () => {
	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Skeleton variant="circular" width={70} height={70} />
				<Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
				<Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
					<Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 4 }} />
					<Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 4 }} />
				</Box>
			</Box>
			<Divider />
			<Box sx={{ p: 2, flexGrow: 1 }}>
				{[...Array(4)].map((_, i) => (
					<Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
						<Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
						<Skeleton variant="text" width="90%" height={20} />
					</Box>
				))}
			</Box>
			<Divider />
			<Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
				<Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
			</Box>
		</Card>
	);
};

function SeriesList() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const [tab, setTab] = useState("All");
	const [Tseries, setT] = useState([]);
	const [allCatg, setCatg] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch test series data directly using axios
	useEffect(() => {
		let isMounted = true;
		
		const fetchTestSeries = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get("/api/bigtest/testbundle/main/get");
				
				if (isMounted) {
					const Ts = response.data;
					setT(Array.isArray(Ts) ? Ts : []);
					
					let cat = [];
					if (Array.isArray(Ts)) {
						Ts.forEach((t) => {
							if (t && t.category && !cat.includes(t.category)) {
								cat.push(t.category);
							}
						});
					}
					
					setCatg(cat);
					setIsLoaded(true);
					setIsLoading(false);
				}
			} catch (err) {
				console.error("Error loading test series data:", err);
				if (isMounted) {
					setError(err);
					setT([]);
					setCatg([]);
					setIsLoaded(true);
					setIsLoading(false);
				}
			}
		};
		
		fetchTestSeries();
		
		return () => {
			isMounted = false;
		};
	}, []);

	// Handle retry for data fetching
	const retryFetch = () => {
		setIsLoaded(false);
		setError(null);
		setIsLoading(true);
		
		// This will trigger the useEffect to run again
		const fetchTestSeries = async () => {
			try {
				const response = await axios.get("/api/bigtest/testbundle/main/get");
				const Ts = response.data;
				
				setT(Array.isArray(Ts) ? Ts : []);
				
				let cat = [];
				if (Array.isArray(Ts)) {
					Ts.forEach((t) => {
						if (t && t.category && !cat.includes(t.category)) {
							cat.push(t.category);
						}
					});
				}
				
				setCatg(cat);
				setIsLoaded(true);
				setIsLoading(false);
			} catch (err) {
				console.error("Error loading test series data:", err);
				setError(err);
				setT([]);
				setCatg([]);
				setIsLoaded(true);
				setIsLoading(false);
			}
		};
		
		fetchTestSeries();
	};

	// Error UI
	if (error) {
		return (
			<Container maxWidth="lg">
				<Box sx={{ my: 6, textAlign: 'center' }}>
					<Alert 
						severity="error" 
						sx={{ 
							mb: 3, 
							maxWidth: 600, 
							mx: 'auto',
							'& .MuiAlert-message': { width: '100%' } 
						}}
					>
						<Typography variant="h6" gutterBottom>
							Unable to Load Test Series
						</Typography>
						<Typography variant="body2" paragraph>
							We're experiencing some technical issues. Please try again later.
						</Typography>
						<Button 
							variant="contained" 
							color="primary" 
							onClick={retryFetch}
							size="medium"
						>
							Retry Loading
						</Button>
					</Alert>
				</Box>
			</Container>
		);
	}

	// Loading UI
	if (isLoading) {
		return (
			<Container maxWidth="lg">
				<Box sx={{ my: 4 }}>
					<Box sx={{ mb: 4, textAlign: 'center' }}>
						<Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2 }} />
						<Skeleton variant="text" width="40%" height={30} sx={{ mx: 'auto' }} />
					</Box>
					
					<Grid container spacing={3}>
						{[...Array(6)].map((_, index) => (
							<Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
								<SeriesCardSkeleton />
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		);
	}

	// Mock data for testing when API is not available
	// This can be safely removed in production
	if (isLoaded && Tseries.length === 0) {
		const mockTestSeries = [
			{
				id: 1,
				title: "Banking Exam Series",
				link: "banking-exam",
				logo: "https://via.placeholder.com/70",
				totalTest: 50,
				totalFree: 5,
				category: "Banking",
				popular: true,
				desp: [
					{ title: "Complete syllabus coverage" },
					{ title: "Latest pattern questions" },
					{ title: "Detailed explanations" },
					{ title: "Performance analytics" }
				]
			},
			{
				id: 2,
				title: "SSC Exam Preparation",
				link: "ssc-exam",
				logo: "https://via.placeholder.com/70",
				totalTest: 40,
				totalFree: 4,
				category: "SSC",
				popular: true,
				desp: [
					{ title: "Topic-wise tests" },
					{ title: "Previous year papers" },
					{ title: "Mock tests" },
					{ title: "Expert guidance" }
				]
			},
			{
				id: 3,
				title: "Railways Exam Series",
				link: "railways-exam",
				logo: "https://via.placeholder.com/70",
				totalTest: 35,
				totalFree: 3,
				category: "Railways",
				popular: false,
				desp: [
					{ title: "RRB NTPC focused tests" },
					{ title: "Group D preparation" },
					{ title: "Technical sections" },
					{ title: "Bilingual questions" }
				]
			},
			{
				id: 4,
				title: "CBSE Class 10 Tests",
				link: "cbse-class-10",
				logo: "https://via.placeholder.com/70",
				totalTest: 60,
				totalFree: 8,
				category: "CBSE",
				popular: true,
				desp: [
					{ title: "Subject-wise tests" },
					{ title: "Chapter-wise questions" },
					{ title: "Sample papers" },
					{ title: "Board exam preparation" }
				]
			}
		];
		
		// Use mock data
		setT(mockTestSeries);
		let categories = ["Banking", "SSC", "Railways", "CBSE"];
		setCatg(categories);
		
		console.log("Using mock data for demonstration");
	}

	return (
		<StyledSeriesListContainer>
			<Container maxWidth="lg">
				{/* Hero Section */}
				<Box className="heroSection">
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
						<FcFlashOn style={{ fontSize: 42, marginRight: 8 }} />
						<Typography variant="h4" component="h1" gutterBottom>
							Test Series
						</Typography>
					</Box>
					<Typography variant="h6" component="h2" gutterBottom>
						Popular Test Series for Banking, SSC, Railways & CBSE
					</Typography>
					<Typography variant="body1">
						Enhance your preparation with our comprehensive test series
					</Typography>
				</Box>

				{/* Popular Test Series */}
				<Box sx={{ my: 4 }}>
					<Typography 
						variant="h5" 
						component="h2" 
						gutterBottom 
						sx={{ 
							pb: 1, 
							position: 'relative',
							'&:after': {
								content: '""',
								position: 'absolute',
								bottom: 0,
								left: 0,
								width: 60,
								height: 3,
								backgroundColor: theme.palette.primary.main,
								borderRadius: 1,
							}
						}}
					>
						Popular Test Series
					</Typography>
					
					<Box sx={{ mt: 3 }}>
						<SeriesCard lg={4} data={Tseries.filter((f) => f && f.popular === true) || []} />
					</Box>
				</Box>

				{/* Offer Section */}
				<FullOffer />

				{/* Category-wise Test Series */}
				<Box className="categorySection">
					<Typography 
						variant="h5" 
						component="h2" 
						gutterBottom 
						sx={{ 
							pb: 1, 
							position: 'relative',
							'&:after': {
								content: '""',
								position: 'absolute',
								bottom: 0,
								left: 0,
								width: 60,
								height: 3,
								backgroundColor: theme.palette.secondary.main,
								borderRadius: 1,
							}
						}}
					>
						Category-wise Test Series
					</Typography>
					
					<Grid container spacing={3} sx={{ mt: 2 }}>
						<Grid item size={{ xs: 12, md: 3 }}>
							<Paper className="tabsContainer" elevation={1}>
								<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
									<Typography variant="subtitle1" color="primary">
										Categories
									</Typography>
								</Box>
								<Tabs
									orientation={isMobile ? "horizontal" : "vertical"}
									variant="scrollable"
									value={tab}
									onChange={(e, v) => setTab(v)}
									className={isMobile ? "horizontalTabs" : "verticalTabs"}
									sx={{ 
										minHeight: isMobile ? 'auto' : 400,
									}}
									indicatorColor="primary"
									textColor="primary"
								>
									<Tab 
										label={
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<Box sx={{ mr: 1 }}>All</Box>
												<Chip 
													size="small" 
													label={Tseries.length} 
													color="primary"
													variant="outlined"
												/>
											</Box>
										} 
										value="All" 
									/>
									{allCatg.map((c, j) => (
										<Tab 
											key={j} 
											label={
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Box sx={{ mr: 1 }}>{c}</Box>
													<Chip 
														size="small" 
														label={Tseries.filter(t => t && t.category === c).length} 
														color="primary"
														variant="outlined"
													/>
												</Box>
											} 
											value={c} 
										/>
									))}
								</Tabs>
							</Paper>
						</Grid>
						<Grid item size={{ xs: 12, md: 9 }}>
							<Box sx={{ minHeight: '60vh' }}>
								<SeriesCard 
									lg={4} 
									data={tab === "All" ? 
										Tseries : 
										Tseries.filter((f) => f && f.category === tab) || []} 
								/>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</StyledSeriesListContainer>
	);
}

export default SeriesList;
