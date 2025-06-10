# Lift Together - リフト相乗り推進サイト

![Lift Together Logo](src/images/logo.svg)

スキー場への移動とリフト券をシェアして、コストを削減し環境にも優しいウィンタースポーツを楽しむためのプラットフォームです。

## 🎿 プロジェクト概要

「Lift Together」は、スキー・スノーボード愛好者同士が移動手段とリフト券をシェアすることで、以下の目標を実現します：

- **コスト削減**: 交通費とリフト券代の分割による個人負担の軽減
- **環境保護**: 車両の相乗りによるCO2排出量の削減
- **コミュニティ形成**: 同じ趣味を持つ仲間との出会いと交流
- **アクセス向上**: 公共交通機関でアクセスしにくい場所への移動手段提供

## 🚀 デモサイト

[https://yousan.github.io/lift-together](https://yousan.github.io/lift-together)

## 🛠️ 技術スタック

- **HTML5**: セマンティックなマークアップ
- **SASS**: BEM方法論を採用したCSS設計
- **JavaScript (ES6+)**: モダンなフロントエンド機能
- **GitHub Pages**: 静的サイトホスティング
- **GitHub Actions**: 自動ビルド・デプロイ

## 📁 プロジェクト構造

```
lift-together/
├── src/                    # ソースファイル
│   ├── scss/              # SASSファイル
│   │   └── main.scss      # メインスタイルシート
│   ├── js/                # JavaScriptファイル
│   │   └── main.js        # メインスクリプト
│   ├── images/            # 画像ファイル
│   └── index.html         # メインHTMLファイル
├── dist/                  # ビルド済みファイル（自動生成）
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions設定
├── package.json           # プロジェクト設定
├── basic.md              # プロジェクト経緯
└── README.md             # このファイル
```

## 🔧 セットアップ・ビルド方法

### 前提条件

- Node.js (v18以上)
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yousan/lift-together.git
cd lift-together

# 依存関係をインストール
npm install
```

### 開発環境での実行

```bash
# 開発サーバーを起動（ホットリロード付き）
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### ビルド

```bash
# 本番用ビルド
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

### 個別コマンド

```bash
# SASSのコンパイル
npm run build:css

# SASSの監視（変更時に自動コンパイル）
npm run watch:css

# HTMLファイルのコピー
npm run build:html

# HTMLファイルの監視
npm run watch:html

# 開発サーバーの起動
npm run serve

# ビルドファイルのクリーンアップ
npm run clean
```

## 🚀 デプロイ

### GitHub Pagesへの自動デプロイ

このプロジェクトは、`main` ブランチにプッシュすると自動的にGitHub Pagesにデプロイされます。

1. GitHubリポジトリの設定で「Pages」を有効化
2. Source を「GitHub Actions」に設定
3. `main` ブランチにコードをプッシュ

### 手動デプロイ

```bash
# GitHub Pagesに手動デプロイ
npm run deploy
```

## 📱 SNS連携機能

### Twitter(X)でのシェア

- 自動生成されたハッシュタグ付きツイート
- サイトURLの自動挿入
- ワンクリックでのシェア機能

### Instagramでのシェア

- クリップボードへのテキスト自動コピー
- 推奨ハッシュタグの提供
- ストーリーズ投稿用テンプレート

## 🎨 デザインシステム

### BEM方法論

```scss
// Block
.header { }

// Element
.header__logo { }
.header__nav { }

// Modifier
.header__nav--active { }
```

### カラーパレット

- **Primary**: `#2563eb` (青)
- **Secondary**: `#0ea5e9` (水色)
- **Accent**: `#f59e0b` (オレンジ)
- **Text**: `#1f2937` (ダークグレー)
- **Background**: `#ffffff` (白)

### レスポンシブブレークポイント

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

## 🔍 SEO対策

- セマンティックHTML構造
- メタタグの最適化
- OGP（Open Graph Protocol）対応
- Twitter Card対応
- 構造化データ（準備中）

## ♿ アクセシビリティ

- ARIA属性の適切な使用
- キーボードナビゲーション対応
- 色のコントラスト比の確保
- スクリーンリーダー対応

## 🧪 テスト

```bash
# テストの実行（準備中）
npm test

# E2Eテストの実行（準備中）
npm run test:e2e
```

## 📈 パフォーマンス最適化

- 画像の遅延読み込み
- CSSとJavaScriptの最小化
- Gzip圧縮
- CDN配信（GitHub Pages）

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 📞 お問い合わせ

- **プロジェクト**: [https://github.com/yousan/lift-together](https://github.com/yousan/lift-together)
- **Issues**: [https://github.com/yousan/lift-together/issues](https://github.com/yousan/lift-together/issues)
- **Website**: [https://yousan.github.io/lift-together](https://yousan.github.io/lift-together)

## 🙏 謝辞

- スキー・スノーボードコミュニティの皆様
- オープンソースプロジェクトの貢献者の皆様
- 環境保護活動に取り組む全ての方々

---

**一緒にリフトに乗ろう！** 🎿⛷️ 