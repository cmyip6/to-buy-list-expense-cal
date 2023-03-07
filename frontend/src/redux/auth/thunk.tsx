import { Dispatch } from "@reduxjs/toolkit";
import { getUserListAction, loginAction, loginFailedAction } from "./slice";
import { showNotification } from "@mantine/notifications";

export function login(username: string) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
				}),
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(loginAction({username}));
			showNotification({
				title: "Login notification",
				message: result.msg,
			});
		} else {
			dispatch(loginFailedAction());
			showNotification({
				title: "Login notification",
				message: result.msg,
			});
		}
	};
}

export function getUserList() {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/auth/userList`,
			{
				method: "GET",
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(getUserListAction(result.result));
			console.log(result.msg)
		} else {
			showNotification({
				title: "User List notification",
				message: result.msg,
			});
		}
	};
}