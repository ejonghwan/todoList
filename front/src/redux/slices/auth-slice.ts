import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState, SignupUser } from '@/type/reducer/auth'




const host = process.env.REACT_APP_BACKEND_HOST;
const initialState: InitialState = {
  isLoggedIn: false,
  isModerator: false,
  user: {
    id: '', 
    email: '', 
    name: '', 
    gender: '', 
    birthday: '' 
  }
}




// 유저 회원 가입
export const fetchHoho = createAsyncThunk('auth/signupUser', async (userData: SignupUser) => {

  const { id, password, email, name, question, gender, birthday } = userData;
    
  // 다크모드 초기값은시스템에서 유저가 설정해둔 값
  const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let initTheme = isBrowserDarkMode ? 'dark' : 'light';

  // 이미지가 없을 경우 랜덤컬러와 스펠링 저장
  const colors = ['#428f80', '#42788f', '#428f4d', '#7e8f42', '#8f8942', '#955877', '#4468a9', '#44a9a5', '#50844b', '#4b7e84',]
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
  };

  const options = {
    cache: 'no-store', 
    method: 'POST',
    body: JSON.stringify({ ...userData, darkMode: initTheme, profileImage: { bg: randomColor, firstString: id.slice(0, 1) } }),
    headers: config
  }

  const user = await fetch(`${host}/api/users/signup`, options);
  return user;
});







export const auth = createSlice({
  name: "auth", 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchHoho.pending, state => {
        state.isLoggedIn = false
      })
      .addCase(fetchHoho.fulfilled, state => {
        state.isLoggedIn = false
      })
      .addCase(fetchHoho.rejected, state => {
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
