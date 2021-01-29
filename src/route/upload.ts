import { Context, Next } from 'koa';
import Router from 'koa-router';
import s3upload from '../libs/utils/s3upload';

const upload = new Router();

// S3 Upload Image
upload.post('/', async (ctx: Context, next: Next) => {
  if (ctx.request.files) {
    const file: any = ctx.request.files.file;

    const { key, url } = await s3upload({
      fileName: file.name,
      filePath: file.path,
      fileType: file.type,
    });

    ctx.body = { key, url };
  } else {
    await next();
  }
});

// Thumbnail Upload
upload.post('/thumbnail', async (ctx: Context, next: Next) => {
  if (ctx.request.files) {
    const file: any = ctx.request.files.file;

    const { key, url } = await s3upload({
      fileName: file.name,
      filePath: file.path,
      fileType: file.type,
    });

    ctx.body = { key, url };
  } else {
    await next();
  }
});

export default upload;
