import * as Minio from 'minio';
import { env } from '../../env';
import { Logger } from '../../lib/logger';

const log = new Logger(__filename);

// Instantiate the minio client with the endpoint and access keys as shown below.
const minioClient = new Minio.Client({
    endPoint: env.minio.endPoint || '127.0.0.1',
    port: env.minio.port || 9000,
    useSSL: env.minio.useSSL || false,
    accessKey: env.minio.accessKey,
    secretKey: env.minio.secretKey,
});

const BUCKET_NAME = env.minio.bucketName || 'pictures';

export async function putObject(objectName: string, buffer: Buffer): Promise<string | boolean> {
    try {
        log.info(`putObject() objectName=[${objectName}]`);
        const UploadedObjectInfo = await minioClient.putObject(BUCKET_NAME, objectName, buffer);
        log.info('putObject() successfully, Result', UploadedObjectInfo);
        // return path
        const imageUrl = `http://${env.minio.endPoint}:${env.minio.port}/${BUCKET_NAME}/${objectName}`;
        log.info(`putObject() imageUrl=[${imageUrl}]`);
        return imageUrl;
    } catch (e) {
        log.error('putObject() error', e);
        return false;
    }
}

export async function getObject(objectName: string) {
    // Downloads an object as a stream.
    const dataStream = await minioClient.getObject(BUCKET_NAME, objectName);
    // dataStream to buffer
    // const buffer = await streamToBuffer(dataStream);
    return dataStream;
}
