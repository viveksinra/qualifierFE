import React, { lazy } from "react";
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
const AddQuestion = lazy(() => import("../../Protected/Add/AddQuestion/AddQuestion"));
const TransferQues = lazy(() => import("../../Admin/TransferQues"));

function AdminRoutes() {
	return (
		<Routes>
			<Route path="dashboard" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
			<Route path="addcategory" element={<AdminPrivateRoute><AddCategory /></AdminPrivateRoute>} />
			<Route path="addcourse" element={<AdminPrivateRoute><AddCourse /></AdminPrivateRoute>} />
			<Route path="addsubject" element={<AdminPrivateRoute><AddSubject /></AdminPrivateRoute>} />
			<Route path="addchapter" element={<AdminPrivateRoute><AddChapter /></AdminPrivateRoute>} />
			<Route path="addquestion" element={<AdminPrivateRoute><AddQuestion /></AdminPrivateRoute>} />
			<Route path="addblog" element={<AdminPrivateRoute><AddBlog /></AdminPrivateRoute>} />
			<Route path="addpromo" element={<AdminPrivateRoute><AddPromo /></AdminPrivateRoute>} />
			<Route path="addtest" element={<AdminPrivateRoute><AddTest /></AdminPrivateRoute>} />
			<Route path="addtestsection" element={<AdminPrivateRoute><AddSection /></AdminPrivateRoute>} />
			<Route path="addtestseries" element={<AdminPrivateRoute><AddTestSeries /></AdminPrivateRoute>} />
			<Route path="message" element={<AdminPrivateRoute><SeeMessage /></AdminPrivateRoute>} />
			<Route path="reportedquestion" element={<AdminPrivateRoute><ReportedQuestion /></AdminPrivateRoute>} />
			<Route path="transferquestion" element={<AdminPrivateRoute><TransferQues /></AdminPrivateRoute>} />
		</Routes>
	);
}

export default AdminRoutes;
