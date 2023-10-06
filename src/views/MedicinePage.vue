<template>
  <div class="container">
    
    <h1>Detalhes do Produto</h1>
      <div class="table">
        <tr>
          <th>Nome do Produto:</th>
          <td>{{ produto.nomeComercials }}</td>
        </tr>
        <tr>
          <th>Classe Terapêutica:</th>
          <td>{{ produto.atc }}</td>
        </tr>
        <tr>
          <th>Princípio Ativo:</th>
          <td>{{ produto.principioAtivo }}</td>
        </tr>
        <tr>
          <th>Medicamento de Referência:</th>
          <td>{{ produto.medicamentoReferencia }}</td>
        </tr>
        <tr>
          <th>Categoria Regulatória:</th>
          <td>{{ produto.categoriaRegulatoria }}</td>
        </tr>
        <tr>
          <th>Nome do Fabricante:</th>
          <td>{{ produto.empresa.razaoSocial }}</td>
        </tr>
      </div>
      <div v-if="loading" class="loading mt-3 align-middle">Carregando...</div>
      <nav>
        <div>
      <router-link to="/" class="btn btn-secondary">Voltar para a Busca</router-link>
      <button @click="baixarBula(produto.codigoBulaPaciente)" class="btn btn-secondary">Baixar Bula</button>
    </div>
  </nav>
  </div> 
</template>

<script>
import axios from 'axios'

export default {
  props: {
    numProcesso: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      produto: {
        nomeComercial: '',
        atc: '',
        principioAtivo: '',
        medicamentoReferencia: '',
        categoriaRegulatoria: '',
        empresa: {
          razaoSocial: ''
        },
        codigoBulaPaciente: '',
      },
      loading: false
    }
  },
  async created() {
    try {
      const response = await axios.get(`https://bula.vercel.app/medicamento/${this.numProcesso}`)
      const detalhesProduto = response.data
      this.produto.nomeComercials = detalhesProduto.nomeComercial || ''
      this.produto.atc = detalhesProduto.atc || ''
      this.produto.principioAtivo = detalhesProduto.principioAtivo || ''
      this.produto.medicamentoReferencia = detalhesProduto.medicamentoReferencia || ''
      this.produto.categoriaRegulatoria = detalhesProduto.categoriaRegulatoria || ''
      this.produto.empresa.razaoSocial = detalhesProduto.empresa.razaoSocial || ''
      this.produto.codigoBulaPaciente = detalhesProduto.codigoBulaPaciente || '';
    } catch (error) {
      console.error('Erro ao buscar detalhes do produto:', error)
    } finally {
      this.loading = false;
    }
  },
  methods: {
    baixarBula(codigoBulaPaciente) {
      if (codigoBulaPaciente) {
        const urlBula = `https://bula.vercel.app/pdf?id=${codigoBulaPaciente}`;
        window.open(urlBula, '_blank');
      } else {
        console.error('Código da bula do paciente não encontrado.')
      }
    }
  }
}
</script>

<style lang="scss">

.active-page {
  font-weight: bold; /* Ou qualquer estilo desejado para destacar a página ativa */
  background-color: #007bff; /* Cor de fundo da página ativa */
  color: #fff; /* Cor do texto da página ativa */
}

h1 {
  font-size: 40px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 9rem;
}

.input-group {
  margin-top: 1rem;
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

.table{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #d5d5d5;
  border-radius: 10px;
  background-color: #F1F1F1;
  align-content: center;
  width: 50%;
  margin: auto;
  padding: 1rem;
  align-items: center;
}

th {
  width: 200px;
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


nav {
  margin-top: 20px; /* Ajuste conforme necessário */
  display: flex;
  justify-content: center;
  margin-bottom: 128px; /* Centraliza a paginação horizontalmente */
}
</style>

