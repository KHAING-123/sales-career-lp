// 文字アニメーション（見出し・説明文）の共通処理
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 絵文字や結合文字を途中で分割しないよう、書記素（見た目の1文字）単位で分割する
const segmenter =
  typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('ja', { granularity: 'grapheme' }) : null
export const toChars = (text) => (segmenter ? Array.from(segmenter.segment(text), (s) => s.segment) : Array.from(text))

// 行頭に来ると不自然な文字（句読点・閉じ括弧・小書き文字など）
const NO_LINE_START = /^[、。，．,.・：；:;！？!?）」』】〕〉》"'ーぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ々〜～]$/u
// 英数字は単語の途中で改行しないよう連続をまとめる
const WORD_CHAR = /^[A-Za-z0-9]$/

/**
 * 文字列を「行 → 改行しないまとまり（group）→ 文字」に分割し、各文字に表示の遅延（秒）を付ける
 * 改行はまとまりの間でのみ起こるため、1文字ずつ span で囲んでも自然に折り返す
 */
export const splitText = (text, start, step) => {
  let i = 0
  return text.split('\n').map((line) =>
    toChars(line).reduce((groups, char) => {
      const item = { char, delay: `${(start + i++ * step).toFixed(3)}s` }
      const last = groups[groups.length - 1]
      const prev = last?.[last.length - 1]?.char
      const joinPrev = last && (NO_LINE_START.test(char) || (WORD_CHAR.test(char) && WORD_CHAR.test(prev)))
      if (joinPrev) last.push(item)
      else groups.push([item])
      return groups
    }, []),
  )
}

/**
 * 要素が画面に入ったら1回だけ onEnter を呼ぶ
 * IntersectionObserver が使えない環境では即座に呼び、内容が読めなくならないようにする
 */
export const useInViewOnce = (onEnter, options = { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }) => {
  const target = ref(null)
  let observer = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') {
      onEnter()
      return
    }
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      onEnter()
    }, options)
    observer.observe(target.value)
  })
  onBeforeUnmount(() => observer?.disconnect())

  return target
}
