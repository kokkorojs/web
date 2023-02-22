import { getBotList, Bot } from '@kokkoro/core';
import { SourceError } from '../app';

interface BotInfo {
  uin: Bot['uin'];
  online: boolean;
  nickname: Bot['nickname'];
  sex: Bot['sex'];
  age: Bot['age'];
  tiny_id: Bot['tiny_id'];
  config: Bot['config'];
}

class BotService {
  getBotList() {
    const botList = getBotList();
    const infos: BotInfo[] = [];

    botList.forEach((bot) => {
      const { config, uin, nickname, sex, age, tiny_id, password } = bot;
      const element = {
        online: bot.isOnline(),
        uin, nickname, sex, age, tiny_id, config, password,
      };

      infos.push(element);
    });
    return infos;
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

  getFriendList(uin: number) {
    const bot = this.getBot(uin);

    return {
      list: bot.fl,
    };
  }

  getGroupList(uin: number) {
    const bot = this.getBot(uin);

    return {
      list: bot.gl,
    };
  }

  async sendPrivateMsg(uin: number, ...params: Parameters<Bot['sendPrivateMsg']>) {
    const bot = this.getBot(uin);
    const result = await bot.sendPrivateMsg(...params);

    return result;
  }

  async sendGroupMsg(uin: number, ...params: Parameters<Bot['sendGroupMsg']>) {
    const bot = this.getBot(uin);
    const result = await bot.sendGroupMsg(...params);

    return result;
  }
}

export default new BotService();
