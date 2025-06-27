import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';

describe('DocumentService', () => {
  let provider: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentService],
    }).compile();

    provider = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
