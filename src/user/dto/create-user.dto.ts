import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6)
  password?: string;
}
