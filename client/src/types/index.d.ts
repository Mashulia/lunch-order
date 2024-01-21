export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string | null;
}
