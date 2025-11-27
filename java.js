// java.js
// Mantém o carrinho no localStorage. Cada item: { nome, preco, imagem, quantidade }

document.addEventListener("DOMContentLoaded", () => {
  // Carrega ou inicializa
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Atualiza contador mostrado no ícone
  function atualizarContador() {
    const contador = document.getElementById("contador-carrinho");
    if (!contador) return;
    // somamos quantidades (caso tenha quantidade)
    const totalItens = carrinho.reduce(
      (acc, item) => acc + (item.quantidade || 1),
      0
    );
    contador.textContent = totalItens;
  }

  // Formata e transforma preço de "R$ 59,90" -> number 59.90
  function extrairPreco(precoTexto) {
    if (!precoTexto) return 0;
    // remove tudo que não seja dígito, vírgula ou ponto
    precoTexto = precoTexto.replace(/[^\d,\.]/g, "");
    // converte vírgula para ponto e parseFloat
    precoTexto = precoTexto.replace(",", ".");
    const valor = parseFloat(precoTexto);
    return isNaN(valor) ? 0 : valor;
  }

  // Adiciona ao carrinho (com merge por nome)
  function adicionarAoCarrinho(produto) {
    // procura item igual (mesmo nome)
    const existente = carrinho.find((i) => i.nome === produto.nome);
    if (existente) {
      existente.quantidade =
        (existente.quantidade || 1) + (produto.quantidade || 1);
    } else {
      produto.quantidade = produto.quantidade || 1;
      carrinho.push(produto);
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContador();
    // feedback leve
    alert(`${produto.nome} adicionado ao carrinho.`);
  }

  // Detecta botões na página
  document.querySelectorAll(".produto").forEach((produtoEl) => {
    const nome = produtoEl.querySelector("h3")
      ? produtoEl.querySelector("h3").textContent.trim()
      : "Produto";
    const precoTexto = produtoEl.querySelector("p")
      ? produtoEl.querySelector("p").textContent.trim()
      : "0";
    const preco = extrairPreco(precoTexto);
    const imagemEl = produtoEl.querySelector("img");
    const imagem = imagemEl ? imagemEl.getAttribute("src") : "";

    const botao = produtoEl.querySelector(".btn-carrinho");
    if (botao) {
      botao.addEventListener("click", () => {
        adicionarAoCarrinho({ nome, preco, imagem, quantidade: 1 });
      });
    }
  });

  // Atualiza contador logo que a página carrega
  atualizarContador();

  // Torna carrinho acessível a outras funções (opcional)
  window._carrinhoApp = {
    getCarrinho: () => JSON.parse(localStorage.getItem("carrinho")) || [],
    setCarrinho: (c) => {
      localStorage.setItem("carrinho", JSON.stringify(c));
      atualizarContador();
    },
  };
});
