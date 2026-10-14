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
    src: img("logo/preai-logo.png"), // 横長のロゴ。推奨サイズ：幅 360px × 高さ 96px
    alt: "PREAI",
  },

  // ファーストビューの人物イラスト（背景は透明のPNG推奨）
  hero: {
    pc: img("hero/sales-hero-pc.png"), // PC用。推奨サイズ：1200 × 1000px
    sp: img("hero/sales-hero-sp.png"), // スマホ用。推奨サイズ：750 × 700px
    alt: "笑顔でお客様と向き合うセールスメンバーのイラスト",
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
    // 02 WORK
    work: {
      hearing: img("icons/work/icon-hearing.png"),
      proposal: img("icons/work/icon-proposal.png"),
      follow: img("icons/work/icon-follow.png"),
    },
    // 03 VALUE
    value: {
      impact: img("icons/value/icon-impact.png"),
      industry: img("icons/value/icon-industry.png"),
      people: img("icons/value/icon-people.png"),
    },
    // 04 CAREER
    career: {
      year1: img("icons/career/icon-year1.png"),
      year2: img("icons/career/icon-year2.png"),
      year3: img("icons/career/icon-year3.png"),
      year5: img("icons/career/icon-year5.png"),
    },
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
