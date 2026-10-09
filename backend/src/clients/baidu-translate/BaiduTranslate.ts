import { env } from '../../env';
import * as crypto from 'crypto';
import { Logger } from '../../lib/logger';

const log = new Logger(__filename);
const fetch = require('node-fetch');

class BaiduTranslateClient {
    private appid: string;
    private key: string;

    constructor(appid: string, key: string) {
        this.appid = appid;
        this.key = key;
    }

    private generateSalt(): number {
        return new Date().getTime();
    }

    private generateSign(query: string, salt: number): string {
        const string = this.appid + query + salt + this.key;
        return crypto.createHash('md5').update(string).digest('hex');
    }

    public async translate(query: string, from: string, to: string): Promise<any> {
        const salt = this.generateSalt();
        const sign = this.generateSign(query, salt);

        // 其余的请求代码保持不变

        const apiUrl = `${env.baiduTranslation.endpoint}${env.baiduTranslation.path}`;
        const requestData = {
            q: query,
            appid: this.appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign,
        };

        try {
            const formBody = [];
            for (const property in requestData) {
                const encodedKey = encodeURIComponent(property);
                const encodedValue = encodeURIComponent(requestData[property]);
                formBody.push(encodedKey + '=' + encodedValue);
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody.join('&'),
            });

            if (response.ok) {
                const data = await response.json();
                return data.trans_result.map((item: any) => item.dst).join(' ');
            } else {
                log.error('response is not ok: ', response.status, response.statusText);
            }
        } catch (error) {
            log.error('[translate] Error:', error.message);
        }
    }
}

// 示例用法
const appid = env.baiduTranslation.appid;
const key = env.baiduTranslation.key;

const client = new BaiduTranslateClient(appid, key);

export async function translate(query: string, from: string = 'zh', to: string = 'en'): Promise<string> {
    log.info(`[translate] translate "${query}", from [${from}] to [${to}]`);
    const apiRes = await client.translate(query, from, to);
    log.info(`[translate] result: ${apiRes}`);
    return apiRes;
}
