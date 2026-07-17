const socket = io();

socket.on("connect", () => {
    console.log("Conectado al servidor mediante Socket.IO");
});

socket.on("productsUpdated", (products) => {
    const container = document.getElementById("products-container");

    if (!container) return;

    let html = "";

    products.forEach(product => {

        html += `
            <div>
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>$ ${product.price}</p>
            </div>

            <hr>
        `;
    });

    container.innerHTML = html;
});