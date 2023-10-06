<template>
    <footer>
      <p>Feito por Christiano Barbosa &copy; {{ year }}</p>
    </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>

<style lang="scss">
footer {
    text-align: center;
}

</style>