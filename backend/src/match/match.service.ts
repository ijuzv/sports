import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchService {
  getMatchData() {
    return {
      teamA: 'India',
      teamB: 'Australia',
      scoreA: '145/4',
      scoreB: '120/7',
      overs: '17.3',
      topPlayer: 'Virat Kohli',
    };
  }
}
