import _fs from 'fs';
import { INestApplication } from '@nestjs/common';

export async function listenRandomPort(
  app: INestApplication,
  path: string,
  prefix: string,
) {
  _fs.readFile(path, async (err, data) => {
    if (err) {
      const server = await app.listen(0);
      const port = server.address().port;
      console.log(`App is listening at: http://localhost:${port}`);
      console.log(
        `Docs is listening at: http://localhost:${port}${prefix || ''}/docs`,
      );
      _fs.writeFileSync(path, JSON.stringify({ port }));
      return;
    }

    const json = data.toString();
    const { port } = JSON.parse(json);
    await app.listen(port);
    console.log(`App is listening at: http://localhost:${port}`);
    console.log(
      `Docs is listening at: http://localhost:${port}${prefix || ''}/docs`,
    );
  });
}
