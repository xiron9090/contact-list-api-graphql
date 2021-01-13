import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
export default [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${process.env.DB_SERVER}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: true,
          useCreateIndex: true,
        },
      ),
  },
];
