import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserPrivateRoute } from "./PrivateRoute";
import About from "../../Website/About";
import Blog from "../../Website/Blog/Blog";
import BlogExpand from "../../Website/Blog/BlogExpand";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import UserDashboard from "../../Protected/Dashboard/UserDashboard";
import CourseList from "../../Website/CourseList";
import Pricing from "../../Website/Pricing";
import SaveQuestions from "../../Protected/SaveQuestions";
import MyCourses from "../../Protected/MyCourses/MyCourses";
import Report from "../../Protected/Report";
import MyProfile from "../../Protected/UserProfile/MyProfile";
import Course from "../../Website/CourseDetails/Course";
import PracticeExp from "../../Protected/Practice/PracticeExp";
import PracticeHome from "../../Website/PracticeHome";
import TestSeries from "../../Test/TestSeries/TestSeries";
import TestHome from "../../Test/TestHome/TestHome";
import Instructions from "../../Test/Instructions";
import RealTest from "../../Test/RealTest";
import Contact from "../../Website/Contact";
import CoursesHome from "../../Website/CoursesHome/CoursesHome";
import PaymentVerify from "../../Protected/PaymentVerify";
import PrivacyPolicy from "../../Website/PrivacyPolicy";
import AppPrivacy from "../../Website/AppPrivacy";
import Sitemap from "../../Website/Sitemap";
import { TestProvider } from "../../Components/Context/TestContext/TestContext";
import TestReport from "../../Test/TestReport/TestReport";
import Invite from "../../Website/Invite";
// import PageNotFound from "../../Website/PageNotFound";

function PublicRoutes() {
	return (
		<Switch>
			<Route path="/login">
				<Switch>
					<Route exact path={`/login`} component={Login} />
					<Route exact path={`/login/:token`} component={Login} />
				</Switch>
			</Route>
			<Route path="/signup" exact component={Signup} />
			<Route path="/about" exact component={About} />
			<Route path="/pricing" exact component={Pricing} />
			<Route path="/courses" exact component={CoursesHome} />
			<Route path="/blog">
				<Switch>
					<Route exact path="/blog" component={Blog} />
					<Route exact path="/blog/:link" component={BlogExpand} />
				</Switch>
			</Route>
			<Route path="/contact" exact component={Contact} />
			<Route path="/paymentverify/:paymentCompany/:status/:paymentId" component={PaymentVerify} />
			<Route path="/practice">
				<Switch>
					<UserPrivateRoute exact path={`/practice/start/:catlink/:corslink`} component={PracticeExp} />
					<UserPrivateRoute exact path={`/practice/start/:catlink/:corslink/:sublink`} component={PracticeExp} />
					<UserPrivateRoute path={`/practice/start/:catlink/:corslink/:sublink/:chaplink`} component={PracticeExp} />
					<Route exact path="/practice" component={PracticeHome} />
					<Route exact path={`/practice/:catlink`} component={CourseList} />
					<Route exact path={`/practice/:catlink/:corslink`} component={Course} />
					<Route exact path={`/practice/:catlink/:corslink/:sublink`} component={Course} />
					<Route exact path={`/practice/:catlink/:corslink/:sublink/:chaplink`} component={Course} />
				</Switch>
			</Route>
			<Route path="/online-test-series" exact component={TestSeries} />
			<Route path="/test">
				<Switch>
					<Route exact path="/test/:serieslink" component={TestHome} />
					<TestProvider>
						<UserPrivateRoute exact path="/test/:serieslink/:testlink/instruction" component={Instructions} />
						<UserPrivateRoute exact path="/test/:serieslink/:testlink/on" component={RealTest} />
						<UserPrivateRoute exact path="/test/:serieslink/:testlink/report" component={TestReport} />
					</TestProvider>
				</Switch>
			</Route>
			<UserPrivateRoute exact path={`/dashboard`} component={UserDashboard} />
			<UserPrivateRoute exact path="/savequestion" component={SaveQuestions} />
			<UserPrivateRoute exact path="/mycourses" component={MyCourses} />
			<UserPrivateRoute exact path="/profile" component={MyProfile} />
			<Route path="/report">
				<Switch>
					<UserPrivateRoute exact path="/report" component={Report} />
					<UserPrivateRoute exact path="/report/:catlink/:corslink/:sublink/:chaplink" component={Report} />
					<UserPrivateRoute exact path="/report/:catlink/:corslink/:sublink" component={Report} />
					<UserPrivateRoute exact path="/report/:catlink/:corslink" component={Report} />
				</Switch>
			</Route>
			<Route exact path="/invite/:ref" component={Invite} />
			<Route exact path="/app-privacy" component={AppPrivacy} />
			<Route exact path="/privacypolicy" component={PrivacyPolicy} />
			<Route exact path="/sitemap" component={Sitemap} />

			{/* <Route path="*" component={PageNotFound} /> */}
		</Switch>
	);
}

export default PublicRoutes;
