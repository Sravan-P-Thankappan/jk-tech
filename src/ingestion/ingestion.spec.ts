import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';

describe('IngestionService', () => {
  let provider: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngestionService],
    }).compile();

    provider = module.get<IngestionService>(IngestionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
