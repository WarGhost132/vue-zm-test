<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Wheel from '@/components/Wheel.vue'
import ResultModal from '@/components/ResultModal.vue'
import { ref } from 'vue'

const forceWin300 = ref(true)

const isLoading = ref(false)
const result = ref<string>('')
const isModalOpen = ref(false)
const shouldSpin = ref(false)

const handleSpinClick = () => {
  if (isLoading.value) return
  
  isLoading.value = true
  shouldSpin.value = true
}

const handleSpinResult = async (prize: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1800))

  isLoading.value = false
  shouldSpin.value = false
  result.value = prize

  if (prize === 'Повтор') {
    return
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="container">
    <div class="container__ellipse container__ellipse--top"/>

    <div class="container__items">
      <div class="container__item container__item--image">
        <img src="/logo.png" alt="logo" class="container__logo">
      </div>
      <div class="container__item">
        <Wheel 
          :should-spin="shouldSpin"
          :force-win300="forceWin300"
          @spin-complete="handleSpinResult" 
        />
      </div>
      <div class="container__item">
        <Button 
          @click="handleSpinClick" 
          :disabled="isLoading"
          :class="{ 'pulse': isLoading }"
        >
          {{ isLoading ? 'Крутится...' : 'Крути' }}
        </Button>
      </div>
    </div>

    <div class="container__ellipse container__ellipse--bottom"/>

    <ResultModal 
      :result="result" 
      :is-open="isModalOpen" 
      @close="closeModal" 
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  margin: 0 auto;
  min-height: 100svh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__logo {
    width: 140px;
  }

  &__ellipse {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    height: 500px;
    width: 1200px;
    overflow: hidden;
    
    &--top {
      top: 0;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      background: $ellipse-top;
      filter: blur(240px);
    }

    &--bottom {
      bottom: 0;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
      background: $ellipse-bottom;
      filter: blur(240px);
    }
  }

  &__items {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0;
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.pulse {
  animation: pulse 1s infinite;
}

@media (max-width: 480px) {
  .container__logo {
    width: 120px;
  }
}
</style>
