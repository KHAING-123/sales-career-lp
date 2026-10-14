// v-reveal：画面に入ったときにフェードイン表示する
// 使い方：<div v-reveal> / 遅延させる場合 <div v-reveal="0.2">（秒）
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
      )
    : null

export const reveal = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--reveal-delay', `${value}s`)
    if (observer) observer.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
