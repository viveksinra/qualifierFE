import React, { Fragment, useMemo, useState } from "react";
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
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import "../TestHome/common.css";
import { Link } from "react-router-dom";
import { FullOffer } from "../../Components/Decoration/OfferCard";
import { FcFlashOn, FcApproval } from "react-icons/fc";
import clsx from "clsx";
import { fetchData } from "../../Components/Api";

// Create resource with error handling
let resource;
try {
	resource = fetchData("/api/bigtest/testbundle/main/get");
	console.log(resource);
} catch (error) {
	console.error("Failed to initialize test series data fetch:", error);
	resource = { data: { read: () => { throw error; } } };
}

// Retry function for when data fails to load
const retryFetch = () => {
	try {
		resource = fetchData("/api/bigtest/testbundle/main/get");
		// Force re-render
		window.location.reload();
	} catch (error) {
		console.error("Retry failed:", error);
	}
};

// Styles for SeriesList component
const seriesListPrefix = 'SeriesList';
const seriesListClasses = {
	bundle: `${seriesListPrefix}-bundle`,
	header: `${seriesListPrefix}-header`,
	catgWise: `${seriesListPrefix}-catgWise`,
	tabs: `${seriesListPrefix}-tabs`
};

const StyledSeriesListContainer = styled('div')(({ theme }) => ({
	[`& .${seriesListClasses.bundle}`]: {
		padding: "20px 0px",
	},
	[`& .${seriesListClasses.header}`]: {
		height: 80,
		color: "#2196f3",
		fontSize: 30,
		textAlign: "center",
	},
	[`& .${seriesListClasses.catgWise}`]: {
		minHeight: 600,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	[`& .${seriesListClasses.tabs}`]: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));

// Styles for SeriesCard component
const seriesCardPrefix = 'SeriesCard';
const seriesCardClasses = {
	cardBox: `${seriesCardPrefix}-cardBox`,
	card: `${seriesCardPrefix}-card`,
	avatar: `${seriesCardPrefix}-avatar`,
	icon: `${seriesCardPrefix}-icon`
};

const StyledCardGridContainer = styled(Grid)(({ theme }) => ({
	[`& .${seriesCardClasses.cardBox}`]: {
		display: "flex",
		justifyContent: "center",
		"& a": {
			textDecoration: "none",
		},
	},
	[`& .${seriesCardClasses.card}`]: {
		height: 300,
		width: 230,
		padding: theme.spacing(2),
		overflow: "hidden",
		position: "relative",
		background: "linear-gradient(to bottom, #6dd5fa,  #C9D6FF, #ffffff)",
		// transition: "transform 0.1s",
		// "&:hover": {
		// 	background: "linear-gradient(to left, #6dd5fa,  #C9D6FF, #ffffff)",
		// 	transform: "scale(1.02)",
		// },
	},
	[`& .${seriesCardClasses.avatar}`]: {
		height: theme.spacing(7),
	},
	[`& .${seriesCardClasses.icon}`]: {
		fontSize: "larger",
		marginRight: 15,
	},
}));

function SeriesList() {
	const theme = useTheme();
	const isMobile = theme.breakpoints.down('md');

	const [tab, setTab] = useState("All");
	const [Tseries, setT] = useState([]);
	const [allCatg, setCatg] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

	// Use useEffect instead of useMemo to handle the async data loading
	React.useEffect(() => {
		let isMounted = true;
		const loadData = async () => {
			try {
				// Handle data loading safely
				const Ts = await resource.data.read();
				if (isMounted) {
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
				}
			} catch (err) {
				console.error("Error loading test series data:", err);
				if (isMounted) {
					setError(err);
					setT([]);
					setCatg([]);
					setIsLoaded(true);
				}
			}
		};
		
		loadData();
		
		return () => {
			isMounted = false;
		};
	}, []);

	// Error UI
	if (error) {
		return (
			<Container>
				<Box sx={{ my: 4, textAlign: 'center' }}>
					<Alert severity="error" sx={{ mb: 2 }}>
						Failed to load test series data. Please try again later.
					</Alert>
					<Button 
						variant="contained" 
						color="primary" 
						onClick={retryFetch}
					>
						Retry
					</Button>
				</Box>
			</Container>
		);
	}

	// Empty data UI
	if (isLoaded && Tseries.length === 0) {
		return (
			<Container>
				<Box sx={{ my: 4, textAlign: 'center' }}>
					<Alert severity="info" sx={{ mb: 2 }}>
						No test series available at the moment. Please check back later.
					</Alert>
				</Box>
			</Container>
		);
	}

	return (
		<Fragment>
			<StyledSeriesListContainer>
				<div className={seriesListClasses.bundle}>
					<Container>
						<div className={clsx(seriesListClasses.header, "center")}>
							<FcFlashOn />
							<h6>Popular Test Series for Banking, SSC, Railways & CBSE</h6>
						</div>
						<br />
						<SeriesCard lg={3} data={Tseries.filter((f) => f && f.popular === true) || []} />
					</Container>
				</div>
				<FullOffer />
				<div className={seriesListClasses.catgWise}>
					<Container>
						<Grid container spacing={2}>
							<Grid item size={{xs: 12, md:3 }} >
								<Typography variant="subtitle1" align="center" gutterBottom color="primary">
									Category Wise : Test Series
								</Typography>
								<Tabs
									orientation={isMobile ? "horizontal" : "vertical"}
									variant="scrollable"
									textColor="secondary"
									value={tab}
									onChange={(e, v) => setTab(v)}
									className={seriesListClasses.tabs}
								>
									<Tab label="All" value="All" />
									{allCatg.map((c, j) => (
										<Tab label={c} key={j} value={c} />
									))}
								</Tabs>
							</Grid>
							<Grid item size={{xs: 12,  md: 9 }} >
								<SeriesCard 
									lg={4} 
									data={tab === "All" ? 
										Tseries : 
										Tseries.filter((f) => f && f.category === tab) || []} 
								/>
							</Grid>
						</Grid>
					</Container>
				</div>
			</StyledSeriesListContainer>
		</Fragment>
	);
}

export default SeriesList;

function SeriesCard({ data, lg }) {
	if (!data || data.length === 0) {
		return (
			<Box sx={{ p: 2, textAlign: 'center' }}>
				<Typography color="textSecondary">No test series available in this category</Typography>
			</Box>
		);
	}

	return (
		<StyledCardGridContainer container spacing={2}>
			{data.map((t, i) => (
				t && (
					<Grid item size={{xs: 12, sm: 6, lg}} key={i} className={seriesCardClasses.cardBox}>
						<Card className={clsx(seriesCardClasses.card, "shine")} elevation={3}>
							<Link to={`/test/${t.link}`}>
								<img className={seriesCardClasses.avatar} alt={t.title} src={t.logo} />
								<Typography noWrap variant="h6">
									{t.title}
								</Typography>
								<Grid container>
									<Grid item>
										<Typography gutterBottom>{`${t.totalTest} Total Test`}</Typography>
									</Grid>
									<span style={{ flexGrow: 0.1 }} />
									<Grid item>
										<Typography gutterBottom style={{ color: "#e500ff" }}>{`  |  ${t.totalFree} Free Test`}</Typography>
									</Grid>
								</Grid>
								<Divider light />
								<List dense style={{ height: 135, overflow: "hidden" }}>
									{t.desp &&
										t.desp.map((l, j) => (
											<ListItem dense key={j} style={{ paddingTop: 1, paddingBottom: 1 }}>
												<FcApproval className={seriesCardClasses.icon} />
												<ListItemText disableTypography primary={l.title} />
											</ListItem>
										))}
								</List>
								<Divider light />
								<center>
									<Button size="small" style={{ marginTop: 5 }} variant="outlined" color="primary">
										View All
									</Button>
								</center>
							</Link>
						</Card>
					</Grid>
				)
			))}
		</StyledCardGridContainer>
	);
}
