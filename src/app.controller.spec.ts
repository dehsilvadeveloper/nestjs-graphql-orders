import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    configServiceMock = module.get(ConfigService) as jest.Mocked<ConfigService>;
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return introduction message', () => {
    configServiceMock.getOrThrow.mockReturnValueOnce('http://localhost');
    configServiceMock.getOrThrow.mockReturnValueOnce(4000);

    const expectedIntroMessage: string = `
      Hello! :D
      I am an application that combines NestJS, Prisma and GraphQL.
      You can use the GraphQL API features making POST requests to the following endpoint:
      http://localhost:4000/graphql
    `;

    expect(appController.getHello()).toEqual(expectedIntroMessage);
  });
});
