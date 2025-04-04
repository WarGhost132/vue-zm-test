<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import Button from '@/components/ui/Button.vue'

interface Prize {
  text: string
  color: string
  selected?: boolean
}

const prizes = ref<Prize[]>([
  { text: "50", color: "hsl(264 56 34)" },
  { text: "Пусто", color: "hsl(220 42 51)" },
  { text: "100", color: "hsl(264 56 34)" },
  { text: "Повтор", color: "hsl(220 42 51)" },
  { text: "150", color: "hsl(264 56 34)" },
  { text: "Пусто", color: "hsl(220 42 51)" },
  { text: "300", color: "hsl(264 56 34)" },
  { text: "Повтор", color: "hsl(220 42 51)" }
])

const wheel = ref<HTMLElement | null>(null)
const spinner = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const ticker = ref<HTMLElement | null>(null)
const isSpinning = ref(false)

const prizeCount = computed(() => prizes.value.length)
const prizeSlice = computed(() => 360 / prizeCount.value)
const prizeOffset = computed(() => Math.floor(180 / prizeCount.value))

const conicGradient = computed(() => {
  return `conic-gradient(
    from -90deg,
    ${[...prizes.value]
      .reverse()
      .map(({ color }, i) => `${color} 0 ${(100 / prizeCount.value) * (prizeCount.value - i)}%`)
      .join(',')}
  )`
})

const spinertia = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let rotation = ref(0)
let currentSlice = ref(0)
let tickerAnim: number

const runTickerAnimation = () => {
  if (!spinner.value || !ticker.value) return
  
  const spinnerStyles = window.getComputedStyle(spinner.value)
  const transform = spinnerStyles.transform
  
  if (!transform || transform === 'none') {
    tickerAnim = requestAnimationFrame(runTickerAnimation)
    return
  }
  
  const values = transform.split("(")[1].split(")")[0].split(",")
  const a = parseFloat(values[0])
  const b = parseFloat(values[1])
  let rad = Math.atan2(b, a)

  if (rad < 0) rad += 2 * Math.PI

  const angle = Math.round(rad * (180 / Math.PI))
  const slice = Math.floor(angle / prizeSlice.value)

  if (currentSlice.value !== slice) {
    ticker.value.style.animation = "none"
    setTimeout(() => {
      if (ticker.value) ticker.value.style.animation = ""
    }, 10)
    currentSlice.value = slice
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation)
}

const selectPrize = () => {
  const selected = Math.floor(rotation.value / prizeSlice.value)
  prizes.value.forEach((prize, index) => {
    prize.selected = index === selected
  })
}

const spinWheel = () => {
  if (isSpinning.value || !trigger.value || !spinner.value || !ticker.value || !wheel.value) return
  
  isSpinning.value = true
  trigger.value.disabled = true
  
  prizes.value.forEach(prize => {
    prize.selected = false
  })
  
  rotation.value = Math.floor(Math.random() * 360 + spinertia(2000, 5000))
  
  if (spinner.value) {
    spinner.value.style.transition = 'transform 8s cubic-bezier(0.1, -0.01, 0, 1)'
    spinner.value.style.transform = `rotate(${rotation.value}deg)`
  }
  
  ticker.value.style.animation = "none"
  runTickerAnimation()
}

const handleTransitionEnd = () => {
  cancelAnimationFrame(tickerAnim)
  rotation.value %= 360
  selectPrize()
  isSpinning.value = false
  
  if (trigger.value) trigger.value.disabled = false
}

onMounted(() => {
  nextTick(() => {
    if (spinner.value) {
      spinner.value.style.background = conicGradient.value
      spinner.value.addEventListener('transitionend', handleTransitionEnd)
    }
  })
})
</script>

<template>
  <div class="deal-wheel" :class="{ 'is-spinning': isSpinning }" ref="wheel">
    <ul 
      class="spinner" 
      ref="spinner"
      :style="{ background: conicGradient }"
    >
      <li 
        v-for="(prize, index) in prizes" 
        :key="index" 
        class="prize"
        :class="{ selected: prize.selected }"
        :style="`--rotate: ${prizeSlice * index * -1 - prizeOffset}deg`"
      >
        <span class="text">{{ prize.text }}</span>
      </li>
    </ul>
    <div class="ticker" ref="ticker"></div>
    <Button class="btn-spin" @click="spinWheel" ref="trigger" :disabled="isSpinning">
      Крути
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.deal-wheel {
  --size: clamp(250px, 80vmin, 600px);
  --lg-hs: 0 3%;
  --lg-stop: 50%;
  --lg: linear-gradient(
    hsl(var(--lg-hs) 0%) 0 var(--lg-stop),
    hsl(var(--lg-hs) 20%) var(--lg-stop) 100%
  );

  position: relative;
  display: grid;
  grid-gap: calc(var(--size) / 20);
  align-items: center;
  grid-template-areas:
    "spinner"
    "trigger";
  font-size: calc(var(--size) / 21);
}

.deal-wheel > * {
  grid-area: spinner;
}

.deal-wheel .btn-spin {
  grid-area: trigger;
  justify-self: center;
}

.spinner {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-areas: "spinner";
  width: var(--size);
  height: var(--size);
  transform: rotate(calc(var(--rotate, 25) * 1deg));
  border-radius: 50%;
  transition: transform 0s;
}

.spinner * {
  grid-area: spinner;
}

.prize {
  display: flex;
  align-items: center;
  padding: 0 calc(var(--size) / 6) 0 calc(var(--size) / 20);
  width: 50%;
  height: 50%;
  transform-origin: center right;
  transform: rotate(var(--rotate));
  user-select: none;
}

.ticker {
  position: relative;
  left: calc(var(--size) / -15);
  width: calc(var(--size) / 10);
  height: calc(var(--size) / 20);
  background: var(--lg);
  z-index: 1;
  clip-path: polygon(20% 0, 100% 50%, 20% 100%, 0% 50%);
  transform-origin: center left;
}

.is-spinning .spinner {
  transition: transform 8s cubic-bezier(0.1, -0.01, 0, 1);
}

.is-spinning .ticker {
  animation: tick 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes tick {
  40% {
    transform: rotate(-12deg);
  }
}

.prize.selected .text {
  color: white;
  animation: selected 800ms ease;
}

@keyframes selected {
  25% {
    transform: scale(1.25);
    text-shadow: 1vmin 1vmin 0 hsla(0 0% 0% / 0.1);
  }
  40% {
    transform: scale(0.92);
    text-shadow: 0 0 0 hsla(0 0% 0% / 0.2);
  }
  60% {
    transform: scale(1.02);
    text-shadow: 0.5vmin 0.5vmin 0 hsla(0 0% 0% / 0.1);
  }
  75% {
    transform: scale(0.98);
  }
  85% {
    transform: scale(1);
  }
}
</style>
