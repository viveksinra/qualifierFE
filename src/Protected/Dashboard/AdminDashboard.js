import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { 
	Box, 
	Card, 
	CardContent, 
	Divider, 
	Grid, 
	Typography,
	useTheme,
	Button,
	CircularProgress 
} from "@mui/material";
import { 
	FcList, 
	FcReading,
	FcAddDatabase,
	FcQuestions,
	FcDocument,
	FcAdvertising,
	FcRating,
	FcServices,
	FcTimeline,
	FcCollaboration,
	FcSupport,
	FcHighPriority,
	FcDataBackup
} from "react-icons/fc";
import { FcRefresh } from "react-icons/fc";
import axios from "axios";

export default function AdminDashboard() {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	
	// Function to refresh FastAPI data
	const refreshFastApis = async () => {
		try {
			setLoading(true);
			
			// Call the API endpoints
			await axios.get('/api/fastapi/bigtest/seriesdata/waslink');
			await axios.get('/api/fastapi/bigtest/main/get');
			await axios.get('/api/fastapi/practice/getall/wascatlink');
			
			// Show success message (could be replaced with a proper toast notification)
			alert("APIs refreshed successfully!");
		} catch (error) {
			console.error("Error refreshing APIs:", error);
			alert("Failed to refresh APIs. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	
	// Group data into categories
	const categories = {
		"Content Management": data.slice(0, 6),
		"Test Management": data.slice(6, 10),
		"User Interactions": data.slice(10, 13),
		"Other": data.slice(13, 15)
	};
	
	const getIcon = (title) => {
		switch(title) {
			case "Add Category": return <FcList size={24} />;
			case "Add Course": return <FcReading size={24} />;
			case "Add Subject": return <FcAddDatabase size={24} />;
			case "Add Chapter": return <FcDocument size={24} />;
			case "Add Question": return <FcQuestions size={24} />;
			case "Add Blog": return <FcAdvertising size={24} />;
			case "Add Promo Code": return <FcRating size={24} />;
			case "Add A Test": return <FcServices size={24} />;
			case "Add Section of Test": return <FcTimeline size={24} />;
			case "Add Test Series": return <FcCollaboration size={24} />;
			case "See Contact Request": return <FcSupport size={24} />;
			case "Reported Question List": return <FcHighPriority size={24} />;
			case "Transfer Question": return <FcDataBackup size={24} />;
			case "Reviews": return <FcRating size={24} />;
			case "Website Images": return <FcDataBackup size={24} />;
			default: return null;
		}
	};

	return (
		<Fragment>
			<Box sx={{ mb: 4, textAlign: 'center' }}>
				<Typography variant="h4" gutterBottom>
					Welcome to Administration!
				</Typography>
				<Typography variant="body1" color="textSecondary">
					Manage your educational content and user interactions from this central dashboard
				</Typography>
				<Button 
					variant="contained" 
					color="primary"
					onClick={refreshFastApis}
					disabled={loading}
					startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FcRefresh />}
					sx={{ mt: 2 }}
				>
					{loading ? "Refreshing..." : "Refresh FastAPIs"}
				</Button>
			</Box>
			
			{Object.entries(categories).map(([category, items]) => (
				<Box key={category} sx={{ mb: 4 }}>
					<Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
						{category}
					</Typography>
					<Divider sx={{ mb: 3 }} />
					<Grid container spacing={2}>
						{items.map((item) => (
							<Grid item key={item.link} size={{xs: 12, sm: 6, md: 4}}>
								<Card 
									component={Link} 
									to={item.link} 
									sx={{ 
										height: '100%', 
										display: 'flex', 
										flexDirection: 'column',
										transition: 'transform 0.2s, box-shadow 0.2s',
										textDecoration: 'none',
										'&:hover': {
											transform: 'translateY(-4px)',
											boxShadow: theme.shadows[6]
										}
									}}
								>
									<CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
										{getIcon(item.title)}
										<Typography variant="h6" sx={{ mt: 2, textAlign: 'center', color: 'text.primary' }}>
											{item.title}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Fragment>
	);
}

const data = [
	{
		title: "Add Category",
		link: "/admin/addcategory",
	},
	{
		title: "Add Course",
		link: "/admin/addcourse",
	},
	{
		title: "Add Subject",
		link: "/admin/addsubject",
	},
	{
		title: "Add Chapter",
		link: "/admin/addchapter",
	},
	{
		title: "Add Question",
		link: "/admin/addquestion",
	},
	{
		title: "Add Blog",
		link: "/admin/addblog",
	},
	{
		title: "Add Promo Code",
		link: "/admin/addpromo",
	},
	{
		title: "Add A Test",
		link: "/admin/addtest",
	},
	{
		title: "Add Section of Test",
		link: "/admin/addtestsection",
	},
	{
		title: "Add Test Series",
		link: "/admin/addtestseries",
	},
	{
		title: "See Contact Request",
		link: "/admin/message",
	},
	{
		title: "Reported Question List",
		link: "/admin/reportedquestion",
	},
	{
		title: "Transfer Question",
		link: "/admin/transferquestion",
	},
	{
		title: "Reviews",
		link: "/admin/reviews",
	},
	{
		title: "Website Images",
		link: "/admin/websiteimages",
	},

];
