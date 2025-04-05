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
    <div class="modal__content-wrapper">
      <div class="modal__content">
        <div class="modal__header">
          <h2 v-if="result !== 'Пусто'" data-text="Ты молодец!" class="custom-text">Ты молодец!</h2>
          <h2 v-else data-text="Увы, не в этот раз" class="custom-text">Увы, не в этот раз</h2>
        </div>
        <div class="modal__body">
          <h2 v-if="result !== 'Пусто'" :data-text="`Вот твои ${result}`" class="custom-text">Вот твои {{ result }}</h2>
          <h2 v-else data-text="Попробуй ещё раз!" class="custom-text">Попробуй ещё раз!</h2>
        </div>
        <div class="modal__footer">
          <Button @click="close">
            {{ result !== 'Пусто' ? 'Забрать' : 'Понятно' }}
          </Button>
        </div>
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

  &__content-wrapper {
    background: $modal-border;
    border-radius: 72px;
    padding: 9px;
    z-index: 1001;
    max-width: 520px;
    width: 100%;
  }

  &__content {
    background: $modal-background;
    border-radius: 63px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-top: 80px;
    padding-bottom: 40px;
    overflow: hidden;
  }

  &__header,
  &__body {
    display: flex;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    text-shadow: 0 1.2px 2.43px rgba(0, 0, 0, 0.25);
  }

  &__header {
    color: $text-color;
  }

  &__body {
    color: $text-primary-color;
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.custom-text {
  position: relative;
  z-index: 1;

  &::before {
    content: attr(data-text);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: 2px transparent;
    background: $button-text-stroke;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    left: 0;
  }
}

@media (max-width: 575px) {
  .modal{
    &__content-wrapper {
      margin: 0 15px;
    }

    &__header,
    &__body {
      font-size: 18px;
    }
  }
}
</style>
