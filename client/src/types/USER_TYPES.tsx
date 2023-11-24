export type USER_TYPE = {
  email: string;
  password: string;
  name: string;
  id: number;
  events: any[];
  token: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Register_Type = {
  email: string;
  password: string;
  name: string;
};
export type Login_Type = {
  email: string;
  password: string;
};
