import type { Prize } from '@/types/prize'
import { ref, computed } from 'vue'

export function useWheel(prizes: Prize[], spinDuration = 4000) {
  const currentRotation = ref(0)
  const isSpinning = ref(false)
  const selectedPrize = ref<Prize | null>(null)
  const animationFrameId = ref<number | null>(null)

  const wheelStyle = computed(() => ({
    transform: `rotate(${currentRotation.value}deg)`
  }))

  const vectorStyle = computed(() => ({
    transform: `translate(-50%, -50%) rotate(${currentRotation.value}deg)`
  }))

  const markerStyle = computed(() => ({
    animation: isSpinning.value ? 'pulse 0.5s infinite alternate' : 'none'
  }))

  const startSpin = (forceWin300: boolean, emit: (value: string) => void) => {
    if (isSpinning.value) return

    isSpinning.value = true
    selectedPrize.value = null

    const fullRotations = 5 + Math.floor(Math.random() * 3)
    const segmentAngle = 360 / prizes.length

    const targetSegment = forceWin300
      ? prizes.findIndex(p => p.value === '300')
      : Math.floor(Math.random() * prizes.length)

    const targetRotation = -(fullRotations * 360 + targetSegment * segmentAngle)
    const startTime = performance.now()
    const startRotation = currentRotation.value % 360
    const rotationDistance = targetRotation - startRotation

    const animate = (time: number) => {
      const elapsed = time - startTime
      const progress = Math.min(elapsed / spinDuration, 1)
      const easingProgress = 1 - Math.pow(1 - progress, 3)

      currentRotation.value = startRotation + rotationDistance * easingProgress

      if (progress < 1) {
        animationFrameId.value = requestAnimationFrame(animate)
      } else {
        const normalized = ((currentRotation.value % 360) + 360) % 360
        const prizeIndex = Math.floor(normalized / segmentAngle)
        selectedPrize.value = prizes[(prizes.length - prizeIndex) % prizes.length]
        emit(selectedPrize.value.value)
        isSpinning.value = false
        animationFrameId.value = null
      }
    }

    animationFrameId.value = requestAnimationFrame(animate)
  }

  const cleanup = () => {
    if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
  }

  return {
    currentRotation,
    isSpinning,
    selectedPrize,
    wheelStyle,
    vectorStyle,
    markerStyle,
    startSpin,
    cleanup,
  }
}
