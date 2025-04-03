<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { ref } from 'vue'

const isLoading = ref(false)

const handleClick = async () => {
  try {
    isLoading.value = true

    await new Promise(resolve => setTimeout(resolve, 3000))
  } catch (error) {
    
  } finally {
    isLoading.value = false
  }
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
        <Button @click="handleClick" :disabled="isLoading">
          Крути
        </Button>
      </div>
      <div class="container__item">123</div>
    </div>

    <div class="container__ellipse container__ellipse--bottom"/>
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
