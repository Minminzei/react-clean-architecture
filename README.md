# React + Clean Architecture

- このレポジトリは React アプリをクリーンアーキテクチャで実装する勉強用に作成されました。
- このレポジトリは Chrome 拡張機能の勉強用に作成されました。

## 作成アプリ

Chrome 拡張機能です。ページ内で文字を範囲選択するとウィンドウが立上があり、OpenAI API に「英訳してください」というプロンプトとともに POST される翻訳機能です。

https://github.com/user-attachments/assets/26f1ee22-9754-4f68-968e-40825223aa8a

## クリーンアーキテクチャ

ビジネスロジックを UI や API、DB などから独立させることに重点をおきます。レイヤーごとに役割を分離して、依存の方向をビジネスのコアロジックからサービスロジックへと一方向に管理します。このレポジトリでいうと domain > infrastructure/ user_cases > ui という階層で依存します。

### 1. ドメイン(domain)

ビジネスルールを表現したもので、すべてのレイヤーから独立しています。主に entity とそれへの操作メソッドの interface を定義します。

#### 1-1. entities

データの型を定義します。

#### 1-2. factories

entity の生成を行います。

#### 1-3. repositories

entity の操作メソッドを定義した interface です。

#### 1-4. services

entity 以外のメソッドの interface を定義しています。

### 2. infrastructure

ドメインの具象クラスで、ドメインにのみ依存します。`domain/repositories`で定義された entity 操作のメソッドを実装します。

### 3. user_cases

アプリケーションロジックで、ドメインにのみ依存します。基本的には `infrastructure/repositories` で生成されたドメインの具象クラスを使ってメソッド操作を行いますが、`infrastructure`に直接依存せず、依存性注入(DI)で具象クラスのユースケース層への流し込みを行います。ユースケース層をインフラ層から分離することで、例えばモックアップやテストコードの実装でダミーの entity 操作を行えます。

### 4. ui

もっとも外側のレイヤーで React アプリケーションの実装を担当します。この UI レイヤーをシステムのコアロジックから分離することで他のフレームワーク(Next, Vue)への変更や UI の修正がビジネスロジックに影響しないようにします。

#### 4-1. 依存性注入(di)

ui 層の特筆すべき点は di 層を使って use_case とレポジトリ層(`infrastructure/repositories`)の関連付けを行っていることです。`src/ui/di/UserService.ts`を例にすると、HttpClient の具象クラスを UserRepository の具象クラスに流し込み、UserRepository をインスタンス化しています。このとき HttpClient をモックサーバーに置き換えてインスタンス化させたり、UserRepository を別のダミークラスに置き換えてインスタンス化させることもできます。唯一のルールはドメイン層で定義された interface およびデータ型の通りに実装されていることです。インスタンス化された UserRepository はユースケース層である UserService に流し込まれインスタンス化され、React アプリケーションで使用されています。

## セットアップ

```bash
# パッケージインストール
pnpm install

# サーバー起動
pnpm run server

# アプリ起動
pnpm dev

# ビルド
pnpm build
```

## Chrome 拡張へのデプロイ

ビルドされたアプリケーションは`dist`に出力されます。拡張機能`chrome://extensions/` > `パッケージ化されていない機能を取り込む`で`dist`を選択するとローカル環境での ChromeExtension が使えます。
