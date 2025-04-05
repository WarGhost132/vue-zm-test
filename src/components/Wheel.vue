<script lang="ts" setup>
import { useWheel } from '@/composables/useWheel';
import type { Prize } from '@/types/prize';
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  shouldSpin: boolean
  forceWin300: boolean
}>()

const emit = defineEmits(['spinComplete'])

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

const {
  currentRotation,
  wheelStyle,
  vectorStyle,
  markerStyle,
  startSpin,
  cleanup,
} = useWheel(prizes)

onMounted(() => {
  currentRotation.value = 0
})

onBeforeUnmount(() => {
  cleanup()
})

watch(() => props.shouldSpin, (newVal) => {
  if (newVal) {
    startSpin(!!props.forceWin300, (val) => emit('spinComplete', val))
  }
})
</script>

<template>
  <div class="wheel-container">
    <div class="wheel">
      <div class="wheel--marker" :style="markerStyle"></div>
      <div class="wheel--vector" :style="vectorStyle"></div>
      <div class="wheel--center"></div>
      <div class="wheel--items" :style="wheelStyle">
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
  min-height: 500px;
}

.wheel {
  position: relative;
  width: 565px;
  height: 565px;
  background: url("/Border.svg") center / contain no-repeat;
  border-radius: 50%;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);

  &--marker {
    position: absolute;
    width: 220px;
    height: 220px;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -40%);
    background: url("/Arrow.svg") center / contain no-repeat;
    z-index: 1;
    
    @keyframes pulse {
      0% { transform: translate(-50%, -40%) scale(1); }
      100% { transform: translate(-50%, -40%) scale(1.1); }
    }
  }

  &--vector {
    position: absolute;
    width: 720px;
    height: 720px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("/Vector.svg") center / contain no-repeat;
    z-index: -3;
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
    transform-origin: center;
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
    z-index: -2;
  }

  &__item-text {
    display: inline-block;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
}

@media (max-height: 768px) {
  .wheel-container {
    min-height: 600px;
  }

  .wheel {
    width: 450px;
    height: 450px;

    &--marker {
      width: 180px;
      height: 180px;
    }

    &--vector {
      width: 550px;
      height: 550px;
    }

    &--center {
      width: 120px;
      height: 120px;
    }

    &__item {
      padding-top: 45px;
    }

    &__item-text {
      font-size: 20px;
      padding-top: 20px;
    }
  }
}

@media (max-width: 768px) {
  .wheel {
    width: 450px;
    height: 450px;

    &--marker {
      width: 180px;
      height: 180px;
    }

    &--vector {
      width: 550px;
      height: 550px;
    }

    &--center {
      width: 120px;
      height: 120px;
    }

    &__item {
      padding-top: 45px;
    }

    &__item-text {
      font-size: 20px;
      padding-top: 20px;
    }
  }
}

@media (max-width: 576px) {
  .wheel {
    width: 400px;
    height: 400px;

    &--marker {
      width: 150px;
      height: 150px;
    }

    &--vector {
      width: 500px;
      height: 500px;
    }

    &--center {
      width: 100px;
      height: 100px;
    }

    &__item-text {
      font-size: 16px;
      padding-top: 15px;
    }
  }
}

@media (max-width: 480px) {
  .wheel {
    width: 350px;
    height: 350px;

    &--marker {
      width: 120px;
      height: 120px;
    }

    &--vector {
      width: 450px;
      height: 450px;
    }

    &--center {
      width: 90px;
      height: 90px;
    }

    &__item-text {
      font-size: 16px;
      padding-top: 10px;
    }
  }
}
</style>
