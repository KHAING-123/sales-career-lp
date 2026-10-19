/**
 * ============================================================
 *  LPで使う画像をここでまとめて管理しています。
 *
 *  【画像を差し替えるには】
 *   src/assets/images/ 内の画像を「同じファイル名」で上書きするだけでOKです。
 *   このファイルを編集する必要はありません。
 *
 *  【ファイル名を変えたいときだけ】
 *   下の img("フォルダ/ファイル名") の部分を新しいファイル名に書き換えてください。
 *
 *  ・alt は画像の説明文です（画像が見えない方や検索エンジン向け）
 *  ・画像ファイルが見つからない場合は、自動で「仮画像」の枠が表示されます
 * ============================================================
 */

// src/assets/images 内の画像を自動で読み込みます（ここは編集不要です）
const files = import.meta.glob("../assets/images/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default",
})
const img = (path) => files[`../assets/images/${path}`] ?? null

export const images = {
  // ロゴ（ヘッダー・フッター）
  logo: {
    src: img("logo/preai-logo.png"), // 横長・背景透明のロゴ。現在：191 × 35px（高解像度版は 2倍以上を推奨）
    size: [191, 35],                 // 画像の縦横サイズ（表示前の場所取り用）
    alt: "PREAI",
  },

  // ファーストビュー（キャッチコピー・人物を含んだ1枚画像。横幅いっぱいに表示されます）
  hero: {
    pc: img("hero/sales-hero-pc.png"), // PC用（768px以上）。現在：1672 × 941px
    sp: img("hero/sales-hero-sp.png"), // スマホ用（767px以下）。現在：1024 × 1536px
    // 画像の縦横サイズ（表示前の場所取り用。画像のサイズを変えた場合はここも合わせると表示がなめらかです）
    pcSize: [1672, 941],
    spSize: [1024, 1536],
    // 画像内のキャッチコピーをそのまま記載（ページの見出しとして使われます）
    alt: "人と企業の未来をつなぎ、社会を動かす。 More Possibilities Together - PREAI セールス職採用",
  },

  // 最後のCTAの背景（都市の風景と人物シルエット）
  finalCta: {
    pc: img("cta/sales-final-cta-pc.png"), // PC用。推奨サイズ：2880 × 1120px
    sp: img("cta/sales-final-cta-sp.png"), // スマホ用。推奨サイズ：750 × 1200px
    alt: "",                                // 背景画像のため空欄のままでOK
  },

  // 01 PEOPLE：メンバーの人物画像（推奨サイズ：480 × 480px・正方形）
  members: {
    member01: { src: img("members/member-01.png"), alt: "人材業界出身の20代メンバー" },
    member02: { src: img("members/member-02.png"), alt: "IT企業出身の30代メンバー" },
    member03: { src: img("members/member-03.png"), alt: "営業未経験で入社した20代メンバー" },
  },

  // 02 WORK：仕事風景のイラスト（推奨サイズ：1040 × 800px）
  work: {
    src: img("work/sales-work.png"),
    alt: "お客様とミーティングをするセールスメンバーのイラスト",
  },

  // 05 DAILY：1日の流れの横に表示する人物（背景透明のPNG推奨・推奨サイズ：800 × 1100px）
  daily: {
    src: img("daily/daily-person.png"),
    alt: "ノートパソコンを持つセールスメンバーのイラスト",
  },

  // アイコン（推奨サイズ：240 × 240px・正方形・背景透明）
  // ※ アイコンは文章の装飾なので alt は空欄にしています
  icons: {
    // 02 WORK のアイコンは画像ではなくSVGで描いています（components/work/WorkStepIcon.vue）
    // 03 VALUE のアイコンは画像ではなくSVGで描いています（components/value/ValueIcon.vue）
    // 04 CAREER のアイコンは画像ではなくSVGで描いています（components/career/CareerIcon.vue）
    // 05 DAILY
    daily: {
      morning: img("icons/daily/icon-morning.png"),
      contact: img("icons/daily/icon-contact.png"),
      lunch: img("icons/daily/icon-lunch.png"),
      meeting: img("icons/daily/icon-meeting.png"),
      share: img("icons/daily/icon-share.png"),
      leave: img("icons/daily/icon-leave.png"),
    },
    // 06 SELECTION
    selection: {
      document: img("icons/selection/icon-document.png"),
      casual: img("icons/selection/icon-casual.png"),
      interview: img("icons/selection/icon-interview.png"),
      condition: img("icons/selection/icon-condition.png"),
      offer: img("icons/selection/icon-offer.png"),
    },
    // フッターのSNS
    sns: {
      x: img("icons/sns/icon-x.svg"),
      facebook: img("icons/sns/icon-facebook.svg"),
      linkedin: img("icons/sns/icon-linkedin.svg"),
    },
  },
}
