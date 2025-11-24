import { Module } from '@nestjs/common';
import { MatchModule } from './match/match.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [MatchModule, SentimentModule, AiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
