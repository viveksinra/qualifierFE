import React, { useEffect } from "react";
import { PracticeProvider } from "../../Components/Context/PracticeContext/PracticeContext";
import Practice from "./Practice";
import { useParams } from "react-router-dom";

function PracticeExp() {
	const params = useParams();
	
	// Add cleanup for any potential animation issues
	useEffect(() => {
		// Ensure smooth animations by giving the DOM time to stabilize
		const timer = setTimeout(() => {
			// Force a reflow if needed
			window.scrollTo(0, 0);
		}, 100);
		
		return () => clearTimeout(timer);
	}, []);
	
	return (
		<PracticeProvider>
			<Practice params={params} />
		</PracticeProvider>
	);
}

export default PracticeExp;
