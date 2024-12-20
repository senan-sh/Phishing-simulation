import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
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
  async createAttempt(@Body() createAttemptDto: CreateAttemptDto) {
    await this.attemptsService.createAndSend(
      createAttemptDto.email,
      createAttemptDto.emailContent,
    );
    return { message: 'Email sent successfully.' };
  }

  @Get(':id')
  async updateAttemptStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.attemptsService.updateStatus(id, body.status);
  }
}
