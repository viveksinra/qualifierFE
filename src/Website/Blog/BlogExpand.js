import React, { Fragment, useState, useEffect } from "react";
import {
	Paper,
	Container,
	AppBar,
	Toolbar,
	Zoom,
	Button,
	useScrollTrigger,
	Avatar,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { FcAdvance } from "react-icons/fc";
import { FullNav, HideOnScroll } from "../../Components/Navigation/Nav";
import axios from "axios";

import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

const PREFIX = 'BlogExpand';
const classes = {
	blogTopBg: `${PREFIX}-blogTopBg`,
	blogContainer: `${PREFIX}-blogContainer`,
	paper: `${PREFIX}-paper`,
	titleBox: `${PREFIX}-titleBox`,
	metaText: `${PREFIX}-metaText`,
	textBox: `${PREFIX}-textBox`,
	bottomNav: `${PREFIX}-bottomNav`,
	img: `${PREFIX}-img`
};

const StyledFragment = styled(Fragment)(({ theme }) => ({
	[`& .${classes.blogTopBg}`]: {
		backgroundColor: "#ffffff",
		paddingTop: theme.spacing(12),
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E\")",
		// backgroundAttachment: "fixed",
		backgroundSize: "cover",

		height: "20vh",
	},
	[`& .${classes.blogContainer}`]: {
		marginTop: theme.spacing(-10),
	},
	[`& .${classes.paper}`]: {
		boxShadow: "0 30px 50px 0 rgba(1,1,1,.15)",
		padding: theme.spacing(),
		marginBottom: 100,
		overflowX: "hidden",
		[theme.breakpoints.up("sm")]: {
			padding: theme.spacing(8, 12),
		},
		[`& > .${classes.img}`]: {
			width: "90%",
			display: "block",
			marginTop: theme.spacing(2),
			marginLeft: "auto",
			marginRight: "auto",
			maxHeight: "100%",
		},
	},
	[`& .${classes.titleBox}`]: {
		textAlign: "center",
		color: "darkblue",
		paddingBottom: theme.spacing(),
		"& > h1": {
			color: "#333333",
			margin: 0,
			fontSize: "larger",
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: "2rem",
		},
	},
	[`& .${classes.metaText}`]: {
		color: "slateblue",
		textAlign: "center",
	},
	[`& .${classes.textBox}`]: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	[`& .${classes.bottomNav}`]: {
		top: "auto",
		bottom: 0,
		color: theme.palette.primary[800],
		background: "#fff",
	},
}));

export default function BlogExpand({ match }) {
	const [data, setData] = useState({
		author: { name: "Qualifier", designation: "Admin", image: "https://vetdeniz.com/wp-content/uploads/2017/10/default-user.jpg" },
		category: { id: "", catgName: "" },
		img: "",
		link: "rrb-railway-2020",
		next: { link: "", title: "Next Blog" },
		subHeader: "Qualifer",
		text: "",
		title: "Please Wait...",
		type: "blogs",
	});
	useEffect(() => {
		let isActive = true;
		axios
			.get(`/api/blog/get/link/${match.params.link}`)
			.then((res) => {
				if (isActive) {
					setData(res.data);
				}
			})
			.catch((err) => console.log(err));
		return () => (isActive = false);
	}, [match.params.link]);
	document.title = `${data.title} Blog & News | Current Affairs and Articles Analysis Qualifier.co.in`;

	const trigger = useScrollTrigger({
		threshold: 300,
		disableHysteresis: true,
	});
	return (
		<StyledFragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<div className={classes.blogTopBg}></div>
			<Container className={classes.blogContainer}>
				<Paper className={classes.paper}>
					<div className={classes.titleBox}>
						<h1>{data.title}</h1>
					</div>
					{data && (
						<div className={classes.metaText}>
							{data.subHeader} &nbsp;/&nbsp; By: {data.author.name} &nbsp;/&nbsp; Categoty : {data.category.catgName}
						</div>
					)}
					{data.img && <img src={data.img} alt="blog" className={classes.img} />}
					{ReactHtmlParser(data.text)}
				</Paper>
			</Container>
			<Zoom in={trigger} timeout={2000}>
				<AppBar position="fixed" className={classes.bottomNav}>
					<Toolbar>
						<ListItemAvatar>
							<Avatar src={data.author && data.author.image} alt="Auther" />
						</ListItemAvatar>
						<ListItemText primary={data.author && data.author.name} secondary={data.author && data.author.designation} />
						<span style={{ flexGrow: 1 }} />
						<Link to={`/blog/${data.next.link}`}>
							<Button endIcon={<FcAdvance />} size="small" variant="text" color="secondary">
								{data.next && data.next.title}
							</Button>
						</Link>
					</Toolbar>
				</AppBar>
			</Zoom>
		</StyledFragment>
	);
}

// const text="<h2>RRC/RRB Railway Recruitment 2020: Interview in Western Railway, Eastern Railway and Other Railways for Coronavirus (COVID-19) Duty</h2><p>Ministry of Railways is inviting applications for various Paramedical Staff and Doctor Posts in isolation wards of hospitals across the country.</p><p><i>RRC/RRB Recruitment 2020</i></p><p>RRC/RRB Railway Recruitment 2020: Interviews are going for various paramedical posts such as Nursing Superintendent Nurses, Lab Attendant, Pharmacist, Housekeeping Staff and Doctor Posts (GDMO and Specialist)&nbsp; at&nbsp; Indian Railway various zones . All interested and eligible persons can appear for the interview on scheduled date and time in their choice of Indian Railway Divisions. Indian Railway Interview Details are given below in the table:</p><p>googletag.cmd.push(function() { googletag.display('top_300x250'); });</p><p>There are a total of 17 railways zones under Railway Recruitment Cell (RRC)/Railway Recruitment Board (RRB) such as Central Railway (CR), East Central Railway (ECR), East Coast Railway (ECR), Eastern Railway (ER), Metro Railway Kolkata (MRK), North Central Railway (NCR), North Eastern Railway (NER), North Western Railway (NWR), Northeast Frontier Railway (NFR), Northern RailwayS (NR), South Central Railway (SCR), South East Central Railway (SECR), South Eastern Railway (SER), South Western Railway (SWR), Southern Railway (SR), West Central Railway(WCR) and Western Railway (WR).</p><h2>Related Stories</h2><ul><li><a href="/articles/eastern-railway-recruitment-2020-1588579235-1?ref=rel_stories_inarticle">Eastern Railway Recruitment 2020, Interview for GDMO Posts</a></li><li><a href="/articles/western-railway-doctor-recruitment-2020-1588419416-1?ref=rel_stories_inarticle">Western Railway Recruitment 2020, Application Invited for Doctor Posts</a></li><li><a href="/articles/central-railway-recruitment-2020-1588312770-1?ref=rel_stories_inarticle">Central Railway Recruitment 2020: WhatsApp Interview for Doctor Posts</a></li><li><a href="/articles/western-railway-recruitment-2020-1588247481-1?ref=rel_stories_inarticle">Western Railway Recruitment 2020, Apply for Paramedical Posts</a></li><li><a href="/articles/western-railway-recruitment-2020-1588080892-1?ref=rel_stories_inarticle">Western Railway Recruitment 2020: Telephonic/ WhatsApp interview for 76 Nursing Superintendent &amp; Other Posts, Apply Online @wr.indianrailways.gov.in</a></li><li><a href="/articles/northern-railway-recruitment-2020-1587561558-1?ref=rel_stories_inarticle">Northern Railway Recruitment 2020: Walk in/Zoom/Skype Interview on 30 April for 36 Nursing Superintendent Posts, Details Here</a></li></ul><p>googletag.cmd.push(function() { googletag.display('bottom_300x250'); });</p><figure class="table"><table><tbody><tr><td><strong>Railway Zone/Notification Name</strong></td><td><strong>Last Date of Application/Interview Date</strong></td><td><strong>Railway Notification Link</strong></td></tr><tr><td><strong>Eastern Railway GDMO Jobs</strong><br>&nbsp;</td><td>&nbsp;06 May 2020</td><td><a href="https://www.jagranjosh.com/articles/eastern-railway-recruitment-2020-1588579235-1"><strong>Notification Link</strong></a></td></tr><tr><td><strong>Western Railway GDMO Jobs</strong></td><td>&nbsp;05 May 2020</td><td><a href="https://www.jagranjosh.com/articles/western-railway-doctor-recruitment-2020-1588419416-1"><strong>Notification Link</strong></a></td></tr><tr><td><strong>Central Railway Doctor Jobs</strong><br>&nbsp;</td><td>03 May 2020</td><td><a href="https://www.jagranjosh.com/articles/central-railway-recruitment-2020-1588312770-1"><strong>Notification Link</strong></a></td></tr><tr><td><strong>Western Railway Paramedical Jobs</strong><br>&nbsp;</td><td>05 May 2020</td><td><a href="https://www.jagranjosh.com/articles/western-railway-recruitment-2020-1588247481-1"><strong>Notification Link</strong></a></td></tr><tr><td><strong>Western Railway</strong><br>&nbsp;</td><td>30 April 2020</td><td><a href="https://www.jagranjosh.com/articles/nhm-nagpur-recruitment-2020-1588082634-1"><strong>Notification Link</strong></a></td></tr><tr><td><strong>Northern Railway&nbsp; 36 Nursing Superintendent&nbsp;</strong><br>&nbsp;</td><td>26 April 2020<br>&nbsp;</td><td><a href="https://testchampion.jagranjosh.com/free-pdf-page?file=northern-railway-recruitment-2020.pdf"><strong>Notification Link</strong></a></td></tr><tr><td><strong>Eastern Railway Paramedical Staff Recruitment&nbsp;</strong><br>&nbsp;</td><td>21 April 2020</td><td><a href="https://www.jagranjosh.com/articles/eastern-railway-paramedical-er-recruitment-2020-1587123159-1">Notification Link</a></td></tr><tr><td><strong>Northeast Railway Recruitment for Hospital Attendant</strong><br>&nbsp;</td><td>20 April 2020</td><td><a href="https://www.jagranjosh.com/articles/northeast-frontier-nf-railway-recruitment-2020-1587210436-1">Notification Link</a></td></tr><tr><td><strong>Southern Railway for 197 Para Medical Staff</strong><br>&nbsp;</td><td>22 April 2020<br>&nbsp;</td><td><a href="https://testchampion.jagranjosh.com/free-pdf-page?file=southern-railway-recruitment.pdf">Notification Link</a></td></tr><tr><td><strong>Central Railway Specialist Doctor Recruitment&nbsp;</strong><br>&nbsp;</td><td>20 April 2020</td><td><a href="https://www.jagranjosh.com/articles/central-railway-doctor-recruitment-2020-1586781601-1">Notification Link</a></td></tr><tr><td><strong>East Coast Recruitment 2020 for Doctor Posts</strong><br>&nbsp;</td><td>&nbsp;</td><td><a href="https://www.jagranjosh.com/articles/east-coast-railway-recruitment-2020-1586761483-1">Notification Link</a></td></tr><tr><td><strong>Northern Railway Recruitment for 134 Staff Nurse and Other Posts</strong><br>&nbsp;</td><td>17 April 2020</td><td><a href="https://www.jagranjosh.com/articles/northern-railway-recruitment-2020-1586610298-1">Notification Link</a></td></tr><tr><td><strong>South Central Railway for 204 Paramedical and Doctor Posts</strong></td><td>15 April 2020</td><td><a href="https://www.jagranjosh.com/articles/south-central-railway-recruitment-2020-1586613342-1">Notification Link</a></td></tr><tr><td><strong>Western Railway Recruitment for Doctor Posts</strong><br>&nbsp;</td><td>15 April 2020</td><td><a href="https://www.jagranjosh.com/articles/western-railway-doctor-recruitment-2020-1586525641-1">Notification Link</a></td></tr><tr><td><strong>Central Railway Recruitment for Group C Paramedical Posts</strong></td><td>14 April 2020</td><td><a href="https://www.jagranjosh.com/articles/central-railway-recruitment-2020-1586604114-1">Notification Link</a></td></tr><tr><td><strong>South East Central Railway Recruitment 2020 for 42 Doctor Posts</strong></td><td>13 April 2020</td><td><a href="https://www.jagranjosh.com/articles/south-east-central-railway-doctor-recruitment-2020-1586521615-1">Notification Link</a></td></tr><tr><td><strong>North Central Railway Recruitment for Doctor Posts</strong></td><td>14 April 2020</td><td><a href="https://www.jagranjosh.com/articles/north-central-railway-recruitment-2020-1586520119-1">Notification Link</a></td></tr><tr><td><strong>Southern Railway for 600 Paramedical and Other Posts</strong></td><td>15, 16 and 17 April 2020</td><td><a href="https://www.jagranjosh.com/articles/southern-railway-recruitment-2020-1586404810-1">Notification Link</a></td></tr><tr><td><strong>East Central Railway for Doctor Posts</strong></td><td>16 April 2020</td><td><a href="https://www.jagranjosh.com/articles/east-central-railway-recruitment-2020-1586415590-1">Notification Link</a></td></tr></tbody></table></figure><p>The railways is conducting interview through whatsapp video call/zoom/telephonic call. Candidates can check the eligibility, selection, salary, application process by through the notification links given below. Candidates can are advised to keep a track on this page for RRC/RRB Recruitment 2020 latest updates.</p>"
