import React, { Fragment } from "react";
import { makeStyles, Paper, Container, Grid, Divider, Typography } from "@mui/material";
import { FullNav, HideOnScroll } from "../Components/Navigation/Nav";
import Footer from "../Components/Footer/Footer";
import Typewriter from "typewriter-effect";

const useStyles = makeStyles((theme) => ({
	priceTopBg: {
		backgroundColor: "#ffffff",
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E\")",
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		textAlign: "center",
		height: "30vh",
	},
	practicsTop: {
		marginTop: "-10vh",
		minHeight: "20vh",
		maxWidth: "70%",
		zIndex: 2,
		marginBottom: "30px",
		marginLeft: "auto",
		marginRight: "auto",
	},
	charity: {
		[theme.breakpoints.down("md")]: {
			backgroundPosition: "0 0",
		},
		background: "url(https://i.ibb.co/KjXnWKy/csr-qualifier.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "400px",
	},
	charText: {
		textAlign: "center",
		paddingTop: 130,
		[theme.breakpoints.up("md")]: {
			marginLeft: "50vh",
			fontSize: "1.5rem",
		},
		color: "#fff",
	},
	typewriter: {
		paddingTop: "10vh",
	},
	padding: {
		padding: theme.spacing(0.5, 2),
	},
}));

export default function AppPrivacy() {
	const classes = useStyles();
	return (
		<Fragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<div className={classes.priceTopBg}></div>
			<Paper className={classes.practicsTop}>
				<Container maxWidth="md">
					<Grid container spacing={4}>
						<Grid item xs={12} md={5}>
							<br />
							<br />
							<Typewriter
								options={{
									strings: ["Trusted by 154820+ Student", "Accelerate your Performance", "Study Smart - Be Smart"],
									autoStart: true,
									loop: true,
									wrapperClassName: "typewriter2",
									cursorClassName: "typewriter2",
								}}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<Divider orientation="vertical" className={classes.cross} />
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography variant="subtitle1" color="primary">
								Key Points
							</Typography>
							<ul className={classes.ul}>
								<li className={classes.li}>No Hidden Charge</li>
								<li className={classes.li}>No Advertisement</li>
								<li className={classes.li}>Save Question for future</li>
								<li className={classes.li}>Report in Depth</li>
							</ul>
						</Grid>
					</Grid>
				</Container>
			</Paper>
			<Container>
				<Paper>
					<br />
					<Typography align="center" id="term-and-condition" color="primary" gutterBottom variant="h5">
						Privacy Policy
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Use of the Platform or Services
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER values your trust. In order to honour that trust, QUALIFIER adheres to ethical standards in gathering, using, and safeguarding
						any information you provide.
					</Typography>

					<Typography color="textSecondary" className={classes.padding}>
						Softechinfra Private Limited (operating under the brandname Softechinfra), is a leading edtech company, incorporated in India, for
						imparting learning. For the sake of brevity of understanding this Privacy Policy the company will be hereinafter referred as QUALIFIER.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						This privacy policy governs your use of the application QUALIFIER-The Learning App’ (“Application”), www.qualifier.co.in (“Website”) and
						the other associated/ancillary applications, products, websites and services managed by the Company, Softechinfra Private Limited.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						Please read this privacy policy (“Policy“) carefully before using the Application, Website, its services and products, along with the
						Terms of Use (“ToU“) provided on the Application and on the Website. Your use of the Website, Application, or services in connection with
						the Application, Website or products (“Services“), or registrations with us through any mode or use of any products including that of SD
						cards, tablets or other storage/transmitting device shall signify your acceptance of this Policy and your agreement to be legally bound by
						the same. For the sake of brevity your use of QUALIFIER-‘The Learning App’ in any electronic form or device shall be bound by the terms
						and conditions enumerated and agreed upon hereunder with wilful and free consent.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						If you wish not to agree with any of the terms and conditions of this Policy, kindly refrain from using the Website, Application or its
						products or until satisfaction for you to use the same by its Sales/Marketing/Technical/Legal Team, avail any of these services.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						User Provided Information
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						The Application/Website/Services/products records the information you provide when you download and register for the Application or
						Services or products. When you register with us, you generally provide (a) your name, age, email address, phone number, password and your
						ward’s educational interests; (b) transaction-related information, such as when you make purchases, respond to any offers, or download or
						use applications from us; (c) information you provide us when you contact us for help; (d) information you enter into its system when
						using the Application/Services/products, such as while asking doubts, participating in discussions and taking tests. The said information
						collected from the users could be categorized as “Personal Information“, “Sensitive Personal Information” and “Associated Information“.
						Personal Information, Sensitive Personal Information and Associated Information (each as individually defined under this Information
						Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 (the “Data Protection
						Rules“)) shall collectively be referred to as “Information” in this Policy.
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER may use this Information to contact you from time to time, to provide you with the Services, important information, required
						notices and marketing promotions. QUALIFIER will request you when it need more information that personally identifies you (personal
						information) or allows us to contact you.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER will not differentiate between who is using the device to access the Application, Website or Services or products, so long as
						the log in/access credentials match with yours. In order to make the best use of the Application/Website/Services/products and enable your
						Information to be captured accurately on the Application/Website/Services/products, it is essential that you have logged in using your own
						credentials.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER will, at all times, provide the option to you, not to provide the Personal Information or Sensitive Personal Information, which
						it seeks from you. Further, you can, at any time while using the Application/Services/products, also have an option to withdraw your
						consent given earlier to it, to use such Personal Information or Sensitive Personal Information. Withdrawal of the consent by you is
						required to be sent in writing to us at the contact details provided in this Policy below. In any such event, QUALIFIER or the Company
						fully reserves the right to withdraw further usage of the Application/Website or provide any further Services/products thereunder to you.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Automatically Collected Information
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						In addition, the Application/products/Services may collect certain information automatically, including, but not limited to, the type of
						mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type
						of mobile Internet browsers you use, and information about the way you use the Application/Services/products. As is true for most Mobile
						applications, QUALIFIER also collects other relevant information as per the permissions that you provide.
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER uses an outside credit card processing company to bill you for the goods and services availed by you. These companies do not
						retain, share, store or use personally identifiable information of you for any other purpose.
					</Typography>
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Use of your Personal Information
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER uses the collected Information to analyse trends, to conduct research, to administer the Application/Services and products, to
						learn about each user’s learning patterns and movements around the Application/Services and products and to gather demographic information
						and usage behaviour about its user base as a whole. Aggregated and individual, anonymized and non-anonymized data may periodically be
						transmitted to external service providers to help us improve the Application, products and its Services. QUALIFIER will share your
						information with third parties only in the ways that are described below in this Policy.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER may use the individual data and behavior patterns combined with personal information to provide you with personalized content,
						and better your learning objectives/experience. Third parties provide certain services which we may use to analyze the data and
						information you provide to personalize, drive insights and help it better your experience or reach out to you with more value added
						applications, products, information and services. However, these third party companies do not have any independent right to share this
						information. QUALIFIER does not sell, trade or rent your Information to any third party unless, we have been expressly authorized by you
						either in writing or electronically to do so. QUALIFIER may at times provide aggregate statistics about its customers, traffic patterns,
						and related site information to reputable third parties, however this information when disclosed will be in an aggregate form and does not
						contain any of your Personally Identifiable Information.
						<b />
						QUALIFIER will occasionally send email notices or contact you to communicate about its Services, products and benefits, as they are
						considered an essential part of the Services/products you have chosen.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						QUALIFIER may disclose Information:
					</Typography>
					<ul>
						<li>
							<Typography color="textSecondary" variant="body2">
								as required by law, such as to comply with a subpoena, or similar legal process.
							</Typography>
						</li>
						<li>
							<Typography color="textSecondary" variant="body2">
								to enforce applicable ToU, including investigation of potential violations thereof
							</Typography>
						</li>
						<li>
							<Typography color="textSecondary" variant="body2">
								when it believes in good faith (doctrine of uberrima fides) that the disclosure is necessary to protect its rights, protect your
								safety or the safety of others, investigate fraud, address security or technical issues or respond to a government request.
							</Typography>
						</li>
						<li>
							<Typography color="textSecondary" variant="body2">
								with its trusted services providers who work on its behalf, do not have an independent use of the information QUALIFIER discloses to
								them, and have agreed to and adhered to the rules set forth in this Policy.{" "}
							</Typography>
						</li>
						<li>
							<Typography color="textSecondary" variant="body2">
								to protect against imminent harm to the rights, property or safety of the Application/Website/ Sotechinfra Private Limited or its
								users or the public as required or permitted by law.
							</Typography>
						</li>
						<li>
							<Typography color="textSecondary" variant="body2">
								with third party service providers in order to personalize the Application/Website/Services/products for a better user experience and
								to perform behavioural analysis.
							</Typography>
						</li>
					</ul>
					<br />
					<Typography color="textSecondary" className={classes.padding}>
						Any portion of the Information containing personal data relating to minors provided by you shall be deemed to be given with the consent of
						the minor’s legal guardian. Such consent is deemed to be provided by your registration with QUALIFIER.
					</Typography>
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Access to your Personal Information
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER will provide you with the means to ensure that your Personal Information is correct and current. If you have filled out a user
						profile, it will provide an obvious way for you to access and change your profile from its Application/Services/Website/products.
						QUALIFIER adopts stringent security measures to protect your password from being exposed or disclosed to anyone. Only upon you forgetting
						the password for its Application/Website or Services, QUALIFIER will have a right to reset the same to you with your prior approval as per
						standard web practices.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Cookies
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER send cookies (small files containing a string of characters) to your computer, thereby uniquely identifying your browser.
						Cookies are used to track your preferences, help you login faster, and aggregated to determine user trends. This data is used to improve
						its offerings, such as providing more content in areas of greater interest to a majority of users.
					</Typography>
					<br />
					<Typography color="textSecondary" className={classes.padding}>
						Most browsers are initially set up to accept cookies, but you can reset your browser to refuse all cookies or to indicate when a cookie is
						being sent.
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						<b>Disclaimer:</b>
						<br />
						Some of QUALIFER features and services may not function properly if your cookies are disabled.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Links
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER may present links in a format that enables us to keep track of whether these links have been followed. QUALIFIER uses this
						information to improve its customized content. Clicking on links may take you to sites outside its domain. QUALIFIER are not responsible
						for the privacy practices of other web sites. QUALIFIER encourage its users to be aware when they leave its site to read the EULA/T&Cs of
						each and every web site that collects personally identifiable information. This Privacy Policy applies solely to information collected by
						its Website.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Alerts
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER may alert you by email or phone (through sms/call) to inform you about new service offerings or other information which it
						perceives might be useful for you.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Public Forums
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						When you use certain features on its website like the discussion forums and you post or share your personal information such as comments,
						messages, files, photos, will be available to all users, and will be in the public domain. All such sharing of information is done at your
						own risk. Please keep in mind that if you disclose personal information in your profile or when posting on its forums this information may
						become publicly available.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Security
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER are concerned about safeguarding the confidentiality of your Information. QUALIFIER provide physical, electronic, and procedural
						safeguards to protect Information it processes and maintain. An illustration being, QUALIFIER limits access to this Information to
						authorized employees only who need to know that information in order to operate, develop or improve its
						Application/Services/products/Website. Please be aware that, although QUALIFIER endeavour is to provide stringent security, for
						information it possesses and maintains, no security system can prevent all potential security breaches.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						How long does QUALIFIER retain user data?
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						Currently, QUALIFIER retains user data while an account is active and for at least three years afterwards. It may alter this practice
						according to legal and business requirements. For example, it may lengthen the retention period for some data if needed to comply with law
						or voluntary codes of conduct. Unless otherwise prohibited, it may shorten the retention period for some types of data if needed to free
						up storage space.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Log information
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						When you access QUALIFIER Website, its servers automatically record information that your browser sends whenever you visit a website.
						These server logs may include information such as your web request, internet protocol address, browser type, browser language, the date
						and time of your request and one or more cookies that may uniquely identify your browser.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						User communications
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						When you send an email or other communication to QUALIFIER, it may retain those communications in order to process your inquiries, respond
						to your requests and improve our Services.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Changes to this Statement
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						As the Company (Softechinfra Private Limited) evolves, its privacy policy will need to evolve as well to cover new situations. You are
						advised to review this Policy regularly for any changes, as continued use is deemed approval of all changes.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Your Consent
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER believes that, every user of our Application/Services/Products/Website must be in a position to provide an informed consent
						prior to providing any Information required for the use of the Application/Services/Products/Website. By registering with it, you are
						expressly consenting to its collection, processing, storing, disclosing and handling of your information as set forth in this Policy now
						and as amended by us. Processing, your information in any way, including, but not limited to, collecting, storing, deleting, using,
						combining, sharing, transferring and disclosing information, all of which activities will take place in India. If you reside outside India
						your information will be transferred, processed and stored in accordance with the applicable data protection laws of India.
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Contact Information
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						QUALIFIER Grievance Officer shall undertake all reasonable efforts to address your grievances at the earliest possible opportunity. You
						may contact it at: Grievance Officer: ER RAGHAV KUMAR JHA & ER VIVEK SINGH <br />
						Address: 47, Ground Floor, Near Ashok Nagar Park, Tollygunge, Kolkata – 700040, West Bengal, India.
					</Typography>
					<br />
					<Typography color="textSecondary" className={classes.padding}>
						Reach out to us on info@qualifier.co.in, in case of any queries.
					</Typography>
				</Paper>
				<br />
				<br />
				<div className={classes.charity} alt="charity-water">
					<div className={classes.charText}>
						<h4>Let's make the Nation a better place</h4>
						<p>
							At <strong>Qualifier</strong>, We strongly believe in supporting the needy youth.
						</p>
					</div>
				</div>
			</Container>
			<br /> <br />
			<Footer />
		</Fragment>
	);
}
