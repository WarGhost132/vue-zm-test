<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import Button from '@/components/ui/Button.vue'

defineProps({
  result: {
    type: String,
    default: null
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <div class="modal__header">
        <h2 v-if="result !== 'Пусто'">Ты молодец!</h2>
        <h2 v-else>Увы, не в этот раз</h2>
      </div>
      <div class="modal__body">
        <p v-if="result !== 'Пусто'">Вот твои {{ result }}</p>
        <p v-else>Попробуй ещё раз!</p>
      </div>
      <div class="modal__footer">
        <Button @click="close">
          {{ result !== 'Пусто' ? 'Забрать' : 'Понятно' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  &__content {
    position: relative;
    background: $modal-background;
    border: 9px solid black;
    border-radius: 63px;
    max-width: 520px;
    width: 100%;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-top: 80px;
    padding-bottom: 40px;
  }

  &__header {
    display: flex;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    font-size: clamp(1.25rem, 2vw, 2rem);
  }

  &__body {
    text-align: center;
    text-transform: uppercase;
    font-size: clamp(1.25rem, 2vw, 2rem);
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
