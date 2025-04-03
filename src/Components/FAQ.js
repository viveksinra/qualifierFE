import React from "react";
import { 
	Accordion, 
	AccordionSummary, 
	Container, 
	AccordionDetails, 
	Typography 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaAngleDown } from "react-icons/fa";

const FaqBackground = styled('div')(({ theme }) => ({
	background: "radial-gradient(circle, rgba(174,238,219,0.5749650201877626) 0%, rgba(210,227,247,0.4125000341933649) 100%)",
	minHeight: "30vh",
	paddingTop: "30px",
	paddingBottom: "30px",
}));

export default function FAQ() {
	return (
		<FaqBackground>
			<Container>
				<center>
					<Typography variant="subtitle1" gutterBottom color="secondary">
						Frequently Asked Questions
					</Typography>
				</center>
				{faqData.map((f, i) => (
					<Accordion key={i}>
						<AccordionSummary expandIcon={<FaAngleDown />} aria-controls="panel1a-content" id="panel1a-header">
							<Typography color="primary">
								{f.title}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography color="textSecondary">{f.ans}</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Container>
		</FaqBackground>
	);
}

const faqData = [
	{
		title: 'Do I have to pay to "Qualifier" or It is FREE ?',
		ans:
			'You don\'t have to pay to "Qualifier" to test the platform. It is FREE for initial use or testing the platform, But once you are satisfied and want to upgrade your practice then only make payment.',
	},
	{
		title: "Is the Mobile app also available to the user?",
		ans: "Of course, yes. Qualifier is also available to both the platform. Download the Android App now and keep studying.",
	},
	{
		title: "Will I be able to continue my practice after my plan expire ?",
		ans: "Yes, you can ! The free tier will be continued again so that you can have seamless practice experience.",
	},
	{
		title: "Will I get the refund if I want to stop using it before my plan expiry ?",
		ans:
			"We allow you to test the platform FREE of cost, so once payment is done can not be refunded. But in case you are facing any problem to access it, feel free to contact us.",
	},

	{
		title: "How to avail any discount ? ",
		ans: "You can use Promo code to buy any plan. Share the link and get a chance to get Promo code. Happy Saving !",
	},
	{
		title: "Can I ask any doubt / query for any question while practice ?",
		ans: "There is proper solution already attached with most of our questions, still you have the option to ask any doubt / comment.",
	},
	{
		title: 'What if I need any help in order to use the "Qualifier" ?',
		ans: "Although, Qualifier is very easy and user friendly, but in case you need any help/support feel free to contact us.",
	},
	{
		title: "How can I join Qualifier as a business associates ?",
		ans:
			"We will be happy to welcome you as our business associates. Join us as a Teacher / School Director / Financer / Institute Manager / Developer / Students / or others. Together we can achieve a next level.",
	},
	{
		title: "Can I share one user Id to many account holders ?",
		ans:
			"It is not advisable to share your id & password with any other, as your recommended question level will not match with others. By doing so your Id can be block.",
	},
];
