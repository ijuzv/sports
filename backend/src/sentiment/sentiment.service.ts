import { Injectable } from '@nestjs/common';

@Injectable()
export class SentimentService {
  private positiveWords = ['great', 'win', 'amazing', 'super', 'good'];
  private negativeWords = ['bad', 'poor', 'lose', 'boring', 'worst'];

  analyze(comments: string[]) {
    let positive = 0;
    let negative = 0;
    let neutral = 0;

    comments.forEach((comment) => {
      const lowerComment = comment.toLowerCase();
      let isPositive = false;
      let isNegative = false;

      this.positiveWords.forEach((word) => {
        if (lowerComment.includes(word)) isPositive = true;
      });

      this.negativeWords.forEach((word) => {
        if (lowerComment.includes(word)) isNegative = true;
      });

      if (isPositive && !isNegative) {
        positive++;
      } else if (isNegative && !isPositive) {
        negative++;
      } else {
        neutral++;
      }
    });

    return { positive, neutral, negative };
  }
}
