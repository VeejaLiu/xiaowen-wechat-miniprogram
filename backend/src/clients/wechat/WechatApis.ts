import { getOsEnv } from '../../lib/env';
import { Logger } from '../../lib/logger';
import { env } from '../../env';

const logger = new Logger('WechatApis');
const fetch = require('node-fetch');

export interface WechatCode2SessionResponse {
    openid: string;
    session_key: string;
}

export class WechatApis {
    private static appId: string = env.wechatMiniProgram.appid;
    private static appSecret = env.wechatMiniProgram.secret;

    static async code2session(code: string): Promise<WechatCode2SessionResponse> {
        try {
            // 调用https://api.weixin.qq.com/sns/jscode2session接口获取openid
            const wxRes = await fetch(
                `https://api.weixin.qq.com/sns/jscode2session?` +
                    `appid=${this.appId}` +
                    `&` +
                    `secret=${this.appSecret}` +
                    `&` +
                    `js_code=${code}` +
                    `&` +
                    `grant_type=authorization_code`,
                {
                    method: 'GET',
                },
            );

            const wxResJson = await wxRes.json();
            if (wxResJson.errcode) {
                throw new Error(wxResJson.errcode);
            }
            return wxResJson;
        } catch (e) {
            logger.error(`[code2session] appId: ${this.appId}, appSecret: ${this.appSecret}, code: ${code}`);
            logger.error(`[code2session] e.message: ${e.message}`);
            throw e;
        }
    }

    static async getStableAccessToken(): Promise<string> {
        try {
            const wxRes = await fetch(`https://api.weixin.qq.com/cgi-bin/stable_token`, {
                method: 'POST',
                body: JSON.stringify({
                    grant_type: 'client_credential',
                    appid: this.appId,
                    secret: this.appSecret,
                }),
            });
            const wxResJson = await wxRes.json();
            if (wxResJson.errcode) {
                throw new Error(wxResJson.errcode);
            }

            return wxResJson.access_token;
        } catch (e) {
            logger.error(`[getAccessToken] ${e}`);
            throw e;
        }
    }

    static formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    static async sendTemplateMessage({
        touser,
        style,
        prompt,
    }: {
        touser: string;
        style: string;
        prompt: string;
    }): Promise<void> {
        try {
            const accessToken = await this.getStableAccessToken();
            // template_id	string	是	所需下发的订阅模板id
            // page	string	否	点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转
            // touser	string	是	接收者（用户）的 openid
            // data	string	是	模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }的object
            // miniprogram_state	string	是	跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
            // lang	string	是	进入小程序查看”的语言类型，支持zh_CN(简体中文)、en_US(英文)、zh_HK(繁体中文)、zh_TW(繁体中文)，默认为zh_CN
            const wxRes = await fetch(
                `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        template_id: 'tOTzytOQzSoqLB0z7UnEp2GNFZQi4tkPdDJ0yoxxaXs',
                        touser,
                        data: {
                            // AI作图主题内容 - 风格
                            phrase15: { value: style },
                            // 生成词内容 - 提示词
                            thing10: { value: prompt },
                            // 完成时间内容 - 完成时间, '2019/10/21 18:29'
                            date2: { value: this.formatDate(new Date()) },
                        },
                        miniprogram_state: 'developer',
                        lang: 'zh_CN',
                    }),
                },
            );

            const wxResJson = await wxRes.json();
            if (wxResJson.errcode) {
                throw new Error(wxResJson.errcode);
            }
        } catch (e) {
            logger.error(`[sendTemplateMessage] ${e}`);
            throw e;
        }
    }

    /**
     * 生成小程序码
     */
    // static async getWxacodeUnlimit({ inviteCode }: { inviteCode: string }): Promise<Buffer> {
    //     try {
    //         const accessToken = await this.getStableAccessToken();
    //         const wxRes = await fetch(`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`, {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 scene: `inviteBy=${inviteCode}`,
    //                 page: 'pages/index/index',
    //                 width: 280,
    //                 check_path: false,
    //             }),
    //         });
    //
    //         const wxResBuffer = await wxRes.buffer();
    //         return wxResBuffer;
    //     } catch (e) {
    //         logger.error(`[getWxacodeUnlimit] ${e}`);
    //         throw e;
    //     }
    // }
}
