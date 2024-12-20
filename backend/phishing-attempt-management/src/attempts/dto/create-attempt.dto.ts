import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAttemptDto {
  @ApiProperty({
    description: 'The email address to send the content to',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The content to include in the email',
    example: 'Hello, this is a test email.',
  })
  @IsNotEmpty()
  @IsString()
  emailContent: string;
}
