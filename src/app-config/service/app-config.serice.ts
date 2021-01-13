import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppConfigService {
  constructor(private _configService: ConfigService) {}
  get name(): string {
    return this._configService.get<string>('app.name');
  }
  get env(): string {
    return this._configService.get<string>('app.env');
  }
  get port(): number {
    return Number(this._configService.get<number>('app.port'));
  }
  get dbServer(): string {
    return this._configService.get<string>('database.dbServer');
  }
  get dbPort(): number {
    return Number(this._configService.get<number>('database.dbPort'));
  }
  get dbDatabase(): string {
    return this._configService.get<string>('database.dbDatabase');
  }
}
