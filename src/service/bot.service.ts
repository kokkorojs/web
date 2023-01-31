import { mapToObject } from '@kokkoro/utils';
import { getBotList, Client } from '../../../kokkoro';
import { SourceError } from '../app';

interface Bot {
  uin: Client['uin'];
  online: boolean;
  nickname: Client['nickname'];
  sex: Client['sex'];
  age: Client['age'];
  tiny_id: Client['tiny_id'];
  config: Client['config'];
}

class BotService {
  getBotList() {
    const botList = getBotList();
    const bots: Bot[] = [];

    botList.forEach((bot) => {
      const { config, uin, nickname, sex, age, tiny_id } = bot;
      const element = {
        online: bot.isOnline(),
        uin, nickname, sex, age, tiny_id, config,
      };

      bots.push(element);
    });
    return bots;
  }

  getBot(uin: number) {
    const botList = getBotList();
    const bot = botList.get(uin);

    if (!bot) {
      throw new SourceError(403, '不存在该实例');
    }
    return bot;
  }

  async loginBot(uin: number) {
    const bot = this.getBot(uin);
    const result = await bot.linkStart();

    return result;
  }

  logoutBot(uin: number) {
    const bot = this.getBot(uin);
    return bot.logout();
  }

  queryQrcodeResult(uin: number) {
    const bot = this.getBot(uin);
    return bot.queryQrcodeResult();
  }
}

export default new BotService();
