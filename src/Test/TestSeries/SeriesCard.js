import React from "react";
import {
	Grid,
	Card,
	Typography,
	List,
	ListItem,
	ListItemText,
	Button,
	Alert,
	Box,
	Chip,
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";

// Series Card styled component
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

export default SeriesCard; 