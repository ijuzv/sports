import { Body, Controller, Post } from '@nestjs/common';
import { SentimentService } from './sentiment.service';

@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Post('analyze')
  analyzeSentiment(@Body() body: { comments: string[] }) {
    return this.sentimentService.analyze(body.comments);
  }
}
