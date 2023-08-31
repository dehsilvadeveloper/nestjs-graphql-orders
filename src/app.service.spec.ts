import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { 
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn() 
          }
        }
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    configServiceMock = module.get(ConfigService) as jest.Mocked<ConfigService>;
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
    
    expect(appService.getHello()).toEqual(expectedIntroMessage);
  });
});
