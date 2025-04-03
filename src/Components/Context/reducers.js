import { LOGIN_USER, LOGOUT_USER, RESET, DRAWER, REFERRAL } from "./types";
import setAuthToken from "../../utils/setAuthToken";

const MainReducer = (state, action) => {
	switch (action.type) {
		case RESET:
			setAuthToken(action.payload.token);
			return { ...action.payload };

		case LOGIN_USER:
			setAuthToken(action.payload.token);
			return {
				...state,
				isAuthenticated: action.payload.success,
				isPaid: action.payload.isPaid,
				token: action.payload.token,
				id: action.payload.id,
				userImage: action.payload.userImage,
				designation: action.payload.designation,
				name: action.payload.name,
			};
		case LOGOUT_USER:
			return {
				...state,
				isAuthenticated: false,
				token: "",
				id: "",
				userImage: "",
				designation: "",
				name: "",
			};
		case DRAWER:
			return {
				...state,
				mobileDrawer: !state.mobileDrawer,
			};
		case REFERRAL: {
			state.referral = action.payload.ref;
			return {
				...state,
			};
		}
		default:
			return state;
	}
};
export default MainReducer;
