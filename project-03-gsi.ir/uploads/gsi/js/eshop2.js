let Products = [
    //{ itemid: 1, tableid: 2, number: 100, price: 300, remain: 200, pic : "" }
];

//add or update products in LS
function addtoLS(itemid, tableid, number, productid = 0) {
    if (localStorage.getItem("products")) {
        //Getting products from LS
        let existingProducts = JSON.parse(localStorage.getItem("products"));

        //Check That our product is in LS or not
        const productIndex = existingProducts.findIndex(product => product.itemid === itemid && product.tableid === tableid);
        if (productIndex >= 0) { //update product 
            if (number > 0) {
                existingProducts[productIndex] = { itemid: itemid, tableid: tableid, number: number, productid: productid };
                localStorage.setItem("products", JSON.stringify(existingProducts));
                syncProducts();
            }
            else {
                removeFromLS(itemid, tableid);
            }

        }
        else {
            existingProducts.push({ itemid: itemid, tableid: tableid, number: number, productid: productid });
            localStorage.setItem("products", JSON.stringify(existingProducts));
            syncProducts();
        }


    }
    else {
        const product = [{ itemid: itemid, tableid: tableid, number: number, productid: productid }]
        localStorage.setItem("products", JSON.stringify(product));
        syncProducts();

    }

}

//remove item from products
function removeFromLS(itemid, tableid) {
    if (localStorage.getItem("products")) {
        //Getting products from LS
        let existingProducts = JSON.parse(localStorage.getItem("products"));

        //Check That our product is in LS or not and filter it
        existingProducts = existingProducts.filter(product => product.itemid !== itemid && product.tableid !== tableid);
        localStorage.setItem("products", JSON.stringify(existingProducts));

        Products = Products.filter(product => product.itemid !== itemid && product.tableid !== tableid);
        syncProducts();

    }
}

//Sync products variable with LS
function syncProducts() {
    let productsLS = localStorage.getItem("products");
    if (productsLS) {
        productsLS = JSON.parse(productsLS)
        const productsMap = new Map();
        productsLS.forEach(product => {
            productsMap.set(`${product.itemid}-${product.tableid}`, product);
        });
        Products = Products.map(product => {
            const key = `${product.itemid}-${product.tableid}`;
            if (productsMap.has(key)) {
                //Change Number Of Products
                const productLS = productsMap.get(key);
                if (product.number !== productLS.number) {
                    product.number = productLS.number;
                }
                productsMap.delete(key);
                return product;
            } else {
                //If it is removed from Ls, Then we remove from here
                return null;
            }
        }).filter(product => product !== null);

        //Adding new products from Ls
        productsMap.forEach((product) => {
            Products.push(product);
        });
    }
    else {
        Products = [];
    }


    //Getting remaing Item & Price for each product
    if (Products.length > 0) {
        //Group products by tableid
        const groupedByTableId = Products.reduce((acc, product) => {
            if (!acc[product.tableid]) {
                acc[product.tableid] = [];
            }
            acc[product.tableid].push(product.itemid);
            return acc;
        }, {});
        const totalRequests = Object.keys(groupedByTableId).length;
        let completedRequests = 0;
        // Send request for each tableid
        Object.keys(groupedByTableId).forEach(tableid => {
            const itemIds = groupedByTableId[tableid].join(',');
            $.ajax({
                type: "POST",
                url: "/inc/ajax.ashx",
                data: {
                    action: "query",
                    "qid": 172,
                    "itemids": itemIds,
                    "tableid": tableid
                },
                //[{"itemid": 1,"remain": 20,"price": 100.0,"pic": "example.jpg"}]
                success: function (response) {
                    response = JSON.parse(response);

                    const responseItemIds = response.map(item => item.itemid);

                    response.forEach((item, index) => {
                        const productIndex = Products.findIndex(product => product.itemid === item.itemid && product.tableid === item.tableid);
                        if (productIndex !== -1) {
                            Products[productIndex].productid = item.productid;
                            Products[productIndex].title = item.title;
                            (item.remain == -1) ? Products[productIndex].remain = 1 : Products[productIndex].remain = item.remain;
                            Products[productIndex].price = item.price;
                            Products[productIndex].pic = item.pic;
                            Products[productIndex].productid = item.productid;
                        }
                        else {
                        }
                    });

                    Products = Products.filter(product => {
                        if (product.tableid === parseInt(tableid)) {
                            return responseItemIds.includes(product.itemid);
                        }
                        return true;
                    });
                    completedRequests++;
                    if (completedRequests === totalRequests) {
                        alertsRemain = [];
                        Products.forEach(productitem => {
                            if (productitem.remain < productitem.number) {
                                alertsRemain.push(productitem.itemid + '-' + productitem.tableid);
                                productitem.number = productitem.remain;
                            }
                        })
                        ProductRenderer.setBasketContent();
                        ProductRenderer.setAlerts();
                        ProductRenderer.setProductCount();
                        ProductRenderer.setTotalPrice();
                        ProductRenderer.setDicountPrice();
                        ProductRenderer.setFactorList();
                        ProductRenderer.setFactorInfoList();
                        try {
                            if (pageContainer != undefined) {
                                ProductRenderer.loadProductInfoPage(pagePackageId, pageTableId, pageContainer);
                                ProductRenderer.productNumberChangeEvents(pagePackageId, pageTableId, pageContainer, productID);
                            }
                        } catch (error) {
                            console.warn(error)
                        }

                    }
                }
            });
        });


    }
    else {
        ProductRenderer.alertsRemain = [];
        ProductRenderer.setBasketContent();
        ProductRenderer.setProductCount();
        ProductRenderer.setTotalPrice();
        ProductRenderer.setAlerts();
        ProductRenderer.setDicountPrice();
        ProductRenderer.setFactorList();
        ProductRenderer.setFactorInfoList();
        try {
            if (pageContainer != undefined) {
                ProductRenderer.loadProductInfoPage(pagePackageId, pageTableId, pageContainer);
                ProductRenderer.productNumberChangeEvents(pagePackageId, pageTableId, pageContainer, productID);
            }
        } catch (error) {
            console.warn(error)
        }
    }

}

//Class For Rendering Ui
class ProductRenderer {
    static totalPrice = 0;
    static couponDicount = 0;
    static count = 0;

    static templates = {
        BasketDropDown: `
        <div class="shopping-cart__item eshop__item" data-itemid="{itemid}" data-tableid="{tableid}" data-number="{number}" data-remain="{remain}">
            <div class="eshop__pic {srcClass}"><img src="{src}" alt="{title}" width="62" height="90"></div>
            <div class="eshop__content">
                <div class="eshop__title text__16 text__medium">{title}</div>
                <div class="eshop__desc text__14"><span class="eshop-item-price">{numberText}{price}</span> تومان</div>
            </div>
        </div>
    `,
        FactorList: `
        <li data-itemid="{itemid}" data-tableid="{tableid}" data-number="{number}"  data-remain="{remain}">
            <span class="title text__14 text__medium">{title}</span>
            <span class="price text__14 text__medium"><span  class="eshop-item-price">{numberText}{price}</span> تومان</span>
        </li>
    `,
        FactorInfoList: `
            <div class="books__item eshop-item" data-itemid="{itemid}" data-tableid="{tableid}" data-number="{number}" data-remain={remain}>
                <div class="books__pic p-relative {srcClass}" >
                    <img class="fixed-images" src="{src}" alt="{title}">
                </div>
                <div class="books__main-content">
                    <div class="books__title line-clamp__2 text__18 text__semibold">{title}</div>
                    <div class="books__content">
                        <div class="books__row">
                            <div class="books__label text__14 text__semibold">قیمت:</div>
                            <div class="books__data line-clamp__1 text__13">{price} تومان</div>
                        </div>
                    </div>
                    <div class="books__more">
                        <div class="eshop__number" style="display: flex;">
                            <span class="plus" data-max="{remain}">+</span>
                            <input class="eshop-product__number" type="text" value="{number}" placeholder="{number}">
                            <span class="minus">-</span>
                        </div>
                        <a href="#" class="bordered text__14 text__semibold text__white remove-item" onclick="ProductRenderer.removeProductItem({itemid}, {tableid}, this)">حذف از سبد خرید</a>
                    </div>
                </div>
            </div>
    `
    };

    static alertsRemain = [];

    //Load and Update Basket Dropdown List
    static setBasketContent() {
        console.log(Products)
        const container = document.querySelector('.shopping-cart__list');
        if (container) {
            const currentItems = document.querySelectorAll(".shopping-cart__item");
            const currentItemsMap = {};
            currentItems.forEach(item => {
                const itemid = item.getAttribute('data-itemid');
                const tableid = item.getAttribute('data-tableid');
                currentItemsMap[`${itemid}-${tableid}`] = item;
            });

            const productsInBasket = new Set(Products.map(product => `${product.itemid}-${product.tableid}`));

            //Removing Item that is not in Products anymore
            currentItems.forEach(item => {
                const itemid = item.getAttribute('data-itemid');
                const tableid = item.getAttribute('data-tableid');
                const key = `${itemid}-${tableid}`;
                if (!productsInBasket.has(key)) {
                    container.removeChild(item);
                }
            });


            Products.forEach(product => {
                const key = `${product.itemid}-${product.tableid}`;

                //Updating Products that already is in basket
                if (currentItemsMap[key]) {
                    currentItemsMap[key].querySelector('.eshop-item-price').innerHTML = `${product.number >= 1 ? product.number + "×" : ""}${product.price}`;
                    delete currentItemsMap[key];
                }
                else {
                    //Making New Prodcuts and adding to the list
                    const template = ProductRenderer.templates.BasketDropDown;
                    const srcClass = product.pic ? '' : 'd-none';
                    const numberText = product.number >= 1 ? `${product.number}×` : '';
                    console.log(product.title)
                    const itemHTML = template
                        .replace(/{itemid}/g, product.itemid)
                        .replace(/{tableid}/g, product.tableid)
                        .replace(/{number}/g, product.number)
                        .replace(/{remain}/g, product.remain)
                        .replace(/{srcClass}/g, srcClass)
                        .replace(/{src}/g, product.pic || '')
                        .replace(/{title}/g, product.title)
                        .replace(/{numberText}/g, numberText)
                        .replace(/{price}/g, product.price);

                    container.insertAdjacentHTML('beforeend', itemHTML);
                }
            });
        }
    }

    //Load and Update Prodcut Factor in Shopping Cart Page
    static setFactorList() {
        const container = document.querySelector('.basket__factor');
        if (container) {
            const currentItems = container.querySelectorAll("li");
            const currentItemsMap = {};
            currentItems.forEach(item => {
                const itemid = item.getAttribute('data-itemid');
                const tableid = item.getAttribute('data-tableid');
                currentItemsMap[`${itemid}-${tableid}`] = item;
            });

            Products.forEach(product => {
                const key = `${product.itemid}-${product.tableid}`;

                //Updating Products that already is in basket
                if (currentItemsMap[key]) {
                    currentItemsMap[key].querySelector('.eshop-item-price').innerHTML = `${product.number >= 1 ? product.number + "×" : ""}${product.price}`;
                    delete currentItemsMap[key];
                }
                else {
                    //Making New Prodcuts and adding to the list
                    const template = ProductRenderer.templates.FactorList;
                    const numberText = product.number >= 1 ? `${product.number}×` : '';
                    const itemHTML = template
                        .replace(/{itemid}/g, product.itemid)
                        .replace(/{tableid}/g, product.tableid)
                        .replace(/{number}/g, product.number)
                        .replace(/{remain}/g, product.remain)
                        .replace(/{title}/g, product.title)
                        .replace(/{numberText}/g, numberText)
                        .replace(/{price}/g, product.price);

                    container.querySelector("ul").insertAdjacentHTML('beforeend', itemHTML);
                }
            });
        }
    }

    //Load and Update Prodcut Factor in Shopping Cart Page
    static setFactorInfoList() {
        const container = document.querySelector('.basket__list');
        if (container) {
            const currentItems = container.querySelectorAll(".books__item");
            const currentItemsMap = {};
            currentItems.forEach(item => {
                const itemid = item.getAttribute('data-itemid');
                const tableid = item.getAttribute('data-tableid');
                currentItemsMap[`${itemid}-${tableid}`] = item;
            });

            Products.forEach(product => {
                const key = `${product.itemid}-${product.tableid}`;

                //Updating Products that already is in basket
                if (currentItemsMap[key]) {
                    if (product.number == 0)
                        currentItemsMap[key].remove();
                    else {
                        currentItemsMap[key].querySelector('.eshop-product__number').value = product.number;
                    }
                    delete currentItemsMap[key];
                }
                else {
                    //Making New Prodcuts and adding to the list
                    const template = ProductRenderer.templates.FactorInfoList;
                    const srcClass = product.pic ? '' : 'd-none';
                    var remian = 1;
                    if(product.remain != "-1"){
                        remian = product.remain ;
                    }
                    const itemHTML = template
                        .replace(/{itemid}/g, product.itemid)
                        .replace(/{tableid}/g, product.tableid)
                        .replace(/{number}/g, product.number)
                        .replace(/{remain}/g, remian)
                        .replace(/{title}/g, product.title)
                        .replace(/{number}/g, product.number)
                        .replace(/{srcClass}/g, srcClass)
                        .replace(/{src}/g, product.pic || '')
                        .replace(/{price}/g, product.price);

                    container.insertAdjacentHTML('beforeend', itemHTML);
                    // Add event listeners for the newly added item
                    const addedItem = container.querySelector(`[data-itemid="${product.itemid}"][data-tableid="${product.tableid}"]`);
                    if (addedItem) {
                        ProductRenderer.loadProductInfoPage(product.itemid, product.tableid, addedItem);
                        ProductRenderer.productNumberChangeEvents(product.itemid, product.tableid, addedItem, product.productid);
                    }
                }
            });
        }
    }

    //Load and Update Total price
    static setTotalPrice() {
        const productsList = Products;
        if (productsList.length > 0) {
            let total = 0;
            productsList.forEach(product => {
                if (product.number <= product.remain)
                    total += (product.price * product.number)
            })
            ProductRenderer.totalPrice = total;
        }
        else {
            ProductRenderer.totalPrice = 0;
        }
        //Changing Html
        const containers = document.querySelectorAll(".eshop-total-price");
        if (containers.length > 0) {
            containers.forEach(container => container.innerHTML = ProductRenderer.totalPrice - ProductRenderer.couponDicount)

        }
    }

    static setDicountPrice() {
        const containers = document.querySelectorAll(".eshop-discount-price");
        if (containers.length > 0) {
            containers.forEach(container => {
                container.innerHTML = ProductRenderer.couponDicount;
            })
        }
    }

    //Load and Update Product Count
    static setProductCount() {
        const productsList = Products;
        if (productsList.length > 0) {
            ProductRenderer.count = productsList.length;
        }
        else {
            ProductRenderer.count = 0;
        }

        //Changing Html
        const containers = document.querySelectorAll(".eshop-product-number");
        if (containers.length > 0) {
            containers.forEach(container => {
                //Hide Product Notification if there are no products
                if (ProductRenderer.count <= 0) {
                    container.classList.add("hide");
                } else {
                    container.classList.remove("hide");
                }
                container.innerHTML = ProductRenderer.count;
            })
        }
    }

    //Load product info page
    static loadProductInfoPage(itemid, tableid, container) {
        if (container) {
            const eshopBtn = container.querySelector(".eshop__btn");
            const eshopNumber = container.querySelector(".eshop__number");

            var currentProduct = Products.filter(product => product.itemid == itemid && product.tableid == tableid);
            //Fix Ui of the Product
            if (currentProduct.length > 0) {
                //If Product Is in Cart List
                (eshopBtn) ? eshopBtn.style.display = "none" : '';
                (eshopNumber) ? eshopNumber.style.display = "flex" : '';
                const input = container.querySelector(".eshop-product__number");
                if (input) {
                    input.value = currentProduct[0].number;
                }
            }
            else {
                //If Product is not in Cart List
                (eshopBtn) ? eshopBtn.style.display = "flex" : '';
                (eshopNumber) ? eshopNumber.style.display = "none" : '';
                const input = container.querySelector(".eshop-product__number");
                if (input) {
                    input.value = 0;
                }
            }
        }
    }

    //Activate Plus And Minus Buttons
    static productNumberChangeEvents(itemid, tableid, container, productid = 0) {
        if (container) {
            const plusButton = container.querySelector('.plus');
            const minusButton = container.querySelector('.minus');
            const eshopButton = container.querySelector('.eshop__btn');
            // Add event listeners for 'plus' button
            if (container.querySelector('.plus')) {
                var newPlusButton = plusButton.cloneNode(true);
                plusButton.parentNode.replaceChild(newPlusButton, plusButton);
                newPlusButton.addEventListener('click', () => {
                    const input = container.querySelector('.eshop-product__number');
                    if (input) {
                        if (newPlusButton.getAttribute('data-max') >= parseInt(input.value) + 1) {
                            let count = parseInt(input.value) + 1;
                            input.value = count;
                            input.dispatchEvent(new Event('change'));
                            addtoLS(itemid, tableid, count, productid);
                        }
                    }
                });
            }
            // Add event listeners for 'minus' button
            if (container.querySelector('.minus')) {
                const newMinusButton = minusButton.cloneNode(true);
                minusButton.parentNode.replaceChild(newMinusButton, minusButton);

                newMinusButton.addEventListener('click', () => {
                    const input = container.querySelector('.eshop-product__number');
                    if (input) {
                        let count = parseInt(input.value) - 1;
                        if (count == 0) {
                            container.querySelector(".eshop__number").style.display = "none";
                            container.querySelector(".eshop__btn").style.display = "flex";
                        }
                        input.value = count;
                        input.dispatchEvent(new Event('change'));
                        addtoLS(itemid, tableid, count, productid);
                    }
                });
            }
            if (container.querySelector(".eshop__btn")) {
                var neweshopButton = eshopButton.cloneNode(true);
                eshopButton.parentNode.replaceChild(neweshopButton, eshopButton);
                neweshopButton.addEventListener('click', (e) => {
                    e.preventDefault()
                    const input = container.querySelector('.eshop-product__number');
                    if (input) {
                        let count = parseInt(input.value) + 1;
                        input.value = count;
                        container.querySelector('.eshop__btn').style.display = "none";
                        container.querySelector(".eshop__number").style.display = "flex";
                        addtoLS(itemid, tableid, count, productid);
                    }
                });
            }

        }
    }

    //Remove ProductItem UI and also From LS
    static removeProductItem(itemid, tableid, container) {
        if (container) container.closest('.books__item').remove();
        removeFromLS(itemid, tableid);
    }

    static submitCoupon(coupon) {
        $.ajax({
            type: "POST",
            url: "/inc/ajax.ashx",
            data: {
                action: "query",
                "qid": 173,
                "DiscountCoupon": coupon
            },
            success: function (response) {
                // response = {"id": "[query-result:id]","DiscountCoupon": "[query-result:DiscountCoupon]", "DiscountPercent": "[query-result:DiscountPercent]", "MinOrederPrice": "[query-result:MinOrederPrice]", "MaxDiscount": "[query-result:MaxDiscount]", "UsageNumber": "[query-result:UsageNumber]", "Expire": "[query-result:Expire]}"
                response = JSON.parse(response);
                if (response.DiscountCoupon) {
                    const discountPercent = parseFloat(response.DiscountPercent);
                    const minOrderPrice = parseFloat(response.MinOrederPrice);
                    const maxDiscount = parseFloat(response.MaxDiscount);

                    const expire = new Date(response.Expire);
                    const currentDate = new Date();
                    if (currentDate > expire) {
                        alert("کد تخفیف منقضی شده است.");
                        return;
                    }

                    const basketTotalPrice = ProductRenderer.totalPrice;
                    if (basketTotalPrice < minOrderPrice) {
                        alert("مقدار خرید کمتر از حداقل قیمت لازم برای استفاده از کد تخفیف است.");
                        return;
                    }

                    let discountAmount = (basketTotalPrice * discountPercent) / 100;
                    if (discountAmount > maxDiscount) {
                        discountAmount = maxDiscount;
                    }

                    alert(`تخفیف به میزان ${discountAmount} به سبد خرید اعمال شد.`);
                    ProductRenderer.couponDicount = discountAmount;
                    localStorage.setItem("coupon", response)
                } else {
                    alert("کد تخفیف نامعتبر است.");
                }
            }
        });
    }

    static checkCoupon(coupon) {
        if (response.DiscountCoupon) {
            const discountPercent = parseFloat(response.DiscountPercent);
            const minOrderPrice = parseFloat(response.MinOrederPrice);
            const maxDiscount = parseFloat(response.MaxDiscount);

            const expire = new Date(response.Expire);
            const currentDate = new Date();
            if (currentDate > expire) {
                localStorage.setItem("coupon")
                return;
            }

            const basketTotalPrice = ProductRenderer.totalPrice;
            if (basketTotalPrice < minOrderPrice) {
                localStorage.setItem("coupon")
                return;
            }

            // محاسبه مقدار تخفیف
            let discountAmount = (basketTotalPrice * discountPercent) / 100;
            if (discountAmount > maxDiscount) {
                discountAmount = maxDiscount;
            }

            ProductRenderer.couponDicount = discountAmount;
            ProductRenderer.setDicountPrice()
            localStorage.setItem("coupon", response)
        } else {
            localStorage.setItem("coupon")
        }
    }

    static orderSubmit(onSuccess) {
        const productToSend = Products.map(product => ({
            attrsetid: product.itemid,
            number: product.number,
            price: product.price
        }));

        var ip = "";

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                ip = data.ip;
                var dataToSend = {
                    items: productToSend,
                    ip: ip,
                    coupon: null,
                    price: ProductRenderer.totalPrice - ProductRenderer.couponDicount
                }
                $.ajax({
                    type: "POST",
                    url: "/inc/ajax.ashx",
                    data: {
                        action: "query",
                        "qid": "181",
                        title: JSON.stringify(dataToSend)

                    },
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response.result != "-1") {
                            if (document.querySelector("#order_id"))
                                document.querySelector("#order_id").value = response.result;
                            if (typeof onSuccess === 'function') {
                                onSuccess();

                            }
                        }
                        else {
                            alert("خطایی رخ داده است، لطفا صفحه را مجدد لود نمایید.")
                        }
                    },
                    error: function (error) {
                        console.log('Error:', error);
                    }
                });
            })
            .catch(error => {
                console.log('Error fetching IP:', error);
            });
    }

    static setAlerts() {
        var container = document.querySelector(".alert-container");
        if (ProductRenderer.alertsRemain.length > 0 && container) {
            var alerts = ProductRenderer.alertsRemain;
            container.innerHTML = `<div class="alert alert-danger">سبد خرید شما به دلیل عدم موجودی بعضی از محصولات بروز شده است.</div>`
        }
    }

    static clearProducts(token, orderID, mobailNumber) {
        const data = JSON.parse(localStorage.getItem('products'));
        const itemIds = data
            .filter(item => item.tableid === 55)
            .filter(item => item.number > 0)
            .map(item => item.productid);
        var count = 0;
        var total = itemIds.length;
        itemIds.forEach(product => {
            console.log(product)
            $.ajax({
                type: "POST",
                url: "/inc/ajax.ashx",
                data: {
                    action: "query",
                    "qid": 221,
                    token: token,
                    orderID: orderID,
                    ProductId: product,
                    mobailNumber: mobailNumber
                },
                success: function (response) {
                    console.log(response);
                    count++;
                    if (total == count) {
                        //localStorage.setItem("products", "");
                    }
                },
                error: function (response) {
                    console.error(error);
                }
            });
        });
        if (itemIds.length == 0) {
           // localStorage.setItem("products", "");
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    $(".shopping-cart__drop").fadeToggle("fast");
    $(".shopping-cart__btn").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".shopping-cart__drop").fadeToggle("fast");
    });
    $(".shopping-cart__drop").on("click", function (e) {
        e.stopPropagation();
    });
    $(document).on("click", function () {
        $(".shopping-cart__drop").fadeOut("fast");
    });

    syncProducts();

    if (localStorage.getItem("coupon")) {
        var coupon = JSON.parse(localStorage.getItem("coupon"));
        ProductRenderer.checkCoupon(coupon)
    }


    var prices = document.querySelectorAll(".price-check");
    if (prices.length > 0) {
        prices.forEach(price => (price.innerText.trim() == "0 تومان" || price.innerText.trim() == "0تومان") ? price.innerHTML = "رایگان" : '')
    }
})


function isJSON(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (e) {
        return false;
    }
}

