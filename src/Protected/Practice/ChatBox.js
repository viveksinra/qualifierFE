import React, { useState, useEffect, useContext, useCallback } from "react";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import {
	Avatar,
	Divider,
	Typography,
	makeStyles,
	Input,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	Zoom,
	InputAdornment,
	ListItemSecondaryAction,
} from "@material-ui/core";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { FaTelegramPlane, FaPaperclip, FaFileImage } from "react-icons/fa";

const chatStyles = makeStyles((theme) => ({
	rSide: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		padding: theme.spacing(),
		overflowX: "hidden",
		position: "sticky",
		top: 50,
		maxWidth: 310,
		height: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		boxShadow: "inset -6px -6px 10px rgba(255,255,255,0.5), inset 6px 6px 20px rgba(0,0,0,0.05)",
		overflowY: "auto",
	},
	rating: {
		width: 200,
		display: "flex",
		alignItems: "center",
	},
}));

function ChatBox() {
	const classes = chatStyles();
	const { Pstate } = useContext(PracContext);
	const [mycom, setMyCom] = useState("");
	const [solImg] = useState("");
	const [chatData, setChatData] = useState([]);
	const [userData, setUserData] = useState({});
	const [rating, setRating] = useState(0);

	const getChatData = useCallback(() => {
		let qid = Pstate.question._id;
		axios
			.get(`/api/private/qcomment/${qid}`)
			.then((res) => {
				setChatData(res.data.comments);
				setUserData(res.data.userData);
			})
			.catch((err) => console.log(err));
	}, [Pstate.question._id]);

	useEffect(() => {
		getChatData();
	}, [getChatData]);
	const postComment = () => {
		let data = { questionId: Pstate.question._id, text: mycom, solImg };
		axios
			.post("/api/private/qcomment", data)
			.then(() => {
				getChatData();
				setMyCom("");
			})
			.catch((err) => console.log(err));
	};
	const handleRating = (v) => {
		axios
			.post("/api/private/qrating", { questionId: Pstate.question._id, rating: +v })
			.then(() => setRating(v))
			.catch((err) => console.log(err));
	};
	const imgUpload = async (e) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			await axios
				.post(`/api/other/fileupload/upload`, imgData, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
					},
				})
				.then((res) => setChatData({ solImg: res.data.result.secure_url, ...chatData }))
				.catch((err) => console.log(err));
		}
	};
	return (
		<Zoom in={Pstate.submitted}>
			<div className={classes.rSide}>
				<Typography component="legend" color="textSecondary">
					Rate the Question
				</Typography>
				<div className={classes.rating}>
					<Rating name="hover-side" value={rating} precision={0.5} onChange={(e, v) => handleRating(v)} />
					{"\u00A0"}
					<Typography variant="subtitle2" className={classes.extendedIcon}>
						{RatingLabels[rating]}
					</Typography>
				</div>
				<br />
				<br />
				<Typography component="legend" color="textSecondary">
					Share your Feedback !
				</Typography>
				<Divider />
				<List dense style={{ webkit_scrollbar: { width: "5px" }, minHeight: 320 }}>
					{chatData.map((c, i) => (
						<ListItem dense disableGutters key={i}>
							<ListItemIcon>
								<Avatar alt={c.name} src={c.userImage} />
							</ListItemIcon>
							<ListItemText
								primary={c.name}
								secondary={
									c.solImg ? (
										<span>
											{c.text}
											<br />
											<a href={c.solImg} target="_blank" rel="noopener noreferrer">
												View Solution →
											</a>
										</span>
									) : (
										c.text
									)
								}
							/>
						</ListItem>
					))}
				</List>
				<List>
					<ListItem disableGutters button>
						<ListItemIcon>
							<Avatar alt="user" src={userData.image} />
						</ListItemIcon>
						<ListItemText>
							<Input
								fullWidth
								multiline
								value={mycom}
								onChange={(e) => setMyCom(e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										{chatData.solImg ? (
											<InputAdornment position="end">
												<FaFileImage />
											</InputAdornment>
										) : (
											<span>
												<input
													accept="image/*"
													style={{ display: "none" }}
													onChange={(e) => imgUpload(e.target.files[0])}
													id="attachment"
													type="file"
												/>
												<label htmlFor="attachment">
													<FaPaperclip style={{ color: "#2196f3" }} />
												</label>
											</span>
										)}
									</InputAdornment>
								}
								placeholder="Your comment..."
							/>
						</ListItemText>
						<ListItemSecondaryAction>
							<IconButton onClick={postComment} edge="end" color="primary" aria-label="delete">
								<FaTelegramPlane />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</div>
		</Zoom>
	);
}
export default ChatBox;

const RatingLabels = {
	0.5: "Poor+",
	1: "Very Easy",
	1.5: "Easy",
	2: "Just Ok",
	2.5: "Medium",
	3: "Ok+",
	3.5: "Good",
	4: "Perfect",
	4.5: "Excellent",
	5: "Excellent+",
};
