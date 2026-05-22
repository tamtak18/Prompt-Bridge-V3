# Prompt Bridge V3.1

VS Codeで選択したコードをカスタムプロンプトと共にAIアシスタント（Roo Code等）へ送信する拡張機能です。

---

## 📦 概要

**Prompt Bridge V3.1**は、エディタ上で選択したコードに対して、あらかじめ定義したプロンプトを付加してAIアシスタントへ送信するVS Code拡張機能です。

### 主な特徴

- **右クリックメニューから即座に実行**: コードを選択して右クリック → Prompt Bridge → プロンプトを選択
- **Roo Code自動連携**: Roo Code（Cline）がインストールされていれば自動的にAPI経由で送信
- **クリップボードフォールバック**: Roo Code未検出時は自動的にクリップボードへコピー
- **カスタマイズ可能**: VS Codeの設定画面から3つのプロンプトを自由に編集可能

---

## 🌐 オンライン環境での導入（インターネット接続あり）

### 必要な環境

- **VS Code**: 1.74.0以上
- **Node.js**: v20以上（LTS推奨）
- **インターネット接続**: パッケージングツールのダウンロードに必要

### インストール手順

#### 1. リポジトリのクローンまたはダウンロード

```bash
git clone https://github.com/takasoft/prompt-bridge-v3.git
cd prompt-bridge-v3
```

#### 2. カスタマイズ（任意）

ブラウザで`prompt-bridge-manager-v3.5.html`を開き、プロンプトをカスタマイズします。

1. HTMLファイルをブラウザで開く
2. メニュー見出しとプロンプト内容を編集
3. 「Windows用ビルドコマンド生成」をクリック
4. 生成されたPowerShellコマンドをコピー
5. PowerShellで実行

```powershell
# 生成されたコマンドの例
if (!(Test-Path "C:\dev\prompt-bridge-v3")) { New-Item -ItemType Directory -Path "C:\dev\prompt-bridge-v3" }; cd "C:\dev\prompt-bridge-v3"; Remove-Item -ErrorAction SilentlyContinue *.vsix; @'
...
'@ | Out-File -Encoding utf8 package.json; @'
...
'@ | Out-File -Encoding utf8 extension.js; npx @vscode/vsce package
```

#### 3. VS Codeへインストール

**方法A: コマンドライン**
```bash
code --install-extension prompt-bridge-v3-3.1.0.vsix
```

**方法B: VS Code UI**
1. `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
2. 「Extensions: Install from VSIX...」を入力
3. `prompt-bridge-v3-3.1.0.vsix`を選択

#### 4. 動作確認

1. VS Codeでコードを選択
2. 右クリック → **Prompt Bridge** → **PB1: コード解説**（または他のプロンプト）
3. Roo Codeへ自動送信されることを確認

---

## 🔒 オフライン環境での導入（インターネット接続なし）

### 搬入資材リスト

オフライン環境へ持ち込む必要があるファイル：

#### 必須ファイル
```
prompt-bridge-v3-3.1.0.vsix    ← これだけでOK！
```

#### 推奨ファイル（Roo Code連携用）
```
roo-cline-X.X.X.vsix           ← Roo Code拡張機能
```

### インストール手順

#### 1. 資材をオフライン環境へ転送

USBメモリ等で`.vsix`ファイルを対象マシンへコピーします。

#### 2. VS Codeへインストール

**方法A: コマンドライン**
```bash
code --install-extension prompt-bridge-v3-3.1.0.vsix
```

**方法B: VS Code UI**
1. VS Codeを起動
2. `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）でコマンドパレットを開く
3. 「**Extensions: Install from VSIX...**」と入力
4. `prompt-bridge-v3-3.1.0.vsix`を選択
5. インストール完了後、VS Codeを再読み込み

**方法C: 拡張機能ビューから**
1. 拡張機能ビュー（`Ctrl+Shift+X`）を開く
2. 右上の「**...**」メニュー → 「**Install from VSIX...**」
3. `.vsix`ファイルを選択

#### 3. Roo Code（Cline）のインストール（推奨）

Prompt BridgeはRoo Codeと連携することで最大限の効果を発揮します。

```bash
code --install-extension roo-cline-X.X.X.vsix
```

#### 4. 動作確認

1. VS Codeでコードを選択
2. 右クリック → **Prompt Bridge** → **PB1: コード解説**
3. Roo Codeへ送信されるか、クリップボードにコピーされることを確認

---

## ⚙️ 設定のカスタマイズ

VS Codeの設定画面（`Ctrl+,` または `Cmd+,`）で以下の項目を編集できます：

### 設定項目

| 設定キー | デフォルト値 | 説明 |
|---------|------------|------|
| `promptBridgeV3.PB1: コード解説` | シニアエンジニアとして... | PB1で使用するプロンプト |
| `promptBridgeV3.PB2: テスト観点` | シニアQAエンジニアとして... | PB2で使用するプロンプト |
| `promptBridgeV3.PB3: カスタムプロンプト` | （あなたのプロンプト...） | PB3で使用するプロンプト |

### 設定の編集方法

1. `Ctrl+,`で設定画面を開く
2. 検索バーに「**Prompt Bridge**」と入力
3. 各プロンプトの「設定を編集」をクリック
4. 内容を変更して保存
5. **VS Codeを再読み込み**（`Ctrl+Shift+P` → 「Reload Window」）

---

## 📖 使い方

### 基本的な使用手順

1. **コードを選択**  
   エディタ上でプロンプトを送りたいコード部分を選択します。

2. **右クリックメニューを開く**  
   選択範囲上で右クリック → **Prompt Bridge** を選択

3. **プロンプトを選択**  
   - **PB1: コード解説** - コードの詳細な解説
   - **PB2: テスト観点** - テストケースの洗い出し
   - **PB3: カスタムプロンプト** - 自由にカスタマイズ可能

4. **結果を確認**  
   - Roo Codeがインストール済み → 自動的にAIへ送信
   - Roo Code未検出 → クリップボードにコピー済み

### デフォルトプロンプトの内容

#### PB1: コード解説
```markdown
# 役割
シニアエンジニアとして、ジュニア向けに以下のコードを解説してください。

# 項目
1. **概要**: 何をするコードか（1行）
2. **仕組み**: 処理の流れを箇条書きで（簡潔に）
3. **重要語句**: 覚えるべきキーワード3選（一言解説）
4. **改善点**:
   - 可読性、保守性、セキュリティの観点から1〜2点
   - 実務で注意すべき「落とし穴」

---
## 解説対象のソースコード：
```

#### PB2: テスト観点
```markdown
# 役割
シニアQAエンジニアとして、以下のコードに対するテスト観点を網羅的に作成してください。

# 項目
1. **正常系**: 期待通りの動作を確認するためのケース
2. **異常系・準正常系**: エラーハンドリングや不正な入力に対するケース
3. **境界値・特殊値**: バグが発生しやすい値（0, 空, 最大値, 型違い等）のケース
4. **実務上の懸念点**: 外部接続（API/DB）やパフォーマンスに関する注意点

# 出力形式
ジュニアがそのままテスト仕様書に反映できるよう、箇条書きで簡潔に出力してください。

---
## 対象ソースコード：
```

#### PB3: カスタムプロンプト
デフォルトでは簡単なプレースホルダーが設定されています。ご自身の業務に合わせて自由にカスタマイズしてください。

---

## 🛠️ トラブルシューティング

### Roo Codeに送信されない

**症状**: 右クリックメニューを実行してもRoo Codeへ送信されない  
**対処法**:
1. Roo Code拡張機能がインストールされているか確認
2. クリップボードに内容がコピーされているか確認（手動でRoo Codeへペースト）
3. VS Codeを再読み込み（`Ctrl+Shift+P` → 「Reload Window」）

### 右クリックメニューに「Prompt Bridge」が表示されない

**症状**: 右クリックメニューに「Prompt Bridge」が表示されない  
**対処法**:
1. コードを選択してから右クリックしているか確認（テキスト未選択時は表示されません）
2. 拡張機能が正しくインストールされているか確認（拡張機能ビューで「Prompt Bridge」を検索）
3. VS Codeを再起動

### プロンプトが意図した内容になっていない

**症状**: 送信されるプロンプトが設定と異なる  
**対処法**:
1. 設定を変更した後、**VS Codeを再読み込み**する必要があります
2. `Ctrl+Shift+P` → 「Reload Window」を実行

---

## 📂 ファイル構成

### リポジトリ構成

```
prompt-bridge-v3/
├── README.md                          ← このファイル
├── prompt-bridge-v3-3.1.0.vsix        ← インストール用パッケージ
├── prompt-bridge-manager-v3.5.html    ← カスタマイズ用ビルドツール（オンライン環境用）
├── package.json                       ← 拡張機能のメタデータ
└── extension.js                       ← 拡張機能の実行ロジック
```

### .vsixファイルの中身

```
prompt-bridge-v3-3.1.0.vsix
├── [Content_Types].xml
├── extension.vsixmanifest
└── extension/
    ├── extension.js
    └── package.json
```

**重要**: `.vsix`ファイルは完全に自己完結しており、`extension.js`や`package.json`を別途持ち込む必要はありません。

---

## 🔧 技術仕様

| 項目 | 内容 |
|-----|------|
| **Extension ID** | `prompt-bridge-v3` |
| **Version** | 3.1.0 |
| **Publisher** | takasoft |
| **VS Code要件** | ^1.74.0以上 |
| **Node.js要件** | v20以上（ビルド時のみ必要） |
| **ライセンス** | MIT |

---

## 🤝 貢献

バグ報告や機能要望は、GitHubのIssuesページでお願いします。

---

## 📜 ライセンス

MIT License

---

## 👤 作者

**takasoft** - Vanilla Field Softhouse (VFS)

---

## 📝 更新履歴

### v3.1.0 (2026-05-22)
- 設定画面での表示名をカスタマイズ可能に
- プロンプト内容の動的読み込みに対応
- テンプレートリテラル構文のバグ修正

### v3.0.0 (2026-05-22)
- サブメニュー構造を導入
- デフォルトプロンプトの内容を刷新
- Manager V3によるカスタムビルド機能を追加

---

**Next Steps**:  
- オフライン環境へ導入する場合: `.vsix`ファイルのみを持ち込んでインストール
- オンライン環境でカスタマイズする場合: `prompt-bridge-manager-v3.5.html`でビルド

質問やサポートが必要な場合は、GitHubのIssuesでお気軽にお問い合わせください。
