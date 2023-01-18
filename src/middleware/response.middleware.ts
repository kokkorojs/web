import { Next } from 'koa';
import { Context, SourceError } from '../app';

interface Response {
  code: number;
  message: string;
  data: any;
}

function parseCode(status: number): number {
  let code: number;

  switch (status) {
    case 400:
      code = 40001;
      break;
    case 401:
      code = 40002;
      break;
    case 403:
      code = 40003;
      break;
    case 409:
      code = 40004;
      break;
    default:
      code = -1;
      break;
  }
  return code;
}

export default async function responseHandler(ctx: Context, next: Next) {
  try {
    await next();

    if (!ctx.result) {
      return;
    }
    const { message, data } = ctx.result;

    // TODO ／人◕ ‿‿ ◕人＼ 状态码处理
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message,
      data: data ?? null,
    };
  } catch (error) {
    let code: number;
    let status: number;
    let message: string;

    if (error instanceof SourceError) {
      code = parseCode(error.status);
      status = error.status;
      message = error.message;
    } else {
      code = -1;
      status = 500;
      message = (error as Error).message;

      console.error(error);
    }
    const response: Response = {
      code, message, data: null,
    };

    ctx.status = status;
    ctx.body = response;
  }
}
