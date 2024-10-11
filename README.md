# React + Clean Architecture

- このレポジトリは React アプリをクリーンアーキテクチャで実装する勉強用に作成されました。
- このレポジトリは Chrome 拡張機能の勉強用に作成されました。

## 作成アプリ

Chrome 拡張機能です。ページ内で文字を範囲選択するとウィンドウが立上があり、OpenAI API に「英訳してください」というプロンプトとともに POST される翻訳機能です。

https://github.com/user-attachments/assets/26f1ee22-9754-4f68-968e-40825223aa8a

## クリーンアーキテクチャ

ビジネスロジックを UI や API、フレームワークなどから独立させることに重点をおいたソフトウェアの設計思想です。ビジネスロジックとサービスロジックを軸にレイヤーを分離していき、依存の方向をサービスロジックからビジネスロジックへと一方向に管理します。これによりサービスロジックでの変更(Ex. UI 変更やカスタマージャーニーの変更)がビジネスロジックに影響しないようにします。このレポジトリでいうと domain > infrastructure/ user_cases > ui という階層で依存します。

![クリーンアーキテクチャ](https://github.com/user-attachments/assets/3e28f55c-228a-4c6d-b867-c240ffe99048)

### 1. ドメイン(domain)

ビジネスルールを表現し、他のレイヤーから完全に独立しています。主にエンティティとそれに対する操作を定義するインターフェースを提供します。

#### 1-1. entities

ビジネスデータモデルを定義します。たとえば User.ts はユーザー情報を表す型です。

#### 1-2. factories

エンティティのインスタンスを生成するためのロジックを提供します。

#### 1-3. repositories

エンティティの操作メソッド（CRUD 操作など）を定義したインターフェースです。このレイヤーには通信方法やどのようなストレージ(MySQL, FileSyetem etc)に保存するのかなどは関与しません。

#### 1-4. services

エンティティに依存しないメソッドや、アプリケーション全体のロジックを処理するインターフェースを定義します。

### 2. infrastructure

ドメインの具象クラスで、ドメインにのみ依存します。`domain/repositories`で定義されたメソッドを実装します。

### 3. use_cases

アプリケーションロジックで、ドメインにのみ依存します。実装上は `infrastructure/repositories` で生成されたドメインの具象クラスを使ってメソッド操作を行うことが多いですが、原理上は`infrastructure`に直接依存せず、依存性注入(DI)で具象クラスのユースケース層への流し込みを行います。つまり`infrastructure/repositories`以外の具象クラスをアプリケーションロジックに注入することで、例えばモックサーバーを使ったテストコードの実装が容易に行えるようになります。

### 4. ui

もっとも外側のレイヤーで React アプリケーションの実装を担当します。この UI レイヤーをシステムのコアロジックから分離することで他のフレームワーク(Next, Vue)への変更や UI の修正がビジネスロジックに影響しないようにします。

#### 4-1. 依存性注入(di)

ui 層の特筆すべき点は di 層を使って use_case とレポジトリ層(`infrastructure/repositories`)の関連付けを行っていることです。`src/ui/di/UserService.ts`を例にすると、HttpClient の具象クラスを UserRepository の具象クラスに流し込み、UserRepository をインスタンス化しています。このとき HttpClient をモックサーバーに置き換えてインスタンス化させたり、UserRepository を別のダミークラスに置き換えてインスタンス化させることもできます。唯一のルールはドメイン層で定義された interface およびデータ型の通りに実装されていることです。インスタンス化された UserRepository はユースケース層である UserService に流し込まれインスタンス化され、React アプリケーションで使用されています。

## フォルダ構成

```bash
/src
├── /domain
│   ├── /entities         # データモデル。データの型を定義
│   │     └── User.ts
│   ├── /factories        # ファクトリパターン
│   │     └── User.ts
│   ├── /repositories     # レポジトリパターン。エンティティへのメソッドを定義する
│   │     └── UserRepository.ts
│   └── /services         # ストレージやHTTPクライアントなど、外部APIのメソッドを定義する
│         └── HttpClient.ts
├── /infrastructure
│   ├── /repositories     # domain/repositoriesの具象クラス
│   │     └── UserRepository.ts
│   └── /services         # domain/servicesの具象クラス
│         └── HttpClient.ts
├── /use_case
│   └── UserService.ts    # アプリケーションロジック
└── /ui                   # ユーザーインターフェース。Reactアプリ
    ├── /di               # 依存性を注入。ユースケースをインスタンス化してアプリで使用する
    │     └── UserService.ts
    └── /components       # React Viewコンポーネント
    └── /hooks            # React Hook関数
    └── /lib
```

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
