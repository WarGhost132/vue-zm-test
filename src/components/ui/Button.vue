<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    class="ui-button"
    @click="handleClick"
    :disabled="disabled"
    :aria-disabled="disabled"
    :class="{ 'ui-button--disabled': disabled }"
  >
    <span class="ui-button__text">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  padding: 16px 150px;

  border: none;
  border-radius: 100px;

  box-shadow: $button-shadow;
  background: $button-color;

  transition: all 0.3s ease;

  &:hover:not(.ui-button--disabled) {
    background: $button-color-hover;
    box-shadow: $button-shadow-hover;
  }

  &:active:not(.ui-button--disabled) {
    background: $button-color;
    box-shadow: none;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
    background: $button-color;
    box-shadow: none;
  }
}

.ui-button__text {
  text-transform: uppercase;
}
</style>
