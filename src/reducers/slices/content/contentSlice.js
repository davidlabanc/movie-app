import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: true,
	error: false,
	favorite: [],
	movie: null,
}

const contentSlice = createSlice({
	name: 'content',
	initialState,
	reducers: {
		addToFavorite(){},
		setError(){
			state.error = true
		},
		setIsLoading(state, action){
			state.error = action.payload
		},
		getMovie(state, action) {
			state.isLoading = true
		},
		setFavorite(state, action) {
			state.favorite = action.payload
		},
		setSearch(state, action) {
			state.search = action.payload
			state.isLoading = false
		},
		setMovie(state, action) {
			state.movie = action.payload
			state.isLoading = false
		},
		rehydrateFavorite(state, action) {
			state.favorite = action.payload
			state.isLoading = false
		},
	}
})

export const { setIsLoading, addToFavorite, setFavorite, setSearch, setMovie, getMovie, getSearch, rehydrateFavorite, setError } = contentSlice.actions

export const selectIsLoading = (state) => state.contentSlice.isLoading;
export const selectError = (state) => state.contentSlice.error;
export const selectSearch = (state) => state.contentSlice.search;
export const selectFavorite = (state) => state.contentSlice.favorite;
export const selectMovie = (state) => state.contentSlice.movie;

export default contentSlice.reducer

// export const addToFavorite = (item) => (dispatch, getState) => {
// 	const currentFavorite = selectFavorite(getState());
// 	const newFavorite = { Poster: item.Poster, Title: item.Title, Year: item.Year, imdbID: item.imdbID }

// 	currentFavorite.push(newFavorite)
// 	try {
// 		localStorage.setItem("favorite", JSON.stringify(currentFavorite))
// 	} catch (error) {
// 		console.log(error)
// 	}

// 	dispatch(setFavorite(newFavorite));

// };

