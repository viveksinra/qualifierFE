import React from "react";
import { Routes, Route } from "react-router-dom";
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
		<Routes>
			<Route path="/login" element={
				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/login/:token" element={<Login />} />
				</Routes>
			} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/about" element={<About />} />
			<Route path="/pricing" element={<Pricing />} />
			<Route path="/courses" element={<CoursesHome />} />
			<Route path="/blog" element={
				<Routes>
					<Route exact path="/blog" element={<Blog />} />
					<Route exact path="/blog/:link" element={<BlogExpand />} />
				</Routes>
			} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/paymentverify/:paymentCompany/:status/:paymentId" element={<PaymentVerify />} />
			<Route path="/practice" element={
				<Routes>
					<Route path="/practice/start/:catlink/:corslink" element={<UserPrivateRoute component={PracticeExp} />} />
					<Route path="/practice/start/:catlink/:corslink/:sublink" element={<UserPrivateRoute component={PracticeExp} />} />
					<Route path="/practice/start/:catlink/:corslink/:sublink/:chaplink" element={<UserPrivateRoute component={PracticeExp} />} />
					<Route exact path="/practice" element={<PracticeHome />} />
					<Route path="/practice/:catlink" element={<CourseList />} />
					<Route path="/practice/:catlink/:corslink" element={<Course />} />
					<Route path="/practice/:catlink/:corslink/:sublink" element={<Course />} />
					<Route path="/practice/:catlink/:corslink/:sublink/:chaplink" element={<Course />} />
				</Routes>
			} />
			<Route path="/online-test-series" element={<TestSeries />} />
			<Route path="/test" element={
				<Routes>
					<Route path="/test/:serieslink" element={<TestHome />} />
					<Route path="/test/:serieslink/:testlink/instruction" element={
						<TestProvider>
							<UserPrivateRoute component={Instructions} />
						</TestProvider>
					} />
					<Route path="/test/:serieslink/:testlink/on" element={
						<TestProvider>
							<UserPrivateRoute component={RealTest} />
						</TestProvider>
					} />
					<Route path="/test/:serieslink/:testlink/report" element={
						<TestProvider>
							<UserPrivateRoute component={TestReport} />
						</TestProvider>
					} />
				</Routes>
			} />
			<Route path="/dashboard" element={<UserPrivateRoute component={UserDashboard} />} />
			<Route path="/savequestion" element={<UserPrivateRoute component={SaveQuestions} />} />
			<Route path="/mycourses" element={<UserPrivateRoute component={MyCourses} />} />
			<Route path="/profile" element={<UserPrivateRoute component={MyProfile} />} />
			<Route path="/report" element={
				<Routes>
					<Route path="/report" element={<UserPrivateRoute component={Report} />} />
					<Route path="/report/:catlink/:corslink/:sublink/:chaplink" element={<UserPrivateRoute component={Report} />} />
					<Route path="/report/:catlink/:corslink/:sublink" element={<UserPrivateRoute component={Report} />} />
					<Route path="/report/:catlink/:corslink" element={<UserPrivateRoute component={Report} />} />
				</Routes>
			} />
			<Route path="/invite/:ref" element={<Invite />} />
			<Route path="/app-privacy" element={<AppPrivacy />} />
			<Route path="/privacypolicy" element={<PrivacyPolicy />} />
			<Route path="/sitemap" element={<Sitemap />} />

			{/* <Route path="*" element={<PageNotFound />} /> */}
		</Routes>
	);
}

export default PublicRoutes;
