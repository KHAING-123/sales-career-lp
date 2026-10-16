<script setup>
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.members
</script>

<template>
  <section id="people" class="members section bg-light has-decor" aria-labelledby="people-title">
    <span class="bg-blob bg-blob--yellow members__blob" aria-hidden="true"></span>

    <div class="members__inner container">
      <SectionHeading id="people-title" :content="content" class="members__heading" />

      <ul class="members__list">
        <li
          v-for="(member, i) in content.items"
          :key="member.id"
          :class="['member-card', `member-card--0${i + 1}`]"
          v-reveal="i * 0.15"
        >
          <div class="member-card__photo">
            <LpImage
              :src="images.members[member.id]?.src"
              :alt="images.members[member.id]?.alt"
              :placeholder="`members/member-0${i + 1}.png`"
              width="480"
              height="480"
            />
          </div>
          <div class="member-card__body">
            <p class="member-card__meta">
              <span class="member-card__career">{{ member.career }}</span>
              <span class="member-card__age">{{ member.age }}</span>
            </p>
            <h3 class="member-card__catch">{{ member.catchcopy }}</h3>
            <p class="member-card__text">{{ member.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.members__blob {
  top: 10%;
  right: -10%;
  width: 480px;
  aspect-ratio: 1;
}

/* 見出しを上、メンバーカードを下に配置 */
.members__inner {
  display: grid;
  gap: clamp(32px, 4vw, 64px);
}

.members__heading {
  margin-bottom: 0;
}

.members__list {
  /* 段差レイアウト：Member 02 を下げる量・Member 03 を上げる量（画面幅ごとに下で調整） */
  --stagger-down: 50px;
  --stagger-up: 40px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 24px;
}

.member-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 28px 22px 30px;
  background: linear-gradient(145deg, #ffffff 15%, var(--card-accent) 70%, var(--card-accent-end) 100%);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  box-shadow:
    0 12px 35px rgba(20, 55, 90, 0.045),
    0 4px 12px rgba(20, 55, 90, 0.025);
  /* opacity・transform はスクロール時のフェードイン（.reveal）と同じ値。ホバーの浮き上がりは translate で別に指定 */
  transition:
    opacity 0.9s ease var(--reveal-delay, 0s),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0s),
    translate 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* カードごとの色（背景グラデーション・枠線・背景の淡い光） */
.member-card--01 {
  --card-accent: #e7f8fd;
  --card-accent-end: #f2fcff;
  --card-border: #d5f0f6;
  --card-glow: #9fe3f5;
}

.member-card--02 {
  --card-accent: #e5f9f4;
  --card-accent-end: #f3fcf8;
  --card-border: #d5f1e8;
  --card-glow: #9fe8d2;
}

.member-card--03 {
  --card-accent: #fff5d9;
  --card-accent-end: #fffdf1;
  --card-border: #f7eccb;
  --card-glow: #ffe08a;
}

/* 背景の淡い光：右上に大きな円、左下に小さなぼかし（文字・画像の後ろに表示） */
.member-card::before,
.member-card::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--card-glow) 0%, transparent 70%);
  pointer-events: none;
  transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.member-card::before {
  top: -22%;
  right: -28%;
  width: 75%;
  aspect-ratio: 1;
  filter: blur(40px);
  opacity: 0.28;
}

.member-card::after {
  bottom: -10%;
  left: -12%;
  width: 38%;
  aspect-ratio: 1;
  filter: blur(30px);
  opacity: 0.2;
}

/* PCのみ：ホバーで少し浮き上がり、影と背景の光をわずかに強く */
@media (hover: hover) and (min-width: 768px) {
  .member-card:hover {
    translate: 0 -4px;
    box-shadow:
      0 18px 42px rgba(20, 55, 90, 0.075),
      0 6px 16px rgba(20, 55, 90, 0.04);
  }

  .member-card:hover::before {
    opacity: 0.4;
  }

  .member-card:hover::after {
    opacity: 0.3;
  }
}

/* 段差：Member 01 を基準に、02 は下へ・03 は上へ（transform は使わずフェードインと競合させない） */
.member-card:nth-child(2) {
  margin-top: var(--stagger-down);
}

.member-card:nth-child(3) {
  margin-top: calc(var(--stagger-up) * -1);
}

.member-card__photo {
  width: 72%;
  max-width: 180px;
  aspect-ratio: 1;
  margin: 0 auto 20px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-bg-blue);
  box-shadow: 0 0 0 6px var(--color-bg), 0 0 0 8px var(--color-turquoise-light);
}

.member-card__photo :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-card__photo :deep(.img-placeholder) {
  min-height: 0;
  font-size: 0.625rem;
  border-radius: 50%;
}

.member-card__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.member-card__career,
.member-card__age {
  padding: 2px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
}

.member-card__career {
  color: var(--color-white);
  background: var(--color-turquoise);
}

.member-card__age {
  background: var(--color-yellow-light);
}

.member-card__catch {
  margin-top: 16px;
  font-size: var(--fs-h3);
  font-weight: 900;
  line-height: 1.5;
  text-align: center;
  white-space: pre-line;
}

.member-card__text {
  margin-top: 12px;
  font-size: var(--fs-small);
  line-height: 1.9;
  color: var(--color-text-sub);
}

/* 小型PC・タブレット：見出しを上に */
/* PC・タブレット（768px以上）：見出しを上部中央に、カードを少し下げて配置 */
@media (min-width: 768px) {
  .members__heading {
    text-align: center;
  }

  .members__heading :deep(.section-heading__number) {
    justify-content: center;
  }

  .members__heading :deep(.section-heading__desc) {
    max-width: 720px;
    margin-inline: auto;
  }

  .members__list {
    margin-top: 40px;
  }
}

/* 小型PC・タブレット：段差を小さく */
@media (max-width: 1279px) {
  .members__list {
    --stagger-down: 30px;
    --stagger-up: 20px;
  }
}

/* スマホ：横長カードを縦に並べる */
@media (max-width: 767px) {
  .members__list {
    --stagger-down: 0px;
    --stagger-up: 0px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .member-card {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    align-items: start;
    gap: 0 18px;
    padding: 22px 20px;
    border-radius: var(--radius-md);
  }

  .member-card__photo {
    width: 96px;
    margin: 4px 0 0;
  }

  .member-card__meta {
    justify-content: flex-start;
  }

  .member-card__catch {
    margin-top: 10px;
    font-size: 1.0625rem;
    text-align: left;
  }

  .member-card__text {
    margin-top: 8px;
    font-size: 0.8125rem;
  }
}
</style>
