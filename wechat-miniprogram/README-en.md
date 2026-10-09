# xiaowen-wechat-miniprogram Xiaowen AI Tattoo Pattern Generation Mini Program

Language: [中文](./README.md) | English

> Tags: WeChat Mini Program, Taro, Stable Diffusion, Tattoo Pattern Generation, AIGC, Text-to-Image

Xiaowen AI — An AI-based tattoo pattern generation mini program.

This is a WeChat mini program project based on Taro. It utilizes Stable Diffusion to generate tattoo patterns, offering a variety of styles.

## 1. Main Features

- Basic user login and registration
- User generation quota system
- Multiple tattoo pattern style options (dotwork, solid black, fresh and clean, geometric lines, traditional American, new traditional American, Japanese, realistic, trash polka, totem)

## 2. Related Projects

- [xiaowen-backend](../backend/): Backend project
- [xiaowen-BMC](../admin/): Frontend management project
- [sd-model](../sd-model/): Resources related to Stable Diffusion (models, datasets, etc.)

System structure diagram:
![system-structure-diagram.png](docs/images/system-structure-diagram.png)

## 3. Quick Start the Project

Recommended versions:

```
"node": "18.12.1",
"npm": "8.19.2"
```

Install dependencies:

```bash
npm install
```

Run the script 'dev:weapp' to start the project.

```
npm run dev:weapp
```

Run the commands inside `wechat-miniprogram/` and open that directory in WeChat Developer Tools.

> **Additional modifications needed:**
> 1. Change the BACKEND_URL in `src/constant/Urls.ts` to your own backend service address.
> 2. Set `setting.urlCheck` to false in `project.private.config.json`, or disable server domain name verification in WeChat Developer Tools.