<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Wheel from '@/components/Wheel.vue'
import ResultModal from '@/components/ResultModal.vue'
import { ref } from 'vue'

const isLoading = ref(false)
const result = ref<string>('')
const isModalOpen = ref(false)
const shouldSpin = ref(false)

const handleSpinClick = () => {
  isLoading.value = true
  shouldSpin.value = true
}

const handleSpinResult = (prize: string) => {
  isLoading.value = false
  shouldSpin.value = false

  if (prize === 'Повтор') {
    return
  }

  result.value = prize
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
        <Wheel />
      </div>
      <div class="container__item">
        <!-- <Button @click="handleSpinClick" :disabled="isLoading">
          Крути
        </Button> -->
        <Button @click="handleSpinClick" :disabled="isLoading">
          Крути
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
  height: 100svh;
  overflow: hidden;

  &__ellipse {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    border: 1px solid black;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0;
  }

  &__item {
    &--image {
      
    }
  }

  &__logo {
    
  }
}
</style>
