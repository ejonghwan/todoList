export interface InitialState {
   isLoggedIn: boolean;
   isModerator: boolean;
   user: User
 };

 export interface User {
   id: string, 
   email: string, 
   name: string, 
   gender: string, 
   birthday: string
}


export interface SignupUser {
   id: string, 
   password: string, 
   email: string, 
   name: string, 
   question: object, 
   gender: string, 
   birthday: string
}


