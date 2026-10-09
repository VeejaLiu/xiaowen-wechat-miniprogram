import { GenerateConfig, TATTOO_STYLE } from './type';
import { getGenerateConfig } from './generateConfig';
import { putObject } from '../minio/minio';
import { Logger } from '../../lib/logger';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../../env';

const fetch = require('node-fetch');
const log = new Logger(__filename);

/**
 * Get images path from generate server
 *
 * @param body
 * @returns images path of minio, `bucketName/objectName`
 */
export async function draw({ style, prompt }: { style: TATTOO_STYLE; prompt: string }): Promise<{
    images: {
        original: string;
        thumbnail: string;
    }[];
    parameters?: any;
}> {
    // Get generate config
    const generateConfig: GenerateConfig = await getGenerateConfig({ style, prompt });

    // Send request to generate server
    const generateRes = await fetch(`${env.generateServer.url}/sdapi/v1/txt2img`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            prompt: generateConfig.prompt,
            negative_prompt: generateConfig.negativePrompt,
            batch_size: 4,
            cfg_scale: 7,
            steps: 20,
            width: generateConfig.width,
            height: generateConfig.height,
        }),
    });
    // console.log(generateRes);
    if (generateRes.status !== 200) {
        log.error(`[draw] generate server error: ${generateRes.status}`);
        throw new Error(`generate server error: ${generateRes.status}`);
    }

    const generateResJson = await generateRes.json();
    // console.log(generateResJson);

    // Get images base64 from generate server
    const images = generateResJson.images;

    const imagePaths: { original: string; thumbnail: string }[] = [];
    const uniqueId = uuidv4();
    for (let i = 0; i < images.length; i++) {
        const imageBase64: string = images[i];
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        const objectName = `${uniqueId}_${new Date().toISOString()}_${i}`;
        const imageName = `${objectName}.png`;
        // upload image to minio
        const minioPath = await putObject(imageName, imageBuffer);
        // create image thumbnail
        const thumbnailBuffer = await sharp(imageBuffer).resize(128, 128).toBuffer();
        const thumbnailName = `${objectName}_thumbnail.png`;
        const thumbnailMinioPath = await putObject(thumbnailName, thumbnailBuffer);
        if (minioPath === false || thumbnailMinioPath === false) {
            continue;
        }
        imagePaths.push({ original: minioPath as string, thumbnail: thumbnailMinioPath as string });
    }
    const parameters = generateResJson.parameters;
    return {
        images: imagePaths,
        parameters,
    };
}
