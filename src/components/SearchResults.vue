<template>
  <ul>
    <li v-for="result in results" :key="result.idProduto">
      {{ result.nomeProduto }} - {{ result.razaoSocial }} 
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true,
    },
  },
};
</script>