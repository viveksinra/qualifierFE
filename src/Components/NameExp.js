import React, { Suspense, lazy } from "react";

const HeadTemp = lazy(() => import("react-helmet-async").then((mod) => ({ default: mod.HelmetProvider })));
const Helmet = lazy(() => import("react-helmet-async").then((mod) => ({ default: mod.Helmet })));

export const Head = (props) => (
	<Suspense fallback={null}>
		<HeadTemp>
			<Helmet {...props} />
		</HeadTemp>
	</Suspense>
);

const Typew = lazy(() => import("typewriter-effect").then((mod) => ({ default: mod.default })));
export const Typewriter = (props) => (
	<Suspense fallback={null}>
		<Typew {...props} />
	</Suspense>
);
