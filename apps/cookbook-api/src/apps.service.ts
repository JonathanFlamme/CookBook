import { Injectable } from '@nestjs/common';

@Injectable()
export class AppsService {
  getHello(): string {
    return 'Hello World!';
  }

  getFucking(): string {
    return 'Hello Fucking bordel de World!';
  }
}
