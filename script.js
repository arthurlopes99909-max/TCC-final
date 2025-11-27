// ADICIONAR AO CARRINHO
function addCarrinho(nome, preco, imagem) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push({ nome, preco, imagem });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert("Produto adicionado ao carrinho!");
}

// CARREGAR RESUMO NA PÁGINA DE FINALIZAÇÃO
if (window.location.pathname.includes("finalizar.html")) {
  const lista = document.getElementById("lista-finalizacao");
  const totalFinal = document.getElementById("total-final");

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let total = 0;

  carrinho.forEach((item) => {
    total += item.preco;

    lista.innerHTML += `
            <div class="produto">
                <img src="${item.imagem}">
                <div class="produto-info">
                    <strong>${item.nome}</strong>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                </div>
            </div>
        `;
  });

  // AGORA O TOTAL APARECE SEM ERROS
  totalFinal.textContent = "Total: R$ " + total.toFixed(2);
}

// FINALIZAR COMPRA
function confirmarCompra(event) {
  event.preventDefault();

  alert("Compra confirmada! Obrigado por comprar na J.A.A Company.");

  // limpar carrinho
  localStorage.removeItem("carrinho");

  // voltar ao início
  window.location.href = "index.html";
}
