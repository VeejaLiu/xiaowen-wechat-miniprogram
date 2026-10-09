# Development and Setup

Language: [中文](./development.md) | English

This guide covers the modules, development environments and startup commands. See the [project overview](../README-en.md) for product features and screenshots.

## Project Structure

| Directory | Component |
| --- | --- |
| [wechat-miniprogram/](../wechat-miniprogram/) | WeChat mini program built with Taro, Vue 3 and NutUI |
| [backend/](../backend/) | Express/TypeScript backend, users, quotas, generation queue, MySQL, MinIO and WeChat integration |
| [admin/](../admin/) | React/Vite/Ant Design management frontend |
| [sd-model/](../sd-model/) | Stable Diffusion documentation and LoRA training assets |

Each application retains its own dependency manifest, lockfile and configuration. Install dependencies inside each application directory. Root scripts forward commands to the appropriate directory.

## Development

Mini program (original declared environment: Node.js 18.12.1 / npm 8.19.2):

```bash
cd wechat-miniprogram
npm install
npm run dev:weapp
```

Open **`wechat-miniprogram/`** in WeChat Developer Tools. Its output directory is `wechat-miniprogram/dist/`. Configure `BACKEND_URL` in `wechat-miniprogram/src/constant/Urls.ts`.

Backend (original declared environment: Node.js 18.20.3 / npm 10.7.0):

```bash
cd backend
cp .env.test .env
# Fill in your service endpoints and credentials.
npm ci
npm run start
```

Prepare MySQL using `backend/sql_init/database.sql` as a reference and configure MySQL, MinIO, WeChat, translation, JWT and `GENERATE_SERVER_URL` in `.env`. Keep actual credentials in the ignored `.env` file.

Admin frontend:

```bash
cd admin
npm ci
npm run dev
```

Configure the backend URL in `admin/src/service/config.ts`.

After dependencies are installed, root commands include `npm run dev:weapp`, `npm run build:weapp`, `npm run start:backend`, `npm run dev:admin` and `npm run build:admin`.

`sd-model/` contains training assets and documentation. The running Stable Diffusion service and model weights must be prepared separately.

## Migration

Default branches were imported with their original Git histories. Original branch references are retained as `legacy/<component>/<original-branch>` tags. Each tag points to a module snapshot in its subdirectory, with the original branch head preserved as its first parent. The former `xiaowen-generate-server` repository was renamed to `xiaowen-sd-model` before this migration.

The three source repositories have been deleted after remote verification. Their source code and Git histories are preserved here; ongoing development belongs here. See [migration notes](./repository-consolidation.md) for provenance and checks. The retired backend deployment workflow has been removed from the consolidated code and historical module snapshots. This repository has no automatic deployment workflows.
