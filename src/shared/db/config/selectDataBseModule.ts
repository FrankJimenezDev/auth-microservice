import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';

const logger = new Logger('Database');

export function selectDataBase() {
    return TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const dbType = configService.get<string>('DB_TYPE');

            switch (dbType) {
                case 'mysql':
                case 'postgres':
                    logger.debug(`Inicializando ${dbType} con TypeORM`);
                    return {
                        type: dbType as 'mysql' | 'postgres',
                        host: configService.get<string>('DB_HOST'),
                        port: configService.get<number>('DB_PORT'),
                        username: configService.get<string>('DB_USER'),
                        password: configService.get<string>('DB_PASSWORD'),
                        database: configService.get<string>('DB_NAME'),
                        entities: [User],
                        synchronize: true,
                    };

                case 'sqlite':
                    logger.debug('Inicializando SQLite con TypeORM');
                    return {
                        type: 'sqlite',
                        database: configService.get<string>('DB_NAME'),
                        entities: [User],
                        synchronize: true,
                        logging: true,
                    };

                case 'mongodb':
                    logger.log('Inicializando MongoDB con TypeORM');
                    return {
                        type: 'mongodb',
                        url: configService.get<string>('DB_URL'),
                        useUnifiedTopology: true,
                        entities: [User],
                        synchronize: true,
                    };

                default:
                    throw new Error(`Unsupported database type: ${dbType}`);
            }
        },
    });
}
