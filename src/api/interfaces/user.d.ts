

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

interface ILoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    avatarUrl: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    created: string;
  };
}