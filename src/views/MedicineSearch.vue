<template>
  <div class="container">
    <div class="header">
      <h1>
    <img src="../assets/logo-medware.png" />
  </h1>
  <h3>Busca de remédios</h3>
    </div>
    
    <div :class="{ 'input-group': true, expanded: isExpanded }">
      <input
        v-model="searchQuery"
        @input="debouncedSearch"
        type="text"
        class="form-control"
        placeholder="Digite o nome do medicamento"
      />
      <button @click="search" class="btn btn-primary">Pesquisar</button>
    </div>
    <div v-if="searchQuery.trim() !== '' && searchResults.length > 0" class="results">
      <div>
        <ul class="search-results">
          <li v-for="result in searchResults" :key="result.idProduto">
            <div class="result-item">
              <div>{{ result.nomeProduto }} - {{ result.razaoSocial }}</div>
              <router-link :to="'/page/' + result.numProcesso">
                Detalhes
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
    <div v-if="loading" class="loading mt-3 align-middle">Carregando...</div>
  </div>
  <nav v-if="searchQuery.length > 0 && totalPages !== null && totalPages > 0">
    <div>
      <div class="pagination">
        <button @click="loadPreviousPage" class="btn btn-secondary" :disabled="currentPage === 1">
          Anterior
        </button>
        <span>{{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="loadNextPage"
          class="btn btn-secondary"
          :disabled="currentPage === totalPages"
        >
          Próxima
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      debounceTimer: null,
      totalElements: 0,
      currentPage: 1,
      totalPages: 0,
      error: null,
      loading: false
    }
  },

  methods: {
    handleInput() {
      if (!this.searchQuery) {
        this.searchResults = []
        this.totalElements = 0
        this.error = null
      } else {
        this.currentPage = 1 // Reset to the first page when searching
        this.debouncedSearch()
      }
    },

    debouncedSearch() {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => this.search(), 300)
    },

    async search() {
      this.loading = true
      this.error = null
      const currentSearchQuery = this.searchQuery

      try {
        const response = await axios.get(
          `https://bula.vercel.app/pesquisar?nome=${currentSearchQuery}&pagina=${this.currentPage}`
        )
        if (Array.isArray(response.data.content)) {
          this.searchResults = response.data.content
          this.totalElements = response.data.totalElements
          this.totalPages = Math.ceil(this.totalElements / 10)
        } else {
          this.error = 'Os dados estão em formato inválido'
        }
      } catch (error) {
        this.error =
          'Ocorreu um erro ao buscar medicamentos. Por favor, tente novamente mais tarde.'
      }
      this.loading = false
    },

    async loadNextPage() {
      if (this.currentPage * 10 < this.totalElements) {
        this.currentPage++
        this.search()
      }
    },

    async loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.search()
      }
    }
  }
}
</script>

<style lang="scss">

.header {
  align-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 1rem;
}

.results {
  margin-top: 1rem;
  border-radius: 8px;

}
.container {
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.active-page {
  font-weight: bold;
  background-color: #007bff;
  color: #fff;
}

.search-results {
  list-style: none;
  padding: 0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  text-align: center;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
}

h3 {
  text-align: center;
  font-size:larger;
}
.input-group {
  margin-top: 2rem;
  width: 100%;
  max-width: 78%;
  max-height: 60px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  overflow: hidden;
  transition:
    max-width 0.3s ease,
    padding 0.3s ease;
}

.input-group:hover {
  margin-top: 1rem;
  width: 100%;
  max-width: 80%;
  max-height: 60px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  overflow: hidden;
  transition:
    max-width 0.3s ease,
    padding 0.3s ease;
}

.form-control {
  border: none;
  border-radius: 0;
  padding: 1rem;
  width: 80%;
  font-size: 1rem;
  color: #333;
}

.btn-primary {
  border: 1px solid;
  background-color: #ffffff;
  color: #357ae8;
  border-radius: 8px;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  border: 1px solid;
  background-color: #357ae8;
  border: #357ae8;
}

.btn-secondary {
  border: 1px solid;
  background-color: #ffffff;
  color: #357ae8;
  border-radius: 8px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 1rem;
}

.btn-secondary:hover {
  border: 1px solid;
  background-color: #357ae8;
  border: #357ae8;
}

.btn-tird {
  align-items: end;
  border: 1px solid;
  background-color: #ffffff;
  color: #357ae8;
  border-radius: 8px;
  font-size: 1rem;
  padding: 0.2rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 1rem;
}

.btn-tird:hover {
  border: 1px solid;
  background-color: #357ae8;
  border: #357ae8;
  color: #fff;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
}

ul {
  border: none;
  background-color: transparent;
  color: #565656;
  cursor: pointer;
  list-style: none;
}

li {
  text-transform: capitalize;
  align-items: center;
  border: 1px solid;
  border: #ffffff;
  padding: 8px;
  padding-left: 16px;
  width: 76%;
  margin-left: 12%;
  margin-right: 12%;
}

ul li {
  font-size: 1rem;
}

nav {
  margin-top: 10px; /* Ajuste conforme necessário */
  display: flex;
  justify-content: center;
  margin-bottom: 128px; /* Centraliza a paginação horizontalmente */
}

.pagination {
  display: flex;
  align-items: center; /* Centraliza os elementos verticalmente na paginação */
}

.page-link {
  border: none;
  background-color: transparent;
  color: #4285f4;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem; /* Espaçamento interno ajustável */
  margin: 0 0.25rem; /* Espaçamento entre os links de página */
}

.page-link:hover {
  text-decoration: underline;
}

/* Estilos para o botão "Anterior" e "Próxima" */
.page-link.prev,
.page-link.next {
  font-weight: bold; /* Estilo para destacar os botões Anterior e Próxima */
}

.page-link.prev:hover,
.page-link.next:hover {
  text-decoration: none; /* Remover sublinhado ao passar o mouse */
}

.page-link.disabled {
  cursor: not-allowed; /* Cursor de não permitido para links desativados */
  color: #ccc; /* Cor de texto para links desativados */
}
</style>
