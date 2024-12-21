import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PhishingAttemptStatus } from '@shared/schemas/phishing-attempts.schema';
import { AttemptsService } from './attempts.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';

class SuccessResponse {
  @ApiProperty({ example: 'Email sent successfully.' })
  message: string;
}

class ErrorResponse {
  @ApiProperty({ example: 'Validation failed.' })
  error: string;
}

@Controller('phishing-attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}
  @Get()
  @ApiOperation({ summary: 'Get Phishing Attempts with pagination' })
  @ApiOkResponse({
    description: 'Get Phishing Attempts List',
    example: {
      data: [
        {
          _id: '6765bcc5e153b97b940a1e9a',
          email: 'admin@email.com',
          status: 'PENDING',
          createdAt: '2024-12-20T18:51:49.117Z',
          __v: 0,
          emailContent: 'Hello world',
        },
      ],
      page: '1',
      size: '10',
      number: 0,
      totalElements: 17,
      totalPages: 2,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated or token is invalid',
  })
  async listAttempts(
    @Query('page') page: number = 1,
    @Query('size') limit: number = 10,
  ) {
    const { data, totalElements, totalPages } =
      await this.attemptsService.findPaginated(page, limit);
    return {
      data,
      page,
      size: limit,
      number: page - 1,
      totalElements,
      totalPages,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Email has been created and sent successfully.',
    type: SuccessResponse,
    content: {
      'application/json': {
        example: { message: 'Email sent successfully.' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    type: ErrorResponse,
    content: {
      'application/json': {
        example: { error: 'Validation failed.' },
      },
    },
  })
  @ApiOperation({ summary: 'Create Phishing attempt to target' })
  async createAttempt(@Body() createAttemptDto: CreateAttemptDto) {
    await this.attemptsService.createAndSend(
      createAttemptDto.email,
      createAttemptDto.emailContent,
    );
    return { message: 'Email sent successfully.' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mark Phishing attempt as read' })
  @ApiOkResponse({
    description: 'Successfull response',
    example: {
      message: 'Phishing attempt marked as clicked',
    },
  })
  async markAsRead(@Param('id') id: string) {
    try {
      await this.attemptsService.updateStatus(
        id,
        PhishingAttemptStatus.Clicked,
      );

      return { message: 'Phishing attempt marked as clicked' };
    } catch {
      throw new HttpException(
        'Failed to update phishing attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
