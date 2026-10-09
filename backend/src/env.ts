import * as dotenv from 'dotenv';
import * as path from 'path';

import * as pkg from '../package.json';
import { getOsEnv, getOsEnvOptional, normalizePort, toBool, toNumber } from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
    path: path.join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`),
});

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    monitor: {
        enabled: toBool(getOsEnv('MONITOR_ENABLED')),
        route: getOsEnv('MONITOR_ROUTE'),
        username: getOsEnv('MONITOR_USERNAME'),
        password: getOsEnv('MONITOR_PASSWORD'),
    },
    mysql: {
        host: getOsEnv('MYSQL_HOST'),
        port: toNumber(getOsEnv('MYSQL_PORT')),
        database: getOsEnv('MYSQL_DATABASE'),
        username: getOsEnv('MYSQL_USERNAME'),
        password: getOsEnv('MYSQL_PASSWORD'),
        logging: toBool(getOsEnv('MYSQL_LOGGING')),
    },
    minio: {
        endPoint: getOsEnv('MINIO_ENDPOINT'),
        port: toNumber(getOsEnv('MINIO_PORT')),
        useSSL: toBool(getOsEnv('MINIO_USE_SSL')),
        accessKey: getOsEnv('MINIO_ACCESS_KEY'),
        secretKey: getOsEnv('MINIO_SECRET_KEY'),
        bucketName: getOsEnv('MINIO_BUCKET_NAME'),
    },
    baiduTranslation: {
        appid: getOsEnv('BAIDU_TRANSLATION_APP_ID'),
        key: getOsEnv('BAIDU_TRANSLATION_SECRET_KEY'),
        endpoint: getOsEnv('BAIDU_TRANSLATION_ENDPOINT'),
        path: getOsEnv('BAIDU_TRANSLATION_PATH'),
    },
};
