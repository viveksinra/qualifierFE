import React, { useState, useEffect, useContext, lazy } from "react";
import { Nav } from "../../Components/Navigation/Nav";
import Backdrop from "../../Components/Backdrop";
import CourseHome from "./CourseHome";
import CourseAnalysis from "./CourseAnalysis";
import SavedQuestion from "./SavedQuestion";
import { MainContext } from "../../Components/Context/MainContext";
import { styled, Fab, Tabs, Tab, Badge } from "@mui/material";
import axios from "axios";
const MyDrawer = lazy(() => import("../../Components/Navigation/MyDrawer"));
const Notify = lazy(() => import("./Notify"));

const RootContainer = styled('div')(({ theme }) => ({
	display: "flex",
}));

const ContentContainer = styled('main')(({ theme }) => ({
	flexGrow: 1,
}));

const BodyContainer = styled('div')(({ theme }) => ({
	paddingLeft: theme.spacing(),
	paddingRight: theme.spacing(),
}));

const TopBanner = styled('div')(({ theme }) => ({
	backgroundRepeat: "no-repeat",
	paddingTop: 20,
	backgroundSize: "cover",
	borderRadius: "5px solid red",
	width: "100%",
	textAlign: "center",
	background: `url("https://res.cloudinary.com/qualifier/image/upload/v1585161991/topBG_fh7d7u.png")`,
	"& h2": {
		fontSize: 22,
		fontWeight: 700,
		color: "mediumpurple",
		margin: 0,
	},
	"& p": {
		maxWidth: 700,
	},
}));

const StyledFab = styled(Fab)(({ theme }) => ({
	background: "linear-gradient(90deg, #BA81FF 0%, #FF6A95 99%)",
	marginTop: theme.spacing(),
	color: "#fff",
}));

export default function Course({ match }) {
	const { state } = useContext(MainContext);
	const [course, setCourse] = useState({});
	const [tab, setTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const [notify, setNotify] = useState({ open: false, link: "" });
	document.title = `${course.courseTitle} - Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE`;

	useEffect(() => {
		setLoading(true);

		let isSubscribed = true;
		if (state.isAuthenticated) {
			var link = `/api/public/fixcourse/auth/getall/${match.params.corslink}`;
		} else {
			link = `/api/public/fixcourse/getall/${match.params.corslink}`;
		}
		axios
			.get(link)
			.then((res) => {
				if (isSubscribed) {
					setCourse(res.data);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
		return () => {
			isSubscribed = false;
			setNotify({ open: false });
		};
	}, [match.params.corslink, state.isAuthenticated]);

	useEffect(() => {
		if (match.params.chaplink) {
			setNotify({
				open: true,
				link: `/practice/start/${match.params.catlink}/${match.params.corslink}/${match.params.sublink}/${match.params.chaplink}`,
			});
		} else if (match.params.sublink) {
			setNotify({ open: true, link: `/practice/start/${match.params.catlink}/${match.params.corslink}/${match.params.sublink}` });
		}
	}, [match.params]);
	return (
		<RootContainer>
			<Nav />
			<MyDrawer />

			<ContentContainer>
				<div style={{ ...theme.mixins.toolbar }} />

				<TopBanner>
					<div className="center" style={{ flexDirection: "column" }}>
						<Badge badgeContent={course.highlight && course.highlight}>
							<h2>{course.courseTitle}</h2>
						</Badge>
						<p>{course.description}</p>
						<StyledFab
							variant="extended"
							onClick={() => setNotify({ open: true, link: `/practice/start/${match.params.catlink}/${match.params.corslink}` })}
							size="medium"
						>
							Start Full Practice
						</StyledFab>
					</div>
					<Tabs textColor="primary" value={tab} onChange={(e, t) => setTab(t)} aria-label="simple tabs example">
						<Tab label="Home" value={0} />
						<Tab label="Analysis" value={1} />
						<Tab label="Saved Questions" value={2} />
					</Tabs>
				</TopBanner>

				<Backdrop open={loading} />
				<BodyContainer>
					{tab === 0 && <CourseHome data={course} match={match} />}
					{tab === 1 && <CourseAnalysis link={`course/${match.params.corslink}`} />}
					{tab === 2 && <SavedQuestion link={match.params.corslink} />}
				</BodyContainer>
				<Notify notify={notify} match={match} onClose={(v) => setNotify({ open: false })} />
			</ContentContainer>
		</RootContainer>
	);
}
