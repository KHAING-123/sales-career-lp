<script setup>
import { ref } from 'vue'
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import WorkStepIcon from './work/WorkStepIcon.vue'
import WorkStepConnector from './work/WorkStepConnector.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'
import { useInViewOnce } from '../composables/useSplitText.js'

const content = lpContent.work

// 背景の装飾：セクションが見え始めたら柔らかく表示（初回のみ）
const bgVisible = ref(false)
const section = useInViewOnce(() => (bgVisible.value = true), { threshold: 0.05 })

// 3ステップ：画面に入ったらカード・アイコン・線・光の順に表示（初回のみ）
const stepsVisible = ref(false)
const steps = useInViewOnce(() => (stepsVisible.value = true), { rootMargin: '0px 0px -10% 0px', threshold: 0.2 })
</script>

<template>
  <section
    id="work"
    ref="section"
    class="work section bg-blue has-decor"
    :class="{ 'is-bg-visible': bgVisible }"
    aria-labelledby="work-title"
  >
    <svg class="bg-wave bg-wave--top work__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h1440v40c-240 60-480 70-740 30S220 20 0 70Z" />
    </svg>

    <!-- 背景装飾（左：ブルーの波／中央：ミント／右：イエロー／下：ブルーの曲線／白いドット） -->
    <div class="work__decor" aria-hidden="true">
      <svg class="work__decor-wave" viewBox="0 0 600 900" preserveAspectRatio="none">
        <path d="M0 120C180 160 260 320 200 480S260 760 120 900H0Z" />
      </svg>
      <span class="work__decor-glow work__decor-glow--mint"></span>
      <span class="work__decor-glow work__decor-glow--yellow"></span>
      <svg class="work__decor-curve" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 140C320 60 640 200 980 120S1300 60 1440 90V200H0Z" />
      </svg>
      <span class="work__decor-dots"></span>
    </div>

    <div class="container">
      <div class="work__top">
        <SectionHeading id="work-title" :content="content" class="work__heading" />
        <div class="work__visual" v-reveal="0.15">
          <LpImage :src="images.work.src" :alt="images.work.alt" placeholder="work/sales-work.png" width="1040" height="800" />
        </div>
      </div>

      <div ref="steps" class="work-steps" :class="{ 'is-inview': stepsVisible }">
        <WorkStepConnector :active="stepsVisible" />

        <ol class="work-steps__list">
          <li
            v-for="(item, i) in content.items"
            :key="item.id"
            class="work-step"
            :style="{
              '--i': i,
              '--work-step-glow': `var(--work-glow-${i + 1})`,
              '--work-card-bg': `var(--work-card-bg-${i + 1})`,
              '--work-icon-bg': `var(--work-icon-bg-${i + 1})`,
            }"
          >
            <div class="work-step__icon" data-work-icon>
              <div class="work-step__float">
                <WorkStepIcon :type="item.icon" :active="stepsVisible" />
              </div>
            </div>
            <div class="work-step__card" data-work-card>
              <p class="work-step__label">{{ item.step }}</p>
              <h3 class="work-step__title">{{ item.title }}</h3>
              <p class="work-step__text">{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work__wave {
  color: var(--color-bg);
}

.work__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(32px, 4vw, 64px);
}

.work__heading {
  margin-bottom: 0;
}

.work__visual {
  width: 100%;
  max-width: 560px;
  justify-self: end;
}

.work__visual :deep(img) {
  width: 100%;
  height: auto;
}

.work__visual :deep(.img-placeholder) {
  aspect-ratio: 13 / 10;
}

/* ---------- 背景装飾 ---------- */
.work__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 1.2s ease;
  pointer-events: none;
}

.is-bg-visible .work__decor {
  opacity: 1;
}

.work__decor-wave {
  position: absolute;
  top: 18%;
  left: 0;
  width: min(36vw, 520px);
  height: 70%;
}

.work__decor-wave path {
  fill: var(--work-bg-cyan);
  opacity: 0.55;
}

.work__decor-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
}

.work__decor-glow--mint {
  bottom: 12%;
  left: 30%;
  width: 46vw;
  max-width: 680px;
  aspect-ratio: 1.6;
  background: radial-gradient(ellipse at center, var(--work-bg-mint) 0%, transparent 70%);
}

.work__decor-glow--yellow {
  bottom: 18%;
  right: -6%;
  width: 34vw;
  max-width: 520px;
  aspect-ratio: 1;
  background: radial-gradient(circle at center, var(--work-bg-cream) 0%, transparent 70%);
}

.work__decor-curve {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: clamp(80px, 12vw, 180px);
}

.work__decor-curve path {
  fill: var(--work-bg-cyan);
  opacity: 0.45;
}

.work__decor-dots {
  position: absolute;
  top: 46%;
  left: clamp(8px, 2vw, 32px);
  width: 56px;
  height: 90px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 1.6px, transparent 2.2px) 0 0 / 12px 12px;
}

/* ---------- 3ステップ ---------- */
.work-steps {
  --work-icon-size: 184px;
  position: relative;
  isolation: isolate; /* カード(1) → 線(2) → アイコン(3) の重なり順をこの中で管理 */
  margin-top: clamp(64px, 7vw, 104px);
}

.work-steps__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(20px, 2.4vw, 32px);
}

.work-step {
  display: flex;
  flex-direction: column;
}

/* 丸いアイコン：カード上端から上に大きく飛び出す */
.work-step__icon {
  position: relative;
  z-index: 3;
  align-self: center;
  margin-bottom: calc(var(--work-icon-size) * -0.5);
  opacity: 0;
  transform: translateY(25px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i) * 150ms + 100ms);
}

.is-inview .work-step__float {
  animation: work-float 4.5s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.5s);
}

/* カード */
.work-step__card {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: calc(var(--work-icon-size) * 0.5 + 28px) clamp(20px, 2.4vw, 36px) clamp(28px, 3vw, 40px);
  text-align: center;
  background: var(--work-card-bg); /* ステップごとの色（variables.css の --work-card-bg-1〜3） */
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 28px;
  backdrop-filter: blur(10px);
  box-shadow:
    0 20px 50px rgba(20, 75, 120, 0.08),
    0 8px 20px rgba(20, 75, 120, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  opacity: 0;
  transform: translateY(25px);
  /* opacity・transform は表示アニメーション、translate・影・枠線はホバー用 */
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 150ms),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 150ms),
    translate 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-inview .work-step__icon,
.is-inview .work-step__card {
  opacity: 1;
  transform: none;
}

.work-step__label {
  font-family: var(--font-en);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--color-turquoise);
}

.work-step__title {
  margin-top: 6px;
  font-size: clamp(1.0625rem, 0.9rem + 0.5vw, 1.375rem);
  font-weight: 900;
  line-height: 1.5;
}

/* タイトル下の短いターコイズライン */
.work-step__title::after {
  content: "";
  display: block;
  width: 44px;
  height: 4px;
  margin: 14px auto 0;
  background: linear-gradient(90deg, var(--color-turquoise), var(--color-turquoise-light));
  border-radius: 4px;
}

.work-step__text {
  max-width: 360px;
  margin: 18px auto 0;
  font-size: var(--fs-small);
  line-height: 1.9;
  color: var(--color-text-sub);
  text-align: left;
}

/* PCのみ：カードのホバー */
@media (hover: hover) and (min-width: 768px) {
  .work-step__card:hover {
    translate: 0 -5px;
    border-color: rgba(25, 196, 212, 0.35);
    box-shadow:
      0 26px 60px rgba(20, 75, 120, 0.12),
      0 10px 24px rgba(20, 75, 120, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
}

@media (max-width: 1279px) {
  .work__top {
    grid-template-columns: 1fr;
  }

  .work__visual {
    justify-self: center;
  }

  .work-steps {
    --work-icon-size: 150px;
  }
}

/* スマホ：縦並び（カード間の余白に縦のドット線と下向き矢印） */
@media (max-width: 767px) {
  .work-steps {
    --work-icon-size: 136px;
  }

  .work-steps__list {
    grid-template-columns: 1fr;
    gap: 76px;
  }

  .work-step__card {
    padding-inline: 22px;
  }

  .work-step__text {
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-inview .work-step__float {
    animation: none;
  }
}
</style>
