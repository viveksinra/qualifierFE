import React, { lazy, useContext } from "react";
import { Routes, Route } from "react-router-dom";
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
import AdminLayout from "../../Protected/Dashboard/AdminLayout";
import { MainContext } from "../Context/MainContext";
import { LOGOUT_USER } from "../Context/types";

const AddQuestion = lazy(() => import("../../Protected/Add/AddQuestion/AddQuestion"));
const TransferQues = lazy(() => import("../../Admin/TransferQues"));

function AdminRoutes() {
	const { dispatch } = useContext(MainContext);
	
	const handleLogout = () => {
		dispatch({ type: LOGOUT_USER });
	};
	
	// Wrap the component with AdminLayout
	const withAdminLayout = (Component) => {
		return (
			<AdminPrivateRoute>
				<AdminLayout handleLogout={handleLogout}>
					<Component />
				</AdminLayout>
			</AdminPrivateRoute>
		);
	};
	
	return (
		<Routes>
			<Route path="dashboard" element={withAdminLayout(AdminDashboard)} />
			<Route path="addcategory" element={withAdminLayout(AddCategory)} />
			<Route path="addcourse" element={withAdminLayout(AddCourse)} />
			<Route path="addsubject" element={withAdminLayout(AddSubject)} />
			<Route path="addchapter" element={withAdminLayout(AddChapter)} />
			<Route path="addquestion" element={withAdminLayout(AddQuestion)} />
			<Route path="addblog" element={withAdminLayout(AddBlog)} />
			<Route path="addpromo" element={withAdminLayout(AddPromo)} />
			<Route path="addtest" element={withAdminLayout(AddTest)} />
			<Route path="addtestsection" element={withAdminLayout(AddSection)} />
			<Route path="addtestseries" element={withAdminLayout(AddTestSeries)} />
			<Route path="message" element={withAdminLayout(SeeMessage)} />
			<Route path="reportedquestion" element={withAdminLayout(ReportedQuestion)} />
			<Route path="transferquestion" element={withAdminLayout(TransferQues)} />
		</Routes>
	);
}

export default AdminRoutes;
