import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { InferenceClient } from '@huggingface/inference';

@Injectable()
export class AiService {
  private readonly hfClient: InferenceClient;

  constructor(private prisma: PrismaClient) {
    if (process.env.HF_TOKEN) {
      this.hfClient = new InferenceClient(process.env.HF_TOKEN);
    }
  }

  private commentaryTemplates = {
    positive: [
      "Fans are buzzing with confidence as positive sentiment dominates after {player}'s explosive batting!",
      "What a shot! {player} sends the ball soaring over the boundary for a magnificent six!",
      "The crowd erupts in joy! {player} is absolutely on fire today!",
      "Incredible performance! {player} is making this look effortless!",
      "The atmosphere is electric as {player} continues to dominate the game!",
      "Spectacular! {player} just delivered a masterclass in batting!",
      "The fans are loving it! {player} brings the stadium to its feet!",
    ],
    neutral: [
      "The crowd is on the edge of their seats, tension is high!",
      "A strategic play by {player}, keeping the scoreboard ticking.",
      "Steady progress as {player} builds the innings carefully.",
      "The match is evenly poised, both teams fighting hard!",
      "A tactical approach from {player}, playing it safe for now.",
    ],
    negative: [
      "Disappointment for the home team as wickets fall in quick succession.",
      "Oh no! {player} is caught out, the crowd falls silent.",
      "A crucial wicket falls! This could change the game completely.",
      "The team is struggling now, losing momentum rapidly.",
      "Disaster strikes! {player} is dismissed at a critical moment.",
      "The fans are worried as the required run rate keeps climbing.",
    ]
  };

  private players = ["Kohli", "Rohit", "Dhoni", "Bumrah", "Pandya", "Sharma", "Patel"];

  async generateCommentary() {
    let text = "";
    let sentiment = "";

    try {
      if (!this.hfClient) {
        throw new Error("HF_TOKEN missing in .env");
      }

      // AI-generated commentary using Hugging Face Chat Completion
      const randomPlayer = this.players[Math.floor(Math.random() * this.players.length)];
      const commentaryPrompts = [
        `Generate a short, exciting cricket commentary (one sentence) about ${randomPlayer} hitting a massive six`,
        `Generate a short cricket commentary (one sentence) about ${randomPlayer} getting out`,
        `Generate a short cricket commentary (one sentence) about a close run out attempt involving ${randomPlayer}`,
        `Generate a short cricket commentary (one sentence) about ${randomPlayer} hitting a beautiful boundary`,
        `Generate a short cricket commentary (one sentence) about a spectacular catch to dismiss ${randomPlayer}`,
      ];
      const randomPrompt = commentaryPrompts[Math.floor(Math.random() * commentaryPrompts.length)];

      const chatCompletion = await this.hfClient.chatCompletion({
        model: "Qwen/Qwen1.5-1.8B-Chat:featherless-ai",
        messages: [
          {
            role: "user",
            content: randomPrompt,
          },
        ],
      });

      text = chatCompletion.choices[0].message.content || "The match continues with intense action on the field!";
      console.log("Generated commentary:", text);
    } catch (error) {
      console.error('Error generating commentary:', error);
      // Fallback to template-based commentary if AI generation fails
      const sentiments = ['positive', 'neutral', 'negative'];
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      const templates = this.commentaryTemplates[randomSentiment];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      const randomPlayer = this.players[Math.floor(Math.random() * this.players.length)];
      text = randomTemplate.replace('{player}', randomPlayer);
    }

    // Use Hugging Face for AI-powered sentiment analysis
    try {
      if (this.hfClient) {
        const output = await this.hfClient.textClassification({
          model: "tabularisai/multilingual-sentiment-analysis",
          inputs: text,
        });

        console.log("HF Sentiment Response:", JSON.stringify(output, null, 2));

        if (output && Array.isArray(output) && output.length > 0) {
          const topSentiment = output.reduce((prev, current) =>
            (prev.score > current.score) ? prev : current
          );

          const label = topSentiment.label.toLowerCase();

          if (label.includes('positive')) {
            sentiment = 'positive';
          } else if (label.includes('negative')) {
            sentiment = 'negative';
          } else {
            sentiment = 'neutral';
          }

          console.log(`Mapped sentiment: ${topSentiment.label} (${topSentiment.score.toFixed(2)}) -> ${sentiment}`);
        } else {
          sentiment = 'neutral';
        }
      } else {
        sentiment = 'neutral';
      }
    } catch (error) {
      console.log("HF Sentiment failed, using neutral:", error.message);
      sentiment = 'neutral';
    }

    await this.prisma.commentaryLog.create({
      data: { text, sentiment },
    });

    return { commentary: text, sentiment };
  }

  private getSimpleSentiment(text: string): string {
    const lowerText = text.toLowerCase();
    const positiveWords = ['amazing', 'brilliant', 'spectacular', 'excellent', 'fantastic', 'incredible', 'magnificent', 'wonderful', 'great', 'six', 'boundary', 'win', 'victory'];
    const negativeWords = ['disaster', 'terrible', 'awful', 'disappointing', 'struggling', 'wicket', 'out', 'loss', 'defeat', 'poor'];

    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}