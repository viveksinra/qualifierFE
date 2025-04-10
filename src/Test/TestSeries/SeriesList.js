import React, { useState, useEffect } from "react";
import {
	Container,
	Box,
	Typography,
	Button,
	Alert,
	Skeleton,
	Grid,
	useMediaQuery,
} from "@mui/material";
import { styled, useTheme, alpha } from '@mui/material/styles';
import "../TestHome/common.css";
import { FullOffer } from "../../Components/Decoration/OfferCard";
import { FcFlashOn } from "react-icons/fc";
import axios from "axios";
import { isQualifier } from "../../theme";
import PopularTestSeries from "./PopularTestSeries";
import CategoryWiseSection from "./CategoryWiseSection";
import SeriesCardSkeleton from "./SeriesCardSkeleton";

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
}));

function SeriesList() {
	const theme = useTheme();

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



	return (
		<StyledSeriesListContainer>
			<Container maxWidth="lg">
				{/* Hero Section */}
{isQualifier &&	<Box className="heroSection">
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
				</Box>}

				{/* Popular Test Series */}
				<PopularTestSeries testSeries={Tseries} />

				{/* Offer Section */}
			{isQualifier && <FullOffer />}

				{/* Category-wise Test Series */}
				<CategoryWiseSection testSeries={Tseries} categories={allCatg} />
			</Container>
		</StyledSeriesListContainer>
	);
}

export default SeriesList;
