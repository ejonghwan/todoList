import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserInitialState, SignupUser, LoginUser } from '@/type/reducer/user'

/**
 * 메뉴 항목을 추가한다.
 * @param {string} id 항목에 대한 고유 식별자 
 * @param {string} url 항목 아이콘 
 * @param {string} title 항목 타이틀
 * @param {function} callback 실행에 대한 호출 함수
 * @returns {boolean} 성공 여부
 */


const host = process.env.REACT_APP_BACKEND_HOST;
const initialState: UserInitialState = {
  isLoggedIn: false,
  isModerator: false,

  signupLoading: false,
  signupDone: false,
  signupError: '',

  loginLoading: false,
  loginDone: false,
  loginError: '',


  user: {
    id: '', 
    email: '', 
    name: '', 
    gender: '', 
    birthday: '' 
  }
}




/**
 * 유저 회원가입
 * @param { id, password, email, name, question, gender, birthday } 유저 정보
 * @return { Promise<void> }
*/
export const signupApi = createAsyncThunk('user/signupUser', async (data: SignupUser): Promise<any> => {
  try {
    const { id } = data;
    
    // 다크모드 초기값은시스템에서 유저가 설정해둔 값
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme = isBrowserDarkMode ? 'dark' : 'light';

    // 이미지가 없을 경우 랜덤컬러와 스펠링 저장
    const colors = ['#428f80', '#42788f', '#428f4d', '#7e8f42', '#8f8942', '#955877', '#4468a9', '#44a9a5', '#50844b', '#4b7e84',]
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const options = {
      method: 'POST',
      body: JSON.stringify({ ...data, darkMode: initTheme, profileImage: { bg: randomColor, firstString: id.slice(0, 1) } }),
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      // credentials: true,
    }

    // const res = await fetch(`${host}/api/users/signup`, { cache: 'no-store', next: { revalidate: 3600 }, ...options } );
    const res = await fetch(`${host}/api/users/signup`, { cache: 'no-store', ...options } );
    const user = res.json();
    return user;

  } catch(err) {
    // err.response.data.message
    return err
  }
  
});



/**
 * 유저 로그인
 * @param { id, password } 로그인 정보
 * @return { Promise<id, email, name, gender, birthday> } } 유저정보
*/
export const loginApi = createAsyncThunk('user/signupUser', async (data: LoginUser): Promise<any> => {
  try {

    // const config = {
    //     headers: { "Content-Type": "application/json", },
    //     withCredentials: true // 쿠키 cors 통신 설정
    // };

    // const user = await axios.post(`${host}/api/users/login`, data, config);
    // // localStorage.setItem('X-access-token', user.data.accToken);
    // setWithExpire('X-access-token', user.data.accToken, 1000 * 60 * 60 * 2) //로그인 후 억세스토큰 2시간 저장
    // dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data });
   

    const options = {
      method: 'POST',
      body: JSON.stringify({ ...data }),
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      // credentials: true,
    }

    const res = await fetch(`${host}/api/users/login`, { cache: 'no-store', ...options } );
    const user = res.json();
    return user;

  } catch(err) {
    return err
  };
});









export const user = createSlice({
  name: "user", 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {

    builder
      // signup
      .addCase(signupApi.pending, state => {
        state.signupLoading = true
      })
      .addCase(signupApi.fulfilled, state => {
        state.signupLoading = false
        state.signupDone = true
      })
      .addCase(signupApi.rejected, (state, action) => {
        state.signupLoading = false
        state.signupError = action.payload
      })

      // login
      .addCase(loginApi.pending, state => {
        state.loginLoading = true
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loginLoading = false
        state.loginDone = true
        state.user = action.payload
        state.isLoggedIn = true
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loginLoading = false
        state.loginError = action.payload
      })



  },

});

// export const { logIn, logOut } = auth.actions;
export default user.reducer;
