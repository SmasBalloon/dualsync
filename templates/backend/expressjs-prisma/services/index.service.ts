export class IndexService {
  async getWelcomeMessage(): Promise<{ message: string; timestamp: Date }> {
    return {
      message: 'Hello, Express.js server is running!',
      timestamp: new Date(),
    };
  }

  async getHealthCheck(): Promise<{ status: string; uptime: number }> {
    return {
      status: 'ok',
      uptime: process.uptime(),
    };
  }
}

export const indexService = new IndexService();
