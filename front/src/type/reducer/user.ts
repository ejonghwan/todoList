export interface UserInitialState {
   isLoggedIn: boolean;
   isModerator: boolean;

   signupLoading: boolean;
   signupDone: boolean;
   signupError: string | unknown;

   loginLoading: boolean;
   loginDone: boolean;
   loginError: string | unknown;

   user: User;
};

export interface User {
   id: string;
   email: string;
   name: string;
   gender: string;
   birthday: string
}


export interface SignupUser {
   id: string;
   password: string;
   email: string;
   name: string;
   question: object;
   gender: string;
   birthday: string
}


export interface LoginUser {
   id: string,
   password: string
}


