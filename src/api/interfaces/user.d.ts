

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatarUrl: string;
  created: string;
}

interface IRegister {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IToken {
  token: string;
  refreshToken: string;
}