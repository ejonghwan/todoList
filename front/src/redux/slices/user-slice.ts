import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState, SignupUser } from '@/type/reducer/auth'



const host = process.env.REACT_APP_BACKEND_HOST;
const initialState: InitialState = {
  isLoggedIn: false,
  isModerator: false,
  data: [],
  user: {
    id: '', 
    email: '', 
    name: '', 
    gender: '', 
    birthday: '' 
  }
}




// 유저 회원 가입
export const signupApi = createAsyncThunk('user/signupUser', async (userData: SignupUser): Promise<void> => {

  const { id, password, email, name, question, gender, birthday } = userData;
    
  // 다크모드 초기값은시스템에서 유저가 설정해둔 값
  const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let initTheme = isBrowserDarkMode ? 'dark' : 'light';

  // 이미지가 없을 경우 랜덤컬러와 스펠링 저장
  const colors = ['#428f80', '#42788f', '#428f4d', '#7e8f42', '#8f8942', '#955877', '#4468a9', '#44a9a5', '#50844b', '#4b7e84',]
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  

  const options = {
    method: 'POST',
    body: JSON.stringify({ ...userData, darkMode: initTheme, profileImage: { bg: randomColor, firstString: id.slice(0, 1) } }),
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    // credentials: true,

  }


  const res = await fetch(`${host}/api/users/signup`, { cache: 'no-store', next: { revalidate: 3600 }, ...options } );
  const user = res.json();
  return user;
});



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
  return user;
});








export const user = createSlice({
  name: "user", 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(signupApi.pending, state => {
        state.isLoggedIn = false
      })
      .addCase(signupApi.fulfilled, state => {
        state.isLoggedIn = false
      })
      .addCase(signupApi.rejected, state => {
        state.isLoggedIn = false
      })


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
export default user.reducer;
