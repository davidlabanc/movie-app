import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	menu: false
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		handleToggleMenu(state, action) {
			state.menu = !state.menu
		},
    setMenu(state, action) {
			state.menu = action.payload
		},
	}
})

export const { handleToggleMenu, setMenu } = uiSlice.actions

export const selectMenu = (state) => state.uiSlice.menu;

export default uiSlice.reducer

