import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AiController],
  providers: [AiService, PrismaClient],
})
export class AiModule {}
