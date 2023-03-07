import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToBuyItem {
    id: number | undefined
    item_name: string | undefined
    quantity: number | undefined
    remarks: string | undefined
    handler: number | undefined
    state: string | undefined
}

export interface ToBuyListState {
    toBuyList: ToBuyItem[],
    triggerNewItemModel: boolean,
    triggerAlertModel: boolean,
}

const initialState: ToBuyListState = {
    toBuyList: [
        {
            id: undefined,
            item_name: undefined,
            quantity: undefined,
            remarks: undefined,
            handler: undefined,
            state: undefined
        }
    ],
    triggerNewItemModel: false,
    triggerAlertModel: false
}

const triggerNewItemModel: CaseReducer<ToBuyListState, PayloadAction<boolean>> =
    (state, action) => {
        state.triggerNewItemModel = action.payload
    }

const triggerAlertModel: CaseReducer<ToBuyListState, PayloadAction<boolean>> =
    (state, action) => {
        state.triggerAlertModel = action.payload
    }

const addNewItem: CaseReducer<ToBuyListState, PayloadAction<ToBuyItem>> =
    (state, action) => {
        state.toBuyList.push(action.payload)
    }

const editItem: CaseReducer<ToBuyListState, PayloadAction<ToBuyItem>> =
    (state, action) => {
        for (let item of state.toBuyList) {
            if (item.id === action.payload.id) {
                item.item_name = action.payload.item_name
                item.quantity = action.payload.quantity
                item.remarks = action.payload.remarks
                item.handler = action.payload.handler
                item.state = action.payload.state
            }
        }
    }

const deleteItem: CaseReducer<ToBuyListState, PayloadAction<number>> =
    (state, action) => {
        state.toBuyList = state.toBuyList.filter(item=> item.id !== action.payload)
    }

const getToBuyList: CaseReducer<ToBuyListState, PayloadAction<ToBuyItem[]>> =
    (state, action) => {
        state.toBuyList = action.payload
    }

const toBuyListSlice = createSlice({
    name: 'toBuyList',
    initialState,
    reducers: {
        triggerNewItemModel,
        triggerAlertModel,
        addNewItem,
        getToBuyList,
        editItem,
        deleteItem
    },
})

export const {
    triggerNewItemModel: triggerNewItemModelAction,
    triggerAlertModel: triggerAlertModelAction,
    addNewItem: addNewItemAction,
    getToBuyList: getToBuyListAction,
    editItem: editItemAction,
    deleteItem: deleteItemAction,

} = toBuyListSlice.actions

export default toBuyListSlice.reducer