import { Dispatch } from "@reduxjs/toolkit";
import { showNotification } from "@mantine/notifications";
import { addNewItemAction, deleteItemAction, editItemAction, getToBuyListAction } from "./slice";

export function addNewItem (itemName: string, quantity: number, remarks: string) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/toBuyList`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itemName,
                    quantity,
                    remarks
				}),
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(addNewItemAction(result.item));
			showNotification({
				title: "Add New Item Notification",
				message: result.msg,
			});
		} else {
			showNotification({
				title: "Add New Item Notification",
				message: result.msg,
			});
		}
	};
}

export function editItem (id: number, itemName: string, quantity: number, remarks: string | undefined, handler: number | undefined, state: string) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/toBuyList`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
                    id,
					itemName,
                    quantity,
                    remarks,
                    handler,
                    state
				}),
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(editItemAction(result.item));
			console.log(result.msg)
		} else {
			showNotification({
				title: "Edit Item Notification",
				message: result.msg,
			});
		}
	};
}

export function deleteItem (id: number) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/toBuyList`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
                    id,
				}),
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(deleteItemAction(id));
			console.log(result.msg)
		} else {
			showNotification({
				title: "Edit Item Notification",
				message: result.msg,
			});
		}
	};
}

export function getToBuyList () {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/toBuyList`,
			{
				method: "GET",
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(getToBuyListAction(result.toBuyList));
			console.log(result.msg)
		} else {
			showNotification({
				title: "Get To Buy List Notification",
				message: result.msg,
			});
		}
	};
}
