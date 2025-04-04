<script lang="ts" setup>
interface Prize {
  id: string
  value: string
}

const prizes: Prize[] = [
  { id: '1', value: '50' },
  { id: '2', value: 'Пусто' },
  { id: '3', value: '100' },
  { id: '4', value: 'Повтор' },
  { id: '5', value: '150' },
  { id: '6', value: 'Пусто' },
  { id: '7', value: '300' },
  { id: '8', value: 'Повтор' },
]
</script>

<template>
  <div class="wheel-container">
    <div class="wheel">
      <div class="wheel--marker"></div>
      <div class="wheel--vector"></div>
      <div class="wheel--center"></div>
      <div class="wheel--items">
        <ul class="wheel__list">
          <li 
            v-for="(prize, index) in prizes" 
            :key="prize.id" 
            class="wheel__item"
            :style="{
              '--item-rotate': `${index * (360 / prizes.length)}deg`
            }"
          >
            <span class="wheel__item-text">{{ prize.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wheel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.wheel {
  position: relative;
  width: 565px;
  height: 565px;
  background: url("/Border.svg") center / contain no-repeat;

  &--marker {
    position: absolute;
    width: 220px;
    height: 220px;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -40%);
    background: url("/Arrow.svg") center / contain no-repeat;
    z-index: 1;
  }

  &--vector {
    position: absolute;
    width: 465px;
    height: 465px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("/Vector.svg") center / contain no-repeat;
    z-index: -1;
    transform-origin: center;
  }

  &--center {
    position: absolute;
    width: 155px;
    height: 155px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("/Center.svg") center / contain no-repeat;
    z-index: -1;
    transform-origin: center;
  }

  &--items {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    overflow: hidden;
  }

  &__list {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 0;
    transform-origin: bottom center;
    transform: translateX(-50%) rotate(var(--item-rotate));
    text-align: center;
    padding-top: 90px;
    box-sizing: border-box;
  }

  &__item-text {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
}
</style>
