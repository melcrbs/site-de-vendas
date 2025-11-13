document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const productList = document.querySelector('.product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');
    const checkoutButton = document.getElementById('checkout-button');

    // Estado do carrinho (array de objetos)
    let cart = [];

    // Função para renderizar o carrinho no DOM
    function renderCart() {
        // Limpa o conteúdo atual
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
            checkoutButton.disabled = true;
            cartTotalValue.textContent = 'R$ 0,00';
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.dataset.id = item.id;

            cartItemDiv.innerHTML = `
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <span>Qtd: ${item.quantity} | R$ ${(itemTotal).toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="remove-item" data-id="${item.id}">Remover</button>
            `;

            cartItemsContainer.appendChild(cartItemDiv);
        });

        // Atualiza o total e o botão de checkout
        cartTotalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        checkoutButton.disabled = false;
    }

    // Função para adicionar um item ao carrinho
    function addToCart(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productCard = event.target.closest('.product-card');
            const id = productCard.dataset.id;
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                // Se o item já existe, apenas aumenta a quantidade
                existingItem.quantity += 1;
            } else {
                // Se for um novo item, adiciona ao carrinho
                cart.push({ id, name, price, quantity: 1 });
            }

            // Notificação simples e atualização visual
            alert(`"${name}" adicionado ao carrinho!`);
            renderCart();
        }
    }

    // Função para remover um item do carrinho
    function removeFromCart(event) {
        if (event.target.classList.contains('remove-item')) {
            const idToRemove = event.target.dataset.id;

            // Encontra o item
            const itemIndex = cart.findIndex(item => item.id === idToRemove);

            if (itemIndex > -1) {
                // Remove a quantidade, se for 1, remove o item
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                } else {
                    cart.splice(itemIndex, 1);
                }
            }

            renderCart();
        }
    }

    // Função para simular o checkout
    function handleCheckout() {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Simulação de finalização de compra
            alert(`✅ Compra finalizada com sucesso! \n\nObrigado por comprar na McLaren Gear Store. \nTotal do Pedido: R$ ${total.toFixed(2).replace('.', ',')} \n\n(NOTA: Este é um alerta de simulação. Em um site real, esta etapa seria uma integração segura com um Processador de Pagamentos.)`);
            
            // Limpa o carrinho após a 'compra'
            cart = [];
            renderCart();
        }
    }

    // Adiciona os event listeners
    productList.addEventListener('click', addToCart);
    cartItemsContainer.addEventListener('click', removeFromCart);
    checkoutButton.addEventListener('click', handleCheckout);

    // Inicializa a visualização do carrinho
    renderCart();
});