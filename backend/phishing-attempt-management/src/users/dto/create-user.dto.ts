// src/users/dto/create-user.dto.ts

import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../validators/match.validator'; // Adjust the path as necessary

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Surname is required' })
  @IsString({ message: 'Surname must be a string' })
  surname: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    minLength: 6,
    example: 'strongPassword123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Confirmation of the user password',
    minLength: 6,
    example: 'strongPassword123',
  })
  @IsNotEmpty({ message: 'Confirm Password is required' })
  @MinLength(6, {
    message: 'Confirm Password must be at least 6 characters long',
  })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
