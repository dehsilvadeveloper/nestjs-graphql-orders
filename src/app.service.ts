import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const introMessage: string = `
      Hello! :D
      I am an application that combines NestJS, Prisma and GraphQL.
      You can use the GraphQL API features making POST requests to the following endpoint:
      ${this.getAppBaseUrl()}
    `;

    return introMessage;
  }

  private getAppBaseUrl(): string {
    const appUrl: string = this.configService.getOrThrow<string>('app.http.url');
    const appPort: number = this.configService.getOrThrow<number>('app.http.port');

    return `${appUrl}:${appPort}/graphql`;
  }
}
