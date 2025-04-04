<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

interface Prize {
  id: string
  value: string
}

const props = defineProps<{
  shouldSpin: boolean
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

const currentRotation = ref(0)
const isSpinning = ref(false)
const spinDuration = ref(4000)
const selectedPrize = ref<Prize | null>(null)
const animationFrameId = ref<number | null>(null)

const wheelStyle = computed(() => ({
  transform: `rotate(${currentRotation.value}deg)`,
}))

const vectorStyle = computed(() => ({
  transform: `translate(-50%, -50%) rotate(${currentRotation.value}deg)`,
}))

const markerStyle = computed(() => ({
  animation: isSpinning.value ? 'pulse 0.5s infinite alternate' : 'none'
}))

const startSpin = () => {
  if (isSpinning.value) return
  
  isSpinning.value = true
  selectedPrize.value = null
  
  const fullRotations = 5 + Math.floor(Math.random() * 3)
  const segmentAngle = 360 / prizes.length
  const targetSegment = Math.floor(Math.random() * prizes.length)
  const targetRotation = -(fullRotations * 360 + targetSegment * segmentAngle)
  
  const startTime = performance.now()
  const startRotation = currentRotation.value % 360
  const rotationDistance = targetRotation - startRotation
  
  const animate = (time: number) => {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / spinDuration.value, 1)
    
    const easingProgress = 1 - Math.pow(1 - progress, 3)
    
    currentRotation.value = startRotation + rotationDistance * easingProgress
    
    if (progress < 1) {
      animationFrameId.value = requestAnimationFrame(animate)
    } else {
      const normalizedRotation = ((currentRotation.value % 360) + 360) % 360
      const prizeIndex = Math.floor(normalizedRotation / segmentAngle)
      selectedPrize.value = prizes[(prizes.length - prizeIndex) % prizes.length]
      emit('spinComplete', selectedPrize.value.value)
      isSpinning.value = false
      animationFrameId.value = null
    }
  }
  
  animationFrameId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  currentRotation.value = 0
})

onBeforeUnmount(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})

watch(() => props.shouldSpin, (newVal) => {
  if (newVal) {
    startSpin()
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
</style>
