import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	text: "",
  content: {}
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
    setSearchContent(state, action){
      state.content = action.payload
    },
    getSearchContent(){},
		handleSearchChange(state, action) {
			state.text = action.payload
		},
		handleClear(state) {
			state.text = ""
		},
	}
})

export const { handleSearchChange, handleClear, setSearchContent, getSearchContent } = searchSlice.actions

export const selectText = (state) => state.searchSlice.text;
export const selectContent = (state) => state.searchSlice.content;


export default searchSlice.reducer

