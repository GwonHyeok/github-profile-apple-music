# [WIP] github-profile-apple-music

# How to use

[https://github-profile-apple-music.web.app](https://github-profile-apple-music.web.app)

# Example

## Recently Played

[![Recently Played](https://github-profile-apple-music.web.app/api/v1/users/rpMHqh68GCkK2hQNgkMl/recent/played/tracks)

# Development

1. [Prerequisites](#Prerequisites)
2. [Install](#Install)
3. [Packages](#Packages)

## Prerequisites

* [`Node.js / v16.15.0`](https://nodejs.org/en/)
* [`Yarn / v3.2.1`](https://yarnpkg.com/)

## Install

### set yarn version to yarn berry

```bash
yarn set version berry
```

### yarn install

```bash
yarn
```

### Environment Variables

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_ADSENSE_ENABLED
VITE_ADSENSE_CLIENT_ID
VITE_API_URL
APPLE_MEDIA_SERVICE_KEY
APPLE_MEDIA_SERVICE_KEY_ID
APPLE_MEDIA_SERVICE_TEAM_ID
```

## Packages

### backend

#### run backend locally

```bash
yarn start:backend
```

#### build backend

```bash
yarn build
```

#### deploy backend

```shell
yarn deploy:backend
```

#### kill all firebase emulator processes

```bash
lsof -t -i:8080 -i:9000 -i:9099 -i:9199 -i:9090 -i:8085 | xargs kill -9
```

### web

#### run web locally

```bash
yarn dev:web
```

#### build web

```bash
yarn build:web
```

#### deployment web

```bash
yarn deploy:web
```
