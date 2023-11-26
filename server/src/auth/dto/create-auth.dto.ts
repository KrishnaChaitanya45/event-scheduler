//? DTO's are used to define the shape of the data that will be sent over the network

export class CreateAuthDto {
  email: string;
  password: string;
  name: string;
}
export class CreatedUserDto {
  id: string;
  email: string;
  password: string;
  token?: string;
  name: string;
}
export class loginUserDTO {
  email: string;
  password: string;
}
