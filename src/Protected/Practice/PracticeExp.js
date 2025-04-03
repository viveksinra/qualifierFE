import React from "react";
import { PracticeProvider } from "../../Components/Context/PracticeContext/PracticeContext";
import Practice from "./Practice";

function PracticeExp({ match }) {
	return (
		<PracticeProvider>
			<Practice match={match} />
		</PracticeProvider>
	);
}

export default PracticeExp;
