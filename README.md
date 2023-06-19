# リアキャスター サーバーサイド
リアキャスターは、送信されたメッセージをクライアントに配信するアプリケーションです。

## 用意されているメッセージ送信手段
現状、メッセージを送信する手段は下記になります。
- このリポジトリに同梱されている、専用フォームからpost
- slackでメッセージを送信（詳しい手順は準備中）

## 用意されているメッセージ受信手段
- 専用のデスクトップアプリで受信（electron）
  - 詳細はこちら：https://github.com/saitokoh/reacaster_client

## サーバーサイド設定方法
- このリポジトリをclone
- 必要なパッケージをインストール

```
npm install
```

- （slackから受信する場合は）.env.sampleを.envにリネームして環境変数「SLACK_TOKEN」を設定
  - slackのtokenの準備方法とかは準備中です。
- 下記コマンドでサーバーを起動

```
node app.js
```

- デフォルトでは下記URLで専用フォームを表示できます。
  - http://localhost/
- client側を設定する
  - 詳細はこちら：https://github.com/saitokoh/reacaster_client
