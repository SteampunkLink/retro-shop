export interface IAuthState {
  userInfo: IUserInfo | null;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ISubmitFormArgs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
