import React, { Fragment, useState, Suspense, useMemo, useEffect } from "react";
import {
	Paper,
	Container,
	Grid,
	Divider,
	Typography,
	Chip,
	List,
	ListItem,
	FormLabel,
	CircularProgress,
	RadioGroup,
	FormControlLabel,
	Radio,
	ListItemText,
	Tabs,
	Tab,
	CardActions,
	InputBase,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { FullNav, HideOnScroll } from "../../Components/Navigation/Nav";
import { MdSearch } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { fetchData } from "../../Components/Api";
import { Head } from "../../Components/NameExp";
const resource = fetchData("/api/blog/get/filter/1/all/popular");
const blogCat = fetchData(`/api/blog/blogcat/get`);
const author = fetchData(`/api/blog/get/getuser`);
const tag = fetchData(`/api/blog/addtag/get`);

const BlogTopBackground = styled('div')(({ theme }) => ({
	backgroundColor: "#ffffff",
	paddingTop: theme.spacing(12),
	backgroundImage:
		"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E\")",
	// backgroundAttachment: "fixed",
	backgroundSize: "cover",
	fontSize: "2rem",
	textAlign: "center",
	height: "20vh",
}));

const BlogContainer = styled(Container)(({ theme }) => ({
	marginTop: theme.spacing(-10),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: 10,
}));

const BlogCard = styled('div')(({ theme }) => ({
	paddingBottom: 30,
	marginBottom: 30,
	borderBottom: "1px solid #e5e5e5",
}));

const BlogImage = styled('img')(({ theme }) => ({
	width: "100%",
	maxHeight: "100%",
	borderRadius: 10,
}));

const TextBox = styled('div')(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
}));

const ListTextItem = styled(ListItemText)(({ theme }) => ({
	color: "dodgerblue",
	transition: "all 0.2s ease-in-out",
	"&:hover, &:focus": {
		backgroundColor: theme.palette.grey[300],
		marginLeft: theme.spacing(2),
		borderRadius: "10px",
		paddingLeft: theme.spacing(),
		color: "#0135b7",
		paddingRight: theme.spacing(),
	},
}));

const Search = styled('div')(({ theme }) => ({
	position: "relative",
	marginBottom: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	border: "1px double #00eeff",
	backgroundColor: alpha("#2196f3", 0.15),
	"&:hover": {
		backgroundColor: alpha("#2196f3", 0.25),
	},
	width: "100%",
	overflow: "hidden",
}));

const SearchIcon = styled('div')(({ theme }) => ({
	width: theme.spacing(7),
	marginBottom: theme.spacing(),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create("width"),
		maxWidth: "80%",
		[`@media (min-width:${theme.breakpoints.values.md}px)`]: {
			width: 1000,
		},
	}
}));

export default function Blog() {
	const [page, setPage] = useState(2);
	const [type, setType] = useState("all");
	const [tabValue, setTabValue] = useState(0);
	const [catg, setCatg] = useState(null);
	const [newData, setNewD] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const scrolled = window.scrollY;
			if (Math.ceil(scrolled) === Math.ceil(scrollable)) {
				// alert("You reached the bottom");
				setPage((page) => +page + 1);
			}
		});
	}, []);

	useEffect(() => {
		let active = true;
		let order = "popular";
		if (tabValue === 1) order = "latest";
		if (catg) {
			var link = `/api/blog/get/filter/${page}/${type}/${order}/${catg.title}/${catg.value}`;
		} else {
			link = `/api/blog/get/filter/${page}/${type}/${order}`;
		}
		setLoading(true);
		axios
			.get(link)
			.then((res) => {
				if (active) {
					if (res.data.length !== 0) {
						setNewD(res.data);
					} else setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(true);
			});
		return () => (active = false);
	}, [page, type, tabValue, catg]);

	const filerCard = useMemo(() => <FilterCard setCatg={(c) => setCatg(c)} setPage={(p) => setPage(p)} />, []);

	return (
		<Fragment>
			<Head>
				<title>Blog & News | Current Affairs and Articles Analysis - Get all info & Stay updated With Qualifier.co.in</title>
				<meta
					name="description"
					content="Read Awesome Blogs, to the point news, editorial analysis of daily articles, all the info of Placement Exams, Railway Exams, CBSE, and much more. Specialy on Qualifier.co.in"
				/>
			</Head>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<BlogTopBackground>Blogs & News</BlogTopBackground>
			<BlogContainer>
				<Grid container spacing={2}>
					<Grid item size={{xs: 12,  md: 9 }} >
						<StyledPaper>
							<Grid container>
								<Grid item>
									<RadioGroup
										aria-label="position"
										value={type}
										onChange={(e) => {
											setType(e.target.value);
											setPage(1);
										}}
										name="position"
										row
									>
										<FormControlLabel value="all" control={<Radio color="primary" size="small" />} label="All" labelPlacement="end" />
										<FormControlLabel value="blogs" control={<Radio color="primary" size="small" />} label="Blog" labelPlacement="end" />
										<FormControlLabel value="news" control={<Radio color="primary" size="small" />} label="News" labelPlacement="end" />
									</RadioGroup>
								</Grid>
								<span style={{ flexGrow: 1 }} className="hideInMob" />
								<Grid item>
									<Tabs
										value={tabValue}
										onChange={(e, v) => {
											setTabValue(v);
											setPage(1);
										}}
										aria-label="simple tabs example"
									>
										<Tab label="Popular" />
										<Tab label="Latest" />
									</Tabs>
								</Grid>
							</Grid>
							<Suspense fallback={<CircularProgress />}>
								{<BlogCardComponent page={page} newData={newData} setNewD={setNewD} />}
							</Suspense>
						</StyledPaper>
					</Grid>
					<Grid item size={{xs: 12, md:3 }} >
						<Suspense fallback={<CircularProgress />}>{filerCard}</Suspense>
					</Grid>
				</Grid>
			</BlogContainer>
		</Fragment>
	);
}

const BlogCardComponent = ({ page, newData, setNewD }) => {
	const [data, setData] = useState(resource.data.read());

	useEffect(() => {
		if (newData) {
			if (page === 1) {
				setData(newData);
			} else {
				setData((old) => [...old, ...newData]);
			}
			setNewD(null);
		}
	}, [newData, page, setNewD]);
	
	return (
		<Fragment>
			{data &&
				data.map((d, j) => (
					<Grid container key={j} spacing={3} component={BlogCard}>
						<Grid item size={{xs: 12,sm:4 }} >
							<Link key={j} to={`/blog/${d.link}`}>
								<BlogImage alt={d.title} src={d.img} />
							</Link>
						</Grid>
						<Grid item size={{xs: 12, sm: 8}} component={TextBox}>
							<Link to={`/blog/${d.link}`}>
								<Typography variant="h6" noWrap color="primary">
									{d.title}
								</Typography>
							</Link>
							<Typography variant="body1" color="textSecondary" gutterBottom>
								{`${d.category && d.category.catgName}  |  ${d.subHeader}`}
							</Typography>

							<CardActions disableSpacing>
								<Link to={`/blog/${d.link}`}>
									<Chip variant="outlined" style={{ cursor: "grab" }} label="Read More" color="primary" />
								</Link>
								<span style={{ flexGrow: 1 }} />

								<Typography align="right" color="primary">
									Author : {d.author}
								</Typography>
							</CardActions>
						</Grid>
					</Grid>
				))}
			<br />
		</Fragment>
	);
};

const FilterCard = ({ setCatg, setPage }) => {
	return (
		<StyledPaper style={{ position: "sticky", top: 50 }} elevation={4}>
			<Search>
				<SearchIcon>
					<MdSearch />
				</SearchIcon>
				<StyledInputBase
					placeholder="Search..."
					// onChange={(e) => changeWord(e.target.value)}
					inputProps={{ "aria-label": "search" }}
				/>
			</Search>
			<FormLabel component="legend">Categories</FormLabel>
			<List dense>
				{blogCat.data.read().map((c) => (
					<ListItem
						key={c._id}
						dense
						disableGutters
						onClick={() => {
							setCatg({ title: "category", value: c._id });
							setPage(1);
						}}
					>
						<ListTextItem primary={`»${"\u00A0"} ${c.catgName}`} />
					</ListItem>
				))}
			</List>
			<Divider />
			<br />
			<FormLabel component="legend">Created by</FormLabel>
			<List dense>
				{author.data.read().map((c) => (
					<ListItem
						key={c._id}
						dense
						disableGutters
						onClick={() => {
							setCatg({ title: "author", value: c._id });
							setPage(1);
						}}
					>
						<ListTextItem primary={`»${"\u00A0"} ${c.author}`} />
					</ListItem>
				))}
			</List>
			<Divider />
			<br />
			<FormLabel component="legend">Most Common Tags</FormLabel>
			<br />
			{tag.data.read().map((t) => (
				// <Link key={t.link}  to={`/tags/${t.link}`}>
				<Chip
					key={t.link}
					style={{ marginTop: "5px", marginRight: "5px", cursor: "grab" }}
					onClick={() => {
						setCatg({ title: "tag", value: t.link });
						setPage(1);
					}}
					label={t.keyword}
					variant="outlined"
					size="small"
				/>
				// </Link>
			))}
		</StyledPaper>
	);
};
