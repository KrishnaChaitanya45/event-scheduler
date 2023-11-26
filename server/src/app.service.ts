import { Injectable } from '@nestjs/common';

//? This is the default code and not used in this project ( untouched)
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
