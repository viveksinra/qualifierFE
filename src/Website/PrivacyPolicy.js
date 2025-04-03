import React, { Fragment } from "react";
import { makeStyles, Paper, Container, Grid, Divider, Typography } from "@material-ui/core";
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
		padding: theme.spacing(),
	},
}));

export default function PrivacyPolicy() {
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
						TERMS AND CONDITIONS
					</Typography>
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Use of the Platform or Services
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						Please read the following terms and conditions carefully before registering on, accessing, browsing, downloading or using the "QUALIFIER"
						website located at <a href="http://quallifier.co.in/">http://quallifier.co.in/</a>, and all associated sites linked to
						www.qualifier.co.in, or any similar platform (hereinafter collectively, the Qualifier's Platform, having its registered office at
						<b> Tollygunge, Qualifier Building, KOLKATA – 700040 </b> on any device and/or before availing any services offered by QUALIFIER on the
						QUALIFIER Platform which may include services such as donation or contribution or any other service that may be offered by QUALIFIER on
						the QUALIFIER Platform (hereinafter individually, and collectively, the QUALIFIER Services). For the avoidance of doubt, it is clarified
						that these terms and conditions shall apply to all Our Services, whether offered by QUALIFIER.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Acceptance
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						By registering on, accessing, browsing, downloading or using the "QUALIFIER" Platform for any general-purpose or for the specific purpose
						of availing any QUALIFIER Service, You agree to be bound by the single-sign-on ID (hereinafter SSOID) terms and conditions set forth below
						as well as by the service-specific terms and conditions applicable to each Qualifier Service (hereinafter collectively, the T&Cs). These
						T&Cs shall also include any additional or modified terms and conditions in relation to the SSOID or any additional or modified
						service-specific T&Cs in relation to any Qualifier Service or any future service that may be offered by QUALIFIER on the QUALIFIER
						Platform. By registering on, accessing, browsing, downloading, or using (as applicable) the QUALIFIER Platform or availing any QUALIFIER
						Service or the SSOID, You automatically and immediately agree to all the T&Cs. If at any time You do not accept or agree with any of the
						T&Cs or do not wish to be bound by the T&Cs, You may not access, browse or use the QUALIFIER Platform and immediately terminate Your
						availing the QUALIFIER Services. Accepting or agreeing to the T&Cs will constitute a legal contract (hereinafter Agreement) between You,
						being at least 18 years of age and an individual user of the QUALIFIER Platform or a customer, donor or beneficiary of the QUALIFIER
						Services. All services are rendered by QUALIFIER through the QUALIFIER Platform under the brand name QUALIFIER (or any derivatives or
						variations thereof). Consequently, all the rights, benefits, liabilities and obligations under the T&Cs shall, as the case may be, accrue
						to the benefit of, or incurred by, QUALIFIER, regarding Your use of QUALIFIER’s digital services (which includes donation and
						contribution), or any such other services which may be added on the QUALIFIER Platform and which will henceforth be a QUALIFIER Service,
						from time to time. The QUALIFIER HRIDHI Services shall be used by You subject to Your adherence with the T&Cs. As long as You accept and
						comply with these T&Cs, QUALIFIER HRIDHI grants You a personal, nonexclusive, non-transferable, limited, revocable privilege to enter and
						use the QUALIFIER Platform and/or avail the QUALIFIER Services. The terms "We" / "Us" / "Our"/”Company” individually and collectively
						refer to Qualifier.co.in and the terms "Visitor” ”User” refer to the users. <br />
						This page states the Terms and Conditions under which you (Visitor) may visit this website (“Website”). Please read this page carefully.
						If you do not accept the Terms and Conditions stated here, we would request you to exit this site. The business, any of its business
						divisions and / or its subsidiaries, associate companies or subsidiaries to subsidiaries or such other investment companies (in India or
						abroad) reserve their respective rights to revise these Terms and Conditions at any time by updating this posting. You should visit this
						page periodically to re-appraise yourself of the Terms and Conditions, because they are binding on all users of this Website.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Indemnification
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						You agree to indemnify, save, and hold QUALIFIER, its affiliates, employees, officers, directors and partners harmless from any and all
						claims, losses, damages, and liabilities, costs and expenses, including without limitation legal fees and expenses, arising out of or
						related to: (i) Your use or misuse of the QUALIFIER Services or of the QUALIFIER Platform; (ii) any violation by You of this Agreement or
						the SSOID Agreement; or (iii) any breach of the representations, warranties, and covenants made by You herein. QUALIFIER reserves the
						right, at Your expense, to assume the exclusive defense and control of any matter for which You are required to indemnify QUALIFIER,
						including rights to settle, and You agree to cooperate with we defense and settlement of these claims. We will use reasonable efforts to
						notify You of any claim, action, or proceeding brought by a third party that is subject to the foregoing indemnification upon becoming
						aware of it. This paragraph shall survive termination of this Agreement.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Disclaimer; No Warranties
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						To the fullest extent permissible pursuant to applicable law, QUALIFIER and its third-party partners disclaim all warranties or guarantees
						– whether statutory, express or implied – including, but not limited to, implied warranties of merchantability, fitness for a particular
						purpose, and non-infringement of proprietary rights. No advice or information, whether oral or written, obtained by You from QUALIFIER or
						through the QUALIFIER Services or the QUALIFIER Platform will create any warranty or guarantee other than those expressly stated herein.
						For the purposes of this Disclaimer, You expressly acknowledge that as used in this section, the term “QUALIFIER” includes QUALIFIER'S
						officers, directors, employees. You acknowledge that QUALIFIER (www.qualifier.co.in) is a purely social and profit enterprise, registered
						under The MSME Development Act, 2006 and is not liable for any third party (telecom companies, mobile operators or suppliers) obligations
						due to rates, quality and all other instances, whether to any such telecom companies’ subscribers or otherwise. You expressly agree that
						the use of the QUALIFIER Services on our Platform is at Your sole risk. It is Your responsibility to evaluate the accuracy, completeness
						and usefulness of all opinions, advice, services, merchandise and other information provided through the site or on the Internet
						generally. We do not warrant that our Services will be uninterrupted or error-free or that defects in the site will be corrected. The
						QUALIFIER Services and our Platform and any data, information, third party software, reference sites, services, or software made available
						in conjunction with or through the services and the site are provided on an “as is” and “as available,” “with all faults” basis and
						without warranties or representations of any kind either express or implied. QUALIFIER, and its partners do not warrant that the data, our
						software, functions, or any other information offered on or through our Services/ our Platform or any reference sites/ platforms/ services
						will be uninterrupted, or free of errors, viruses or other harmful components and do not warrant that any of the foregoing will be
						corrected. QUALIFIER and its licensors, and partners do not warrant or make any representations regarding the use or the results of the
						use of Our Services/ Our Platform or any reference sites/ platforms/ services in terms of correctness, accuracy, reliability, or
						otherwise. You understand and agree that You use, access, download, or otherwise obtain information, materials, or data through Our
						Services/ Our Platform or any reference sites/ platforms/ services at Your own discretion and risk and that You will be solely responsible
						for any damage to Your property (including Your computer system and mobile device or any other equipment) or loss of data that results
						from the download or use of such material or data. We do not authorize anyone to make any warranty on our behalf and You should not rely
						on any such statement. This paragraph shall survive the termination of this Agreement. In no event will QUALIFIER be liable for any
						incidental, consequential, or indirect damages (including, but not limited to, damages for loss of profits, business interruption, loss of
						programs or information and the like) arising out of the use of or inability to use Our Platform.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Ownership; Proprietary Rights
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						The QUALIFIER Services and Our Platform are owned and operated by QUALIFIER for Social Welfare. The visual interfaces, graphics, design,
						compilation, information, computer code (including source code and object code), services, and all other elements of Our Services and Our
						Platform provided by QUALIFIER for Social Welfare are protected by international conventions, and all other relevant intellectual property
						and proprietary rights, and applicable laws. As between You and QUALIFIER, all services and programs contained on Our are the property of
						QUALIFIER for Social Welfare. You agree not to remove, obscure, or alter Anudip or any third party’s copyright, patent, trademark, or
						other proprietary rights notices affixed to or contained within or accessed in conjunction with or through Our Services/ Platform. Except
						as expressly authorized by QUALIFIER, You agree not to sell, license, distribute, copy, modify, publicly perform or display, transmit,
						publish, edit, adapt, create derivative works from, or otherwise make unauthorized use of the services. QUALIFIER reserves all rights not
						expressly granted in this Agreement. If You have comments regarding Our Services and/or Our Platform or ideas on how to improve it, please
						contact customer service. Please note that by doing so, You hereby irrevocably assign to QUALIFIER, and shall assign to QUALIFIER, all
						rights, title and interests in and to all ideas and suggestions and any and all worldwide intellectual property rights associated
						therewith. You agree to perform such acts and execute such documents as may be reasonably necessary to perfect the foregoing rights.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Dispute Resolution
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						If any dispute, controversy or claim arises under this Agreement or in relation to any QUALIFIER Service or our Platform, including any
						question regarding the existence, validity or termination of this Agreement or T&Cs (hereinafter Dispute), the parties shall use all
						reasonable endeavors to resolve such Dispute amicably. If the parties are unable to resolve the Dispute amicably within 30 days of the
						notice of such Dispute, QUALIFIER may elect to resolve any Dispute by binding arbitration in accordance with the provisions of the Indian
						Arbitration & Conciliation Act, 1996 (hereinafter Act). Such Dispute shall be arbitrated on an individual basis and shall not be
						consolidated in any arbitration with any claim or controversy of any other party. The Dispute shall be resolved by a sole arbitrator,
						appointed in accordance with the Act. The seat of the arbitration shall be New Delhi and the language of this arbitration shall be
						English. Either You or Anudip may seek any interim or preliminary relief from a court of competent jurisdiction in Kolkata necessary to
						protect the rights or the property belonging to You or QUALIFIER (or any of our agents, suppliers, and subcontractors), pending the
						completion of arbitration. Any arbitration shall be confidential, and neither You nor QUALIFIER may disclose the existence, content or
						results of any arbitration, except as may be required by law or for purposes of enforcing the arbitration award. All administrative fees
						and expenses of arbitration will be divided equally between You and QUALIFIER. In all arbitrations, each party will bear the expense of
						its own lawyers and preparation. This paragraph shall survive termination of this Agreement.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Governing Law and Forum for Disputes
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						Subject to the Dispute Resolution section above, You agree that any claim or dispute You may have against QUALIFIER must be resolved by a
						court having jurisdiction in Kolkata, India. You agree to submit to the personal jurisdiction of the courts located within Kolkata, India,
						for the purpose of litigating all such claims or disputes. This Agreement shall be governed by Indian law. This paragraph shall survive
						termination of this Agreement.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Refund and Cancellation Policy
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						Our focus is complete customer satisfaction.
						<b>
							Please use our FREE plan before you make payment for any paid plan. The FREE plan is pretty much enough to understand our design or
							quality of content.
						</b>
						In the event, if you are displeased with the services provided, we will not refund back the money, provided the reasons are genuine and
						proved after investigation like, Fail of Transaction/Money debited but not reflected as service of that account. Plase Note, in case of
						payment has deducted and service is not started for that account within 24 hours, the user has to send us information via Email/Post
						regarding the valid transactional details, and same bank account details And after verification of the case, user can get the refund of
						money or the service with-in 7 working days (max) of the information. Please read the fine prints of each deal before buying it, it
						provides all the details about the services or the product you purchase. In case of dissatisfaction from our services, clients do not have
						the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows: Please
						use our FREE Trail before you pay for any plan. Refund Policy We will try our best to create the suitable design concepts for our clients.
						In case any client is not completely satisfied with our products we can NOT provide any refund.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Key Persons :- Mr. Raghav Jha & Mr. Vivek Singh (Grievance Officer) <br />
						<a href="http://quallifier.co.in/">http://quallifier.co.in/</a> <br />
						Registered under, The MSME Act,2006 (A unit of Softechinfra) <br />
						Email: softechinfra@gmail.com Ph: +91-9460117600
					</Typography>
					<b />
				</Paper>
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
