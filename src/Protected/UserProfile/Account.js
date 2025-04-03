import React, { useState, Fragment, useEffect } from "react";
import Right from "../../img/right.svg";
import {
	Button,
	Typography,
	Divider,
	Grid,
	Avatar,
	IconButton,
	Table,
	TableBody,
	CardActions,
	TableRow,
	TableCell,
	Chip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";

const PREFIX = 'Account';
const classes = {
	shareBox: `${PREFIX}-shareBox`,
	profileTable: `${PREFIX}-profileTable`,
	promocard: `${PREFIX}-promocard`,
	refLi: `${PREFIX}-refLi`
};

const StyledFragment = styled(Fragment)(({ theme }) => ({
	[`& .${classes.shareBox}`]: {
		background: 'url("https://res.cloudinary.com/qualifier/image/upload/v1585249453/share_obofnm.svg")',
		backgroundSize: "contain",
		backgroundPositionY: "bottom",
		backgroundRepeat: "no-repeat",
		minHeight: 320,
	},
	[`& .${classes.profileTable}`]: {
		marginTop: 20,
	},
	[`& .${classes.promocard}`]: {
		width: "100%",
	},
	[`& .${classes.refLi}`]: {
		marginLeft: 5,
		lineHeight: 1.5,
		fontSize: 16,
	},
}));

export default function Account() {
	const [accountData, setAccountData] = useState([]);
	const [promo, setPromo] = useState({ refData: [], promoCode: "", message: "" });
	useEffect(() => {
		axios
			.get("/api/other/setting/user")
			.then((res) => {
				setAccountData(res.data);
			})
			.catch((err) => console.log(err));
		axios
			.get("/api/other/setting/promo")
			.then((res) => setPromo(res.data))
			.catch((err) => console.log(err));
	}, []);

	const terms = [
		{ text: "This referral program is only applicable if a friend is new user for Qualifier.co.in and has never made a purchase before." },
		{ text: "For Referred Friends, they need to sign up at Qualifier.co.in & use the Promo code or link before making any purchase." },
		{ text: "Qualifier.co.in has complete authority to change the reward amount at any point of time." },
		{ text: "No refunds will be made to Referred Friend after purchase of Course." },
		{ text: "Each Successful purchases during the offer period will contribute as amount as available on that time." },
		{ text: "In case of any forgery or attempt to cheat can cause your account deactivation." },
		{ text: "Sharing of your personal account with any other can also cause your account deactivation." },
	];
	const sharelink = [
		{
			name: "google",
			icon: "https://i.ibb.co/3NTc9MD/Gicon.png",
			link: `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=Get%20Qualifier%20Access%20for%20All%20Exams%20with%2010%25%20Instant%20discount%21&body=Hi%2C%20%0D%0A%20%0D%0A%20Learn%20and%20Earn%20with%20Qualifier.%20Get%20a%2010%20%25%20instant%20discount%20on%20your%20first%20purchase%21%20Preparing%20for%20Govt.%20Exams%20%2C%20Placement%20Exams%2C%20Cbse%20Exams%20etc.%3F%20If%20yes%2C%20Qualifier%20is%20your%20solution.%20Attempt%2075000%2B%20Question%20for%2050%2B%20Exams.%20Get%20your%20Qualifier%20Pakage%20today%21%20Use%20my%20referral%20link%20https%3A%2F%2FQualifier.co.in%2Finvite%2F${promo.promoCode}%20or%20code%20${promo.promoCode}%0D%0A%20%0D%0A%20Thank%20you!`,
		},
		{
			name: "twitter",
			icon: "https://i.ibb.co/tm1yX1f/Twitter-Social-Icon-Circle-Color.png",
			link: `https://twitter.com/intent/tweet?text=Learn%20and%20Earn%20with%20Qualifier.%20Get%20a%2010%25%20instant%20discount%20on%20your%20first%20purchase%21%20Preparing%20for%20Govt.%20Exams%2C%20Placement%20Exams%2C%20Cbse%20Exams%20etc.%3F%20If%20yes%2C%20Qualifier%20is%20your%20solution.%20Use%20my%20referral%20link%20https%3A%2F%2FQualifier.co.in%2Finvite%2F${promo.promoCode}%20or%20code%20${promo.promoCode}`,
		},
		{
			name: "whatsapp",
			icon: "https://cdn.worldvectorlogo.com/logos/whatsapp-icon.svg",
			link: `https://api.whatsapp.com/send?text=Learn%20and%20Earn%20with%20Qualifier.%20Get%2010%25%20instant%20discount%20on%20your%20first%20purchase%21%20Preparing%20for%20Govt.%20Exams%2C%20Placement%20Exams%2C%20Cbse%20Exams%2C%20etc.%3F%20If%20yes%2C%20Qualifier%20Pakage%20is%20your%20solution.%20Attempt%2075000%2B%20Questions%20for%2050%2B%20Exams.%20Get%20your%20Qualifier%20Pakage%20today%21%20Use%20my%20referral%20link%20https%3A%2F%2Fqualifier.com%2Finvite%2F${promo.promoCode}%20or%20code%20${promo.promoCode}`,
		},
		{
			name: "facebook",
			icon: "https://cdn.worldvectorlogo.com/logos/facebook-3.svg",
			link: `https://www.facebook.com/v2.8/dialog/share?app_id=2511172382458415&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D46%23cb%3Df28a51069681a5%26domain%3Dqualifier.co.in%26origin%3Dhttps%253A%252F%252Fqualifier.co.in%252Ff3f1eafef7f561%26relation%3Dopener&display=popup&e2e=%7B%7D&fallback_redirect_uri=https%3A%2F%2Fqualifier.co.in%2Fprofile&href=https%3A%2F%2Fqualifier.co.in%2Finvite%2F${promo.promoCode}&locale=en_US&next=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D46%23cb%3Dfee0e43ccb7674%26domain%3Dqualifier.co.in%26origin%3Dhttps%253A%252F%252Fqualifier.co.in%252Ff3f1eafef7f561%26relation%3Dopener%26frame%3Df12f1f776cd75b%26result%3D%2522xxRESULTTOKENxx%2522&quote=Learn%20and%20Earn%20with%20Qualifier.%20Get%2010%25%20instant%20discount%20on%20your%20first%20purchase!%20Preparing%20for%20Govt.%20Exams%2C%20Placement%20Exams%2C%20Cbse%20Exams%2C%20etc.%3F%20If%20yes%2C%20Qualifier%20Pakage%20is%20your%20solution.%20Attempt%2075000%2B%20Questions%20for%2050%2B%20Exams.%20Get%20your%20Qualifier%20Pakage%20today!%20Use%20my%20referral%20link%20https%3A%2F%2Fqualifier.co.in%2Finvite%2F${promo.promoCode}%20or%20code%20${promo.promoCode}&sdk=joey&version=v2.8`,
		},
	];
	const clickCopy = () => {
		let cp = `https://qualifier.co.in/invite/${promo.promoCode}`;
		var textField = document.createElement("textarea");
		textField.innerText = cp;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand("copy");
		textField.remove();
		alert("Promo Code Copied");
	};
	return (
		<StyledFragment>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<img
						src="https://res.cloudinary.com/qualifier/image/upload/v1585244359/promocard_vcdipe.svg"
						alt="Promo-Card"
						className={classes.promocard}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<br />
					<Typography align="center" gutterBottom variant="h5" color="primary">
						Account Details
					</Typography>
					<Table className={classes.profileTable} size="small" aria-label="Transaction-Data">
						<TableBody>
							{accountData.map((d) => (
								<TableRow hover key={d.name}>
									<TableCell style={{ width: "50%" }} align="right">
										<b>{d.name}</b>
									</TableCell>
									<TableCell>
										{typeof d.value === "string"
											? d.value
											: typeof d.value === "object"
											? d.value.map((l, j) => <Chip size="small" key={j} style={{ marginRight: 5 }} label={l.title} />)
											: null}
										{"\u00A0"}
										{"\u00A0"}
										{d.verified ? (
											<IconButton size="small" color="primary">
												<img src={Right} alt="right" />
											</IconButton>
										) : null}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography align="center" gutterBottom color="primary">
						Your Promo Code
					</Typography>
					<Typography align="center" id="pc" color="textSecondary" variant="h4">
						{promo.promoCode}
					</Typography>
					<center>
						<Button variant="outlined" onClick={() => clickCopy()} size="small" color="secondary">
							Click to Copy
						</Button>
					</center>
					<Typography gutterBottom align="center" color="textSecondary">
						{promo.message}
					</Typography>
					<br />
					<Divider light />
					<br />
					<Typography align="center" color="primary">
						Your Rewards
					</Typography>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<ul style={{ listStyleImage: "url('https://res.cloudinary.com/qualifier/image/upload/v1585479266/Default/check-mark_zbl05t.svg')" }}>
							{promo.refData.map((r) => (
								<li key={r.title}>
									{r.title} : <b>{r.value}</b>
								</li>
							))}
						</ul>
					</div>
				</Grid>
				<Grid item xs={12} md={4} className={classes.shareBox}>
					<Typography align="center" color="primary">
						Share on Social Media
					</Typography>
					<br />
					<br />
					<CardActions>
						{sharelink.map((l) => (
							<a href={l.link} key={l.name} target="_blank" rel="noopener noreferrer">
								<Avatar src={l.icon} alt={l.name} style={{ margin: 10, height: "80%" }} />
							</a>
						))}
					</CardActions>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography align="center" color="primary">
						Terms of Use
					</Typography>
					<ul>
						{terms.map((t, u) => (
							<li key={u}>
								<Typography variant="caption" color="textSecondary">
									{t.text}
								</Typography>
							</li>
						))}
					</ul>
				</Grid>
			</Grid>
		</StyledFragment>
	);
}
