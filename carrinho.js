// carrinho.js
document.addEventListener("DOMContentLoaded", () => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalElemento = document.getElementById("total");

  function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    // atualiza contador no header (se existir)
    const contador = document.getElementById("contador-carrinho");
    if (contador) {
      const totalItens = carrinho.reduce(
        (acc, item) => acc + (item.quantidade || 1),
        0
      );
      contador.textContent = totalItens;
    }
  }

  function calcularTotal() {
    return carrinho.reduce(
      (sum, item) => sum + (item.preco || 0) * (item.quantidade || 1),
      0
    );
  }

  function formatBRL(valor) {
    return valor.toFixed(2).replace(".", ",");
  }

  function mostrarCarrinho() {
    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
      listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
      totalElemento.textContent = "Total: R$ 0,00";
      return;
    }

    carrinho.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "item-carrinho";

      const quantidade = item.quantidade || 1;

      div.innerHTML = `
                <img src="${item.imagem || ""}" alt="${item.nome}">
                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <p>R$ ${formatBRL(item.preco)}</p>
                    <div class="item-actions">
                        <button class="btn-quant" data-action="decrease" data-index="${index}">-</button>
                        <span id="qtd-${index}">${quantidade}</span>
                        <button class="btn-quant" data-action="increase" data-index="${index}">+</button>
                    </div>
                </div>
                <div>
                    <button class="btn-remover" data-index="${index}">Remover</button>
                </div>
            `;

      listaCarrinho.appendChild(div);
    });

    totalElemento.textContent = "Total: R$ " + formatBRL(calcularTotal());
    salvar();
  }

  // Delegation para botões de remover e quantidade
  listaCarrinho.addEventListener("click", (e) => {
    const btn = e.target;
    if (btn.matches(".btn-remover")) {
      const idx = parseInt(btn.getAttribute("data-index"));
      if (!isNaN(idx)) {
        carrinho.splice(idx, 1);
        mostrarCarrinho();
      }
      return;
    }

    if (btn.matches(".btn-quant")) {
      const idx = parseInt(btn.getAttribute("data-index"));
      const action = btn.getAttribute("data-action");
      if (!isNaN(idx) && carrinho[idx]) {
        carrinho[idx].quantidade = carrinho[idx].quantidade || 1;
        if (action === "increase") carrinho[idx].quantidade += 1;
        if (action === "decrease") {
          carrinho[idx].quantidade -= 1;
          if (carrinho[idx].quantidade < 1) carrinho[idx].quantidade = 1;
        }
        mostrarCarrinho();
      }
    }
  });

  // inicializar
  mostrarCarrinho();
});
