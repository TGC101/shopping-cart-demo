


function renderProducts() {

    products.forEach(function (product) {
        const card = createProductCardElement(product);
        $("#productRow").append(card);
    });
}


function createProductCardElement(product) {

    let tagGroup = '';
    product.tags.forEach(function (tag) {
        tagGroup += ` <span class="badge badge-warning">${tag}</span>`;
    });

    const cardElement = `
<div class="col-md-4">
    <div class="card">
        <img src="${product.img}" class="card-img-top">
        <form data-product-id="${product.id}" class="card-body">
            <h5 class="card-title mb-0">${product.title}</h5>
            ${tagGroup}
            <p class="card-text">商品價格: $${product.price}</p>
            <div class="form-group">
                <label>購買數量</label>
                <input id="amountInput${product.id}" required class="form-control" type="number" min="1" max="20">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">加入購物車</button>
            </div>
        </form>
    </div>
</div>
`;
    return cardElement;
}


renderProducts();


function Cart() {
    this.key = 'example-cart';
    this.data = [];
    this.initCart = function () {
        const localDataString = localStorage.getItem(this.key);
        if (localDataString) {
            this.data = JSON.parse(localDataString);
        }
        this.render();
    }
    this.addItem = function (pid, amount) {
        const product = products.find(function (p) {
            return p.id === pid;
        });
        const item = {
            title: product.title,
            price: product.price,
            pid: pid,
            amount: amount,
            createdAt: new Date().getTime()
        };
        this.data.push(item);


        this.render();
    }
    this.deleteItem = function (i) {
        console.log(this.data[i]);
        console.log(i);

        this.data.splice(i, 1);

        this.render();
    }
    this.emptyCart = function () {
        this.data = [];
        this.render();
    }
    this.updateDataToStorage = function () {
        const dataString = JSON.stringify(this.data);
        localStorage.setItem(this.key, dataString);
    }
    this.render = function () {
        this.updateDataToStorage();
        $('#cartNavLink').html(`購物車 
    <span class="badge badge-danger">${this.data.length}</span>`)
        const $tbody = $("#cartTableBody");
        $tbody.empty();
        let cartValue = 0;
        this.data.forEach(function (item, idx) {
            const itemValue = item.price * item.amount;
            cartValue += itemValue;
            const tr = `<tr>
        <td> 
            <button data-item-index="${idx}" class="remove-btn btn btn-danger btn-sm"> &times; </button>
            ${item.title}
        </td>
        <td class="text-right"> ${item.price} </td>
        <td class="text-right"> ${item.amount} </td>
        <td class="text-right"> ${itemValue} </td>
    </tr>`;
            $tbody.append(tr);
        });
        $('#cartTableFoot').html(`<tr>
    <td> 總金額 </td>
    <td colspan="3" class="text-right"> ${cartValue} </td>
</tr>`);
    }


}

const cart = new Cart();
cart.initCart();
$("#contact_form").submit(function (e) {
    e.preventDefault();
});

$("#productRow form").submit(function (e) {
    e.preventDefault();
    const pid = $(this).attr("data-product-id");
    let amount = $(`#amountInput${pid}`).val();
    amount = parseInt(amount);
    cart.addItem(pid, amount);

    const product = products.find(function (p) {
        return p.id === pid;
    });

});

$("#clearCartBtn").click(() => {
    cart.emptyCart();
});

$("#cartTableBody").delegate(".remove-btn", "click", function () {

    let idx = $(this).attr('data-item-index');
    idx = parseInt(idx);
    // console.log(idx);
    cart.deleteItem(idx);
})


