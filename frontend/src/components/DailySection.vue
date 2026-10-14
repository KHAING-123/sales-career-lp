<script setup>
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.daily
</script>

<template>
  <section id="daily" class="daily section bg-blue has-decor" aria-labelledby="daily-title">
    <svg class="bg-wave bg-wave--top daily__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h1440v50c-200 50-460 60-720 20S220 30 0 80Z" />
    </svg>
    <span class="bg-blob bg-blob--yellow daily__blob" aria-hidden="true"></span>

    <div class="container">
      <SectionHeading id="daily-title" :content="content" />

      <div class="daily__body">
        <ol class="daily__list">
          <li v-for="(item, i) in content.items" :key="item.id" class="daily-item" v-reveal="i * 0.1">
            <p class="daily-item__time">{{ item.time }}</p>
            <div class="daily-item__icon">
              <LpImage :src="images.icons.daily[item.id]" :placeholder="`icons/daily/icon-${item.id}.png`" width="240" height="240" />
            </div>
            <div class="daily-item__content">
              <h3 class="daily-item__title">{{ item.title }}</h3>
              <p class="daily-item__text">{{ item.text }}</p>
            </div>
          </li>
        </ol>

        <div class="daily__visual" v-reveal="0.2">
          <LpImage :src="images.daily.src" :alt="images.daily.alt" placeholder="daily/daily-person.png" width="800" height="1100" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.daily__wave {
  color: var(--color-bg);
}

.daily__blob {
  top: 30%;
  right: -6%;
  width: 560px;
  aspect-ratio: 1;
}

.daily__body {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 80px);
}

.daily__list {
  position: relative;
  display: grid;
  gap: 14px;
}

/* 時間をつなぐ縦線 */
.daily__list::before {
  content: "";
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 125px;
  width: 2px;
  background: repeating-linear-gradient(var(--color-turquoise) 0 6px, transparent 6px 12px);
}

.daily-item {
  position: relative;
  display: grid;
  grid-template-columns: 76px 52px minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  padding: 14px 24px 14px 0;
}

.daily-item__time {
  font-family: var(--font-en);
  font-size: 1.375rem;
  font-weight: 800;
  color: var(--color-turquoise);
  text-align: right;
}

.daily-item__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  padding: 8px;
  background: var(--color-white);
  border: 2px solid var(--color-turquoise-light);
  border-radius: 50%;
}

.daily-item__icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.daily-item__icon :deep(.img-placeholder) {
  min-height: 0;
  padding: 0;
  font-size: 0;
  border-radius: 50%;
}

.daily-item__content {
  padding: 16px 24px;
  background: var(--color-white);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
}

.daily-item__title {
  font-size: 1.0625rem;
  font-weight: 900;
  line-height: 1.5;
}

.daily-item__text {
  margin-top: 4px;
  font-size: var(--fs-small);
  line-height: 1.7;
  color: var(--color-text-sub);
}

.daily__visual {
  width: 100%;
  max-width: 420px;
  justify-self: center;
}

.daily__visual :deep(img) {
  width: 100%;
  height: auto;
}

.daily__visual :deep(.img-placeholder) {
  aspect-ratio: 8 / 11;
}

@media (max-width: 1279px) {
  .daily__body {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  }
}

/* スマホ：人物を上、タイムラインを下に */
@media (max-width: 767px) {
  .daily__body {
    grid-template-columns: 1fr;
  }

  .daily__visual {
    order: -1;
    max-width: 220px;
  }

  .daily__list {
    gap: 10px;
  }

  .daily__list::before {
    left: 85px;
  }

  .daily-item {
    grid-template-columns: 52px 40px minmax(0, 1fr);
    gap: 14px;
    padding: 6px 0;
  }

  .daily-item__time {
    font-size: 1rem;
  }

  .daily-item__icon {
    width: 40px;
    height: 40px;
    padding: 6px;
  }

  .daily-item__content {
    padding: 12px 16px;
  }

  .daily-item__title {
    font-size: 0.9375rem;
  }

  .daily-item__text {
    font-size: 0.8125rem;
  }
}
</style>
