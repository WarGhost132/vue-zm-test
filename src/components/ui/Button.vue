<script setup lang="ts">
import { defineEmits, defineProps, useSlots } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
const slots = useSlots()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

const slotText = () => {
  return slots.default?.()[0]?.children?.toString() || ''
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
    <span class="ui-button__text" :data-text="slotText()">
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
  width: 400px;

  padding: 16px 0;

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
  font-family: "Geologica", sans-serif;
  font-size: clamp(1.25rem, 2vw, 2rem);
  text-transform: uppercase;
  color: $button-text-color;
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
</style>
