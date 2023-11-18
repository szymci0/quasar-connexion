# Quasar App (recruitment-task)

# What I've changed:

1. Deleted n dependency (not working on Windows)
2. Fixed pinia initialization bug - [axios.ts](https://github.com/szymci0/quasar-connexion/blob/main/frontend/src/boot/axios.ts)
3. Fixed token authorization bug - [axios_config.ts](https://github.com/szymci0/quasar-connexion/blob/main/frontend/src/api/axios_config.ts)
4. Created functions for communication with backend - [article.ts](https://github.com/szymci0/quasar-connexion/blob/main/frontend/src/api/article.ts)
5. Created custom modal component - [ArticleModal.vue](https://github.com/szymci0/quasar-connexion/blob/main/frontend/src/components/ArticleModal.vue)
6. Implemented main page using all previous points - [MainPage.vue](https://github.com/szymci0/quasar-connexion/blob/main/frontend/src/pages/MainPage.vue)

PROOF OF WORKING: [VIDEO on google drive](https://drive.google.com/file/d/1U4p-BAiKkisJGpzBxMIzlptjYJ_4FtqX/view?usp=sharing)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
