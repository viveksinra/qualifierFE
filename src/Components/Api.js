import axios from "axios";

export const fetchData = (url) => {
	const userPromise = fetchUser(url);
	return {
		data: wrapPromise(userPromise),
	};
};
function wrapPromise(promise) {
	let status = "pending";
	let result;
	let suspender = promise.then(
		(res) => {
			status = "success";
			result = res;
		},
		(err) => {
			status = "error";
			result = err;
		},
	);
	return {
		read() {
			if (status === "pending") {
				throw suspender;
			} else if (status === "error") {
				throw result;
			} else if (status === "success") {
				return result;
			}
		},
	};
}

const fetchUser = async (url) => {
	return await axios
		.get(url)
		.then((res) => res.data)
		.catch((err) => console.log(err));
};
