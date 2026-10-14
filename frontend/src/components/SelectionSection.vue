<script setup>
import SectionHeading from './common/SectionHeading.vue'
import LpImage from './common/LpImage.vue'
import { lpContent } from '../data/lpContent.js'
import { images } from '../data/imageConfig.js'

const content = lpContent.selection
</script>

<template>
  <section id="selection" class="selection section bg-light has-decor" aria-labelledby="selection-title">
    <svg class="bg-wave bg-wave--top selection__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h1440v70c-240-40-500-50-760 0S220 60 0 30Z" />
    </svg>
    <span class="bg-blob bg-blob--blue selection__blob" aria-hidden="true"></span>

    <div class="container">
      <SectionHeading id="selection-title" :content="content" center />

      <ol class="selection__flow">
        <li v-for="(item, i) in content.items" :key="item.id" class="selection-step" v-reveal="i * 0.12">
          <div class="selection-step__card">
            <p class="selection-step__num">STEP {{ item.step }}</p>
            <div class="selection-step__icon float" :style="{ '--float-delay': `${i * 0.5}s` }">
              <LpImage :src="images.icons.selection[item.id]" :placeholder="`icons/selection/icon-${item.id}.png`" width="240" height="240" />
            </div>
            <h3 class="selection-step__title">{{ item.title }}</h3>
          </div>
          <span v-if="i < content.items.length - 1" class="selection-step__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </li>
      </ol>

      <ul class="selection__notes" v-reveal="0.3">
        <li v-for="note in content.notes" :key="note" class="selection__note">{{ note }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.selection__wave {
  color: #e8f8fc;
}

.selection__blob {
  top: 20%;
  left: 50%;
  width: 900px;
  aspect-ratio: 2;
  transform: translateX(-50%);
}

/* PC：5ステップを横並び */
.selection__flow {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 32px;
}

.selection-step {
  position: relative;
}

.selection-step__card {
  height: 100%;
  padding: 28px 12px 26px;
  text-align: center;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.selection-step:last-child .selection-step__card {
  background: linear-gradient(160deg, var(--color-white) 40%, var(--color-yellow-light) 100%);
  box-shadow: 0 0 0 2px var(--color-yellow), var(--shadow-card);
}

.selection-step__num {
  font-family: var(--font-en);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-turquoise);
}

.selection-step__icon {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  margin: 14px auto;
  padding: 12px;
  background: var(--color-bg);
  border-radius: 50%;
}

.selection-step__icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.selection-step__icon :deep(.img-placeholder) {
  min-height: 0;
  padding: 2px;
  font-size: 0.5rem;
  border-radius: 50%;
}

.selection-step__title {
  font-size: 1.0625rem;
  font-weight: 900;
  line-height: 1.5;
}

/* ステップ間の矢印（ゆっくり動く） */
.selection-step__arrow {
  position: absolute;
  top: 50%;
  right: -28px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-top: -12px;
  color: var(--color-turquoise);
  animation: arrow-flow 1.8s ease-in-out infinite;
}

.selection-step__arrow svg {
  width: 100%;
  height: 100%;
}

.selection__notes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 24px;
  margin-top: 40px;
}

.selection__note {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  font-weight: 700;
  background: var(--color-white);
  border: 2px solid var(--color-yellow);
  border-radius: var(--radius-pill);
}

.selection__note::before {
  content: "";
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background: var(--color-turquoise) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath d='M5 9.5l2.5 2.5L13 6.5' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  border-radius: 50%;
}

/* 小型PC・タブレット：矢印の間隔を詰める */
@media (max-width: 1279px) {
  .selection__flow {
    gap: 24px;
  }

  .selection-step__arrow {
    right: -24px;
  }

  .selection-step__icon {
    width: 64px;
    height: 64px;
  }

  .selection-step__title {
    font-size: 0.9375rem;
  }
}

/* スマホ：縦並び・矢印は下向き */
@media (max-width: 767px) {
  .selection__flow {
    grid-template-columns: 1fr;
    gap: 28px;
    max-width: 400px;
    margin-inline: auto;
  }

  .selection-step__card {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    align-items: center;
    gap: 0 16px;
    padding: 16px 20px;
    text-align: left;
  }

  .selection-step__icon {
    grid-row: 1 / span 2;
    width: 56px;
    height: 56px;
    margin: 0;
    padding: 8px;
  }

  .selection-step__num {
    grid-column: 2;
  }

  .selection-step__title {
    grid-column: 2;
    font-size: 1rem;
  }

  .selection-step__arrow {
    top: auto;
    right: auto;
    bottom: -26px;
    left: 50%;
    margin: 0 0 0 -12px;
    animation-name: arrow-flow-down;
    transform: rotate(90deg);
  }

  .selection__notes {
    flex-direction: column;
    align-items: stretch;
    max-width: 400px;
    margin-inline: auto;
  }

  .selection__note {
    padding: 10px 18px;
    font-size: 0.875rem;
  }
}
</style>
