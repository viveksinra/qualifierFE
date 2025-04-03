import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { AdminPrivateRoute } from "./PrivateRoute";
import AdminDashboard from "../../Protected/Dashboard/AdminDashboard";
import AddCategory from "../../Protected/Add/AddCategory";
import AddCourse from "../../Protected/Add/AddCourse";
import AddSubject from "../../Protected/Add/AddSubject";
import AddChapter from "../../Protected/Add/AddChapter";
import AddBlog from "../../Protected/Add/AddBlog";
import AddPromo from "../../Protected/Add/AddPromo";
import AddTest from "../../Protected/Add/AddTest";
import AddTestSeries from "../../Protected/Add/AddTestSeries";
import AddSection from "../../Protected/Add/AddSection";
import SeeMessage from "../../Admin/SeeMessage";
import ReportedQuestion from "../../Admin/ReportedQuestion";
const AddQuestion = lazy(() => import("../../Protected/Add/AddQuestion/AddQuestion"));
const TransferQues = lazy(() => import("../../Admin/TransferQues"));

function AdminRoutes() {
	return (
		<Switch>
			<Route path="/admin">
				<Switch>
					<AdminPrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
					<AdminPrivateRoute exact path="/admin/addcategory" component={AddCategory} />
					<AdminPrivateRoute exact path="/admin/addcourse" component={AddCourse} />
					<AdminPrivateRoute exact path="/admin/addsubject" component={AddSubject} />
					<AdminPrivateRoute exact path="/admin/addchapter" component={AddChapter} />
					<AdminPrivateRoute exact path="/admin/addquestion" component={AddQuestion} />
					<AdminPrivateRoute exact path="/admin/addblog" component={AddBlog} />
					<AdminPrivateRoute exact path="/admin/addpromo" component={AddPromo} />
					<AdminPrivateRoute exact path="/admin/addtest" component={AddTest} />
					<AdminPrivateRoute exact path="/admin/addtestsection" component={AddSection} />
					<AdminPrivateRoute exact path="/admin/addtestseries" component={AddTestSeries} />
					<AdminPrivateRoute exact path="/admin/message" component={SeeMessage} />
					<AdminPrivateRoute exact path="/admin/reportedquestion" component={ReportedQuestion} />
					<AdminPrivateRoute exact path="/admin/transferquestion" component={TransferQues} />
				</Switch>
			</Route>
		</Switch>
	);
}

export default AdminRoutes;
