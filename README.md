# sales-recruitment-lp

PREAI セールス職向け採用LP（Vue 3 + Vite）です。
プログラマー以外の方でも、**文章・画像・色を決まったファイルだけ触れば変更できる**ようにしています。

---

## まず覚えておくこと（編集するファイルは基本この4つだけ）

| 変えたいもの | 編集するファイル |
| --- | --- |
| 文章（見出し・本文・ボタンの文字など） | `frontend/src/data/lpContent.js` |
| ボタンのリンク先・メニュー・フッターのリンク | `frontend/src/data/navigation.js` |
| 画像 | `frontend/src/assets/images/` 内の画像を上書き |
| 色・文字の大きさ・余白 | `frontend/src/styles/variables.css` |

`components/` フォルダ内の `.vue` ファイルはデザインの仕組みなので、通常は触らなくて大丈夫です。

---

## 1. 文章の変更方法

1. `frontend/src/data/lpContent.js` を開きます。
2. セクションごとに日本語のコメント（`// 01 PEOPLE｜どんな人が働いている？` など）があるので、変えたい場所を探します。
3. `"` と `"` の間の文字だけを書き換えて保存します。

```js
members: {
  title: "どんな人が\n働いている？",
  description: "20代〜30代を中心に、…",
},
```

**注意点**

- `"` や `,`（カンマ）を消さないでください。消すと画面が表示されなくなります。
- 改行したい場所には `\n` を入れます（例：`"どんな人が\n働いている？"`）。
- `id: "member01"` のような **id は変更しないでください**（画像との紐付けに使っています）。
- 「1日の流れ」の時間を増やす場合は、`{ id: ..., time: ..., title: ..., text: ... },` の1行をコピーして追加し、`id` を新しい名前にしてください。アイコンを付ける場合は `imageConfig.js` の `daily:` にも同じ id で1行追加します。

## 2. ボタンのリンク先の変更方法

`frontend/src/data/navigation.js` の `ctaLink` を変更します。
「話を詳しく聞いてみる」ボタン（ヘッダー・ファーストビュー・最後のCTA）すべてに反映されます。

```js
export const ctaLink = {
  url: "https://example.com/entry", // ← 正式なURLに変更
  newTab: true,                     // 新しいタブで開くなら true
}
```

> ⚠️ 現在は仮のURL（example.com）が入っています。公開前に必ず正式なURLへ変更してください。
> フッターのリンク・SNSのURL、`lpContent.js` の会社所在地も仮の値です。

## 3. 画像の差し替え方法

**同じファイル名で上書きするだけ**で反映されます。コードの変更は不要です。

| 場所 | ファイル | 推奨サイズ |
| --- | --- | --- |
| ファーストビュー（PC・キャッチコピー込みの1枚画像） | `images/hero/sales-hero-pc.png` | 1672 × 941px |
| ファーストビュー（スマホ・キャッチコピー込みの1枚画像） | `images/hero/sales-hero-sp.png` | 1024 × 1536px |
| 最後のCTA背景（PC） | `images/cta/sales-final-cta-pc.png` | 2880 × 1120px |
| 最後のCTA背景（スマホ） | `images/cta/sales-final-cta-sp.png` | 750 × 1200px |
| メンバー写真 | `images/members/member-01〜03.png` | 480 × 480px（正方形） |
| 仕事風景 | `images/work/sales-work.png` | 1040 × 800px |
| 1日の流れの人物 | `images/daily/daily-person.png` | 800 × 1100px（背景透明） |
| 各アイコン | `images/icons/〇〇/icon-〇〇.png` | 240 × 240px（正方形・背景透明） |
| SNSアイコン | `images/icons/sns/icon-〇〇.svg` | 白一色のSVG |
| ロゴ | `images/logo/preai-logo.png` | 横長・背景透明（現在 191 × 35px。2倍以上の解像度推奨） |

（`images/` は `frontend/src/assets/images/` のことです）

- 現在入っている画像はすべて **仮画像（SAMPLE と書かれたもの）** です。正式素材に差し替えてください。
- ファーストビューのみ、キャッチコピーを画像に含めています（文章を変える場合は画像を作り直してください）。ボタンはHTMLで画像の下に表示しています。
- それ以外の画像には文字を入れないでください。見出しやボタンの文字はHTMLで表示しています（CTA背景も同様）。
- 推奨サイズと縦横比が近ければ、画像を替えてもレイアウトは崩れません。
- 画像ファイルが無い・壊れている場合は、自動的に「画像未設定：〇〇」という枠が表示されます。
- ファイル名を変えたい場合や、PNG以外（WebP・JPG・SVG）を使いたい場合は、`frontend/src/data/imageConfig.js` の該当行のファイル名を書き換えてください。
- 画像の説明文（alt）も `imageConfig.js` で変更できます。

## 4. ロゴの変更方法

`frontend/src/assets/images/logo/preai-logo.png` を新しいロゴ画像で上書きします。
ヘッダーとフッターの両方に反映されます。余白を詰めた横長・背景透明のPNGがおすすめです（表示幅の2倍以上の解像度だと高精細な画面でもくっきり表示されます）。

表示サイズは `frontend/src/styles/variables.css` の以下で変更できます（高さは自動）。

```css
--header-logo-width: 120px;  /* ヘッダーのロゴ幅 */
--footer-logo-width: 120px;  /* フッターのロゴ幅 */
```

SVGを使う場合は `preai-logo.svg` として置き、`imageConfig.js` の `logo` の行を `img("logo/preai-logo.svg")` に変更します。

## 5. 背景色・色の変更方法

`frontend/src/styles/variables.css` を開き、`#` から始まるカラーコードを変更します。

```css
--color-navy: #102b69;        /* メインカラー */
--color-turquoise: #19c4d4;   /* アクセント */
--color-yellow: #ffd84d;      /* サブアクセント */
--color-bg: #f4fcff;          /* ページ全体の背景 */
--decor-wave-cyan: #c9f0f5;   /* 波型の装飾 */
--color-step-1〜4             /* キャリアの各ステップの色 */
--cta-overlay                 /* 最後のCTAの画像に重ねる色（文字を読みやすくする） */
```

波型・丸い装飾はCSS/SVGで描いているため、ここの色を変えるだけで反映されます。

---

## 6. ローカルでの確認方法

事前に [Node.js](https://nodejs.org/)（v20以上）をインストールしてください。

```bash
cd frontend
npm install      # 初回のみ
npm run dev      # 確認用サーバーを起動
```

表示された `http://localhost:5173/` をブラウザで開きます。
ファイルを保存すると自動で画面が更新されます。終了は `Ctrl + C` です。

公開前のチェックとして、次のコマンドでエラーが出ないことを確認してください。

```bash
npm run build
```

## 7. GitHubへの反映方法

```bash
git add .
git commit -m "LPの文章を更新"
git push
```

GitHubの画面から直接ファイルを編集することもできます（ファイルを開いて鉛筆アイコン → 編集 → 「Commit changes」）。

## 8. Vercelへのデプロイ方法

1. [Vercel](https://vercel.com/) にGitHubアカウントでログインします。
2. 「Add New… → Project」からこのリポジトリを選びます。
3. 設定で **Root Directory を `frontend`** にします。
   - Framework Preset：Vite（自動で選ばれます）
   - Build Command：`npm run build`
   - Output Directory：`dist`
4. 「Deploy」を押します。

一度設定すれば、以降は GitHub に push するたびに自動で公開サイトが更新されます。

---

## フォルダ構成

```text
sales-recruitment-lp/
├── README.md
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── vercel.json
    ├── public/                     favicon など
    └── src/
        ├── main.js
        ├── App.vue                 セクションの並び順
        ├── assets/images/          画像（ここを差し替える）
        ├── data/
        │   ├── lpContent.js        文章
        │   ├── imageConfig.js      画像の参照先・alt
        │   └── navigation.js       メニュー・リンク先
        ├── styles/
        │   ├── variables.css       色・フォント・余白
        │   ├── base.css            共通スタイル（見出し・ボタン）
        │   ├── background.css      波型・曲線・光の装飾
        │   ├── responsive.css      画面幅ごとの共通調整
        │   └── animations.css      アニメーション
        ├── directives/reveal.js    スクロール時のフェードイン
        └── components/
            ├── Header.vue / HeroSection.vue / MembersSection.vue
            ├── WorkSection.vue / ValueSection.vue / CareerSection.vue
            ├── DailySection.vue / SelectionSection.vue
            ├── FinalCTA.vue / Footer.vue
            └── common/             見出し・ボタン・画像の共通部品
```

## 画面幅の区切り

- PC：1280px以上
- 小型PC・タブレット：768〜1279px
- スマホ：767px以下

アニメーションは、OSの「視差効果を減らす／動きを減らす」設定が有効な場合、自動的に停止します。
