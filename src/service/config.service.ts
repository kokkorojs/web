import { getConfig, KokkoroConfig } from 'kokkoro';
import { SourceError } from '../app';

class ConfigService {
  public getKokkoroConfig(): KokkoroConfig {
    return getConfig();
  }
}

export default new ConfigService();
