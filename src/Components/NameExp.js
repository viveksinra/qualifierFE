import React, { Suspense, lazy } from "react";

const HeadTemp = lazy(() => import("react-helmet").then((mod) => ({ default: mod.Helmet })));
export const Head = (props) => (
	<Suspense fallback={null}>
		<HeadTemp {...props} />
	</Suspense>
);

const Typew = lazy(() => import("typewriter-effect").then((mod) => ({ default: mod.default })));
export const Typewriter = (props) => (
	<Suspense fallback={null}>
		<Typew {...props} />
	</Suspense>
);
