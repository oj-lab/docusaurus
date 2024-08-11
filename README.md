# OJ Lab Docusaurus

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## i18n

```shell
npx docusaurus write-translations -l zh-CN
cp -rn docs/** i18n/zh-CN/docusaurus-plugin-content-docs/current
```

Start your site on the Chinese locale:

```shell
npm run start -- --locale zh-CN
```
