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
          class="member-card"
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

/* PC：左にメンバーカード、右に見出し */
.members__inner {
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(0, 1fr);
  grid-template-areas: "list heading";
  align-items: center;
  gap: clamp(32px, 4vw, 64px);
}

.members__heading {
  grid-area: heading;
  margin-bottom: 0;
}

.members__list {
  grid-area: list;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.member-card {
  display: flex;
  flex-direction: column;
  padding: 28px 22px 30px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

/* 真ん中のカードを少し下げて動きを出す */
.member-card:nth-child(2) {
  margin-top: 48px;
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
@media (max-width: 1279px) {
  .members__inner {
    grid-template-columns: 1fr;
    grid-template-areas: "heading" "list";
  }

  .member-card:nth-child(2) {
    margin-top: 0;
  }
}

/* スマホ：横長カードを縦に並べる */
@media (max-width: 767px) {
  .members__list {
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
