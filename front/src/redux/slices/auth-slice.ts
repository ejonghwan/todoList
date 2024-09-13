import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthInitialState } from '@/type/reducer/auth'



const host = process.env.REACT_APP_BACKEND_HOST;
const initialState: AuthInitialState = {
  isLoggedIn: false,
  isModerator: false,
  data: [],
}






export const test = createAsyncThunk('auth/test', async (n): Promise<void> => {

  const options = {
    method: 'GET',
    // body: JSON.stringify({ ...userData, darkMode: initTheme, profileImage: { bg: randomColor, firstString: id.slice(0, 1) } }),
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    // credentials: true,
  }


  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${n}`, { cache: 'no-store', next: { revalidate: 3600 }, ...options } );
  const user = res.json();

  console.log('user???', user)
  return user;
});








export const auth = createSlice({
  name: "auth", 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(test.pending, state => {
        state.isLoggedIn = false
      })
      .addCase(test.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.data = [...state.data, action.payload]
        console.log('data?', state, action.payload)
      })
      .addCase(test.rejected, (state, action) => {
        state.isLoggedIn = false
      })


    // builder
    //   .addCase(fetchHoho2.pending, state => {
    //     state.value.isModerator = false
    //   })
    //   .addCase(fetchHoho2.fulfilled, state => {
    //     state.value.isModerator = false
    //   })
    //   .addCase(fetchHoho2.rejected, state => {
    //     state.value.isModerator = false
    //   })

      console.log('aa??', builder)
  },
  // extraReducers: {
	// 	[fetchHoho.pending]: (state) => {
	// 		state.isLoading = true;
	// 	},
	// 	[fetchHoho.fulfilled]: (state, action) => {
	// 		state.isLoading = false;
	// 		state.data = action.payload;
	// 	},
	// 	[fetchHoho.rejected]: (state, action) => {
	// 		state.isLoading = false;
	// 		state.data = action.payload;
	// 	},
	// },
});

// export const { logIn, logOut } = auth.actions;
export default auth.reducer;
