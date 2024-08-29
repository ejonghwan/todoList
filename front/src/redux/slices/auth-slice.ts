import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  value: AuthState;
};

// 유저 상태를 정의할 타입을 만든다.
type AuthState = {
  isAuth: boolean; // 로그인이 되었는가? 
  username: string; // 유저 닉네임
  uid: string; // id
  isModerator: boolean; // 관리자 계정인가요?
};

// 로그인 되지 않은 상태
const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth", // slice name
  initialState, // initial state
  reducers: {
    // 이 아래에 auth slice상태를 관리하기 위한 액션들을 정의하자.
    logOut: () => { 
      return initialState;
    },
    // 로그아웃을 하면 유저가 없는 initialState로 변경
    logIn: (State, action: PayloadAction<string>) => {
      // 여기서 State란 초기상태인데, 사용하지 않으니 회색으로 뜰 것이다.
      // _(언더 바)로 해둬서 사용하지 않음을 표시할 수도 있다.
      return {
        value: {
          isAuth: true, // 로그인 했으니까 true
          username: action.payload,
          uid: "uid",
          isModerator: false,
        },
      };
    },
    // 로그인을 하면 받아온 유저 정보로 변경
  },
});

export const { logIn, logOut } = auth.actions;
// 정의한 액션들을 export 
export default auth.reducer;
// authReducer를 export