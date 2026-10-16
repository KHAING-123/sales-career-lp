/**
 * ============================================================
 *  メニュー・リンク先（URL）をここで管理しています。
 *  ボタンの飛び先を変えたいときは、url の "" の中を書き換えてください。
 * ============================================================
 */

// 「話を詳しく聞いてみる」ボタンのリンク先（ヘッダー・ファーストビュー・最後のCTAで共通）
// ※ 正式な応募フォーム／面談予約ページのURLに置き換えてください
export const ctaLink = {
  url: "https://example.com/entry",
  newTab: true, // true：新しいタブで開く / false：同じタブで開く
}

// ヘッダーのメニュー
//   label：日本語 / labelEn：英語（小さく表示。大文字で表示されます） / href：ページ内の各セクションへのリンク
export const navItems = [
  { label: "働く人", labelEn: "PEOPLE", href: "#people" },
  { label: "仕事内容", labelEn: "WORK", href: "#work" },
  { label: "魅力", labelEn: "VALUE", href: "#value" },
  { label: "キャリア", labelEn: "CAREER", href: "#career" },
  { label: "1日の流れ", labelEn: "DAILY", href: "#daily" },
  { label: "選考フロー", labelEn: "SELECTION", href: "#selection" },
]

// フッターのリンク
// ※ 正式なURLに置き換えてください
export const footerLinks = [
  {
    title: "会社情報",
    links: [
      { label: "会社概要", url: "https://example.com/company" },
      { label: "ニュース", url: "https://example.com/news" },
      { label: "採用情報", url: "https://example.com/recruit" },
    ],
  },
  {
    title: "サポート",
    links: [
      { label: "お問い合わせ", url: "https://example.com/contact" },
      { label: "プライバシーポリシー", url: "https://example.com/privacy" },
      { label: "利用規約", url: "https://example.com/terms" },
    ],
  },
]

// SNSのリンク（id は imageConfig.js のアイコンと対応しています）
export const snsLinks = [
  { id: "x", label: "X（旧Twitter）", url: "https://x.com/" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/" },
]
