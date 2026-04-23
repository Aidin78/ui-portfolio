document.addEventListener("DOMContentLoaded", () => {
    const eshopBtn = document.querySelector("#eshop__btn");
    const shopModal = document.querySelector("#shopModal");
    const eshopNumber = document.querySelector(".eshop__number");



    if (eshopBtn && shopModal && eshopNumber) {
        eshopBtn.addEventListener("click", (e) => {
            try {
                e.preventDefault();
                $('#shopModal').modal('show');
                saveOrUpdateProductInLocalStorage(); // ذخیره یا بروزرسانی محصول در `localStorage`

                setTimeout(() => {
                    try {
                        eshopBtn.style.display = "none";
                        eshopNumber.style.display = "flex";
                        $('#shopModal').modal('hide');
                    } catch (innerErr) {
                        console.error("Error inside setTimeout:", innerErr);
                    }
                }, 1500);
            } catch (err) {
                console.error("Error during #eshop__btn click event:", err);
            }
        });
    } else {
        console.error("Required elements #eshop__btn, #shopModal, or .eshop__number are missing.");
    }

    document.querySelectorAll('.minus').forEach(function (minusButton) {
        if (minusButton) {
            minusButton.addEventListener('click', function () {
                try {
                    const input = this.parentNode.querySelector('input');
                    if (input) {
                        let count = parseInt(input.value) - 1;
                        let remove = false;
                        if (count <= 0) {
                            // حذف محصول از `localStorage` فقط اگر مقدار به صفر رسید
                            removeProductFromLocalStorage();
                            console.log("remove");
                            this.parentNode.style.display = "none";
                            if (eshopBtn) {
                                eshopBtn.style.display = "flex";
                            }
                            remove = true;
                        }

                        count = count < 1 ? 1 : count;
                        input.value = count;
                        input.dispatchEvent(new Event('change'));

                        // بروزرسانی محصول در `localStorage` فقط اگر مقدار تغییر کرده باشد
                        if (count > 0 && !remove) {
                            saveOrUpdateProductInLocalStorage();
                        }
                    } else {
                        console.error("Input element is missing inside minus button's parent.");
                    }
                } catch (err) {
                    console.error("Error during minus button click event:", err);
                }
            });
        } else {
            console.error("Minus button element is missing.");
        }
    });

    document.querySelectorAll('.plus').forEach(function (plusButton) {
        if (plusButton) {
            plusButton.addEventListener('click', function () {
                try {
                    const input = this.parentNode.querySelector('input');
                    if (input) {
                        input.value = parseInt(input.value) + 1;
                        input.dispatchEvent(new Event('change'));

                        // بروزرسانی محصول در `localStorage`
                        saveOrUpdateProductInLocalStorage();
                    } else {
                        console.error("Input element is missing inside plus button's parent.");
                    }
                } catch (err) {
                    console.error("Error during plus button click event:", err);
                }
            });
        } else {
            console.error("Plus button element is missing.");
        }
    });




    loadBasketContent();
    // به‌روزرسانی صفحه از localStorage
    updateProductInfoFromStorage();
    countUniqueProducts();
    loadFactorList();
    loadFactor();
    setInterval(() => {
        loadBasketContent();
        countUniqueProducts();
        loadFactor();
        loadFactorList();
    }, 3000);

});

function saveOrUpdateProductInLocalStorage() {
    const productData = {};

    const productIdElement = document.querySelector(".eshop-product__itemid");
    const itemId = productIdElement ? productIdElement.getAttribute("data-value") : null;

    if (!itemId) {
        console.error("Product ID not found.");
        return;
    }

    document.querySelectorAll("[class^='eshop-product']").forEach((element) => {
        const title = element.getAttribute("data-title");

        if (title) {
            if (element.tagName.toLowerCase() === "input") {
                productData[title] = element.value;
            } else {
                productData[title] = element.getAttribute("data-value");
            }
        } else {
            console.error("Missing data-title attribute in element with class starting with 'eshop-product'.");
        }
    });

    let existingProducts = [];

    try {
        const storedProducts = localStorage.getItem("eshopProducts");
        if (storedProducts) {
            existingProducts = JSON.parse(storedProducts);
        }
    } catch (err) {
        console.error("Error parsing stored products from localStorage:", err);
    }
    console.log(itemId)
    const productIndex = existingProducts.findIndex(product => product.itemid === itemId);

    if (productIndex !== -1) {
        // Update existing product
        existingProducts[productIndex] = { itemid: itemId, ...productData };
    } else {
        // Add new product
        existingProducts.push({ itemid: itemId, ...productData });
    }

    try {
        localStorage.setItem("eshopProducts", JSON.stringify(existingProducts));
    } catch (err) {
        console.error("Error saving products to localStorage:", err);
    }
}

function removeProductFromLocalStorage() {

    const productIdElement = document.querySelector(".eshop-product__itemid");
    const itemId = productIdElement ? productIdElement.getAttribute("data-value") : null;
    if (!itemId) {
        console.error("Product ID not found.");
        return;
    }

    let existingProducts = [];

    try {
        const storedProducts = localStorage.getItem("eshopProducts");
        if (storedProducts) {
            existingProducts = JSON.parse(storedProducts);
        }
    } catch (err) {
        console.error("Error parsing stored products from localStorage:", err);
    }
    existingProducts = existingProducts.filter(product => product.itemid !== itemId);

    try {
        console.log(JSON.stringify(existingProducts))
        localStorage.setItem("eshopProducts", JSON.stringify(existingProducts));
    } catch (err) {
        console.error("Error saving products to localStorage:", err);
    }
}

function removeProductFromLocalStorageId(itemid, tableid) {
    // بازیابی داده‌ها از Local Storage
    let existingProducts = [];

    try {
        const storedProducts = localStorage.getItem('eshopProducts');
        if (storedProducts) {
            existingProducts = JSON.parse(storedProducts);
        }
    } catch (err) {
        console.error("Error parsing stored products from localStorage:", err);
        return;
    }

    // ایجاد کلید برای شناسایی محصول
    const key = `${itemid}-${tableid}`;

    // فیلتر کردن محصولات برای حذف محصول مشخص
    existingProducts = existingProducts.filter(product => `${product.itemid}-${product.tableid}` !== key);

    try {
        // ذخیره دوباره محصولات در localStorage
        localStorage.setItem('eshopProducts', JSON.stringify(existingProducts));
        console.log(`Product with itemid: ${itemid} and tableid: ${tableid} has been removed.`);
    } catch (err) {
        console.error("Error saving products to localStorage:", err);
    }
}

function updateProductInfoFromStorage() {
    var eshopBtn = document.querySelector("#eshop__btn");
    var eshopNumber = document.querySelector(".eshop__number");
    let existingProducts = [];

    try {
        const storedProducts = localStorage.getItem("eshopProducts");
        if (storedProducts) {
            existingProducts = JSON.parse(storedProducts);
        }
    } catch (err) {
        console.error("Error parsing stored products from localStorage:", err);
        return;
    }

    for (let i = 0; i < existingProducts.length; i++) {
        const product = existingProducts[i];
        const itemId = product.itemid;
        const productElement = document.querySelector(`.eshop-product__itemid[data-value='${itemId}']`);
        if (productElement) {
            (eshopBtn) ? eshopBtn.style.display = "none" : '';
            (eshopNumber) ? eshopNumber.style.display = "flex" : '';
            $('#shopModal').modal('hide');
            const input = document.querySelector(".eshop-product__number");
            if (input) {
                input.value = product.number;
            }
            break;
        }
    }
}

function loadBasketContent() {
    // بازیابی داده‌ها از Local Storage
    const retrievedData = localStorage.getItem('eshopProducts');
    if (retrievedData) {
        const cartItems = JSON.parse(retrievedData);
        let total_price = 0;

        // بررسی آیتم‌های فعلی در DOM
        const currentItems = document.querySelectorAll('.shopping-cart__item');
        const currentItemsMap = {};

        // پر کردن یک Map از آیتم‌های فعلی بر اساس itemid و tableid
        currentItems.forEach(item => {
            const itemid = item.getAttribute('data-itemid');
            const tableid = item.getAttribute('data-tableid');
            currentItemsMap[`${itemid}-${tableid}`] = item;
        });

        // پیمایش آیتم‌های ذخیره‌شده و بروزرسانی صفحه
        cartItems.forEach(item => {
            const key = `${item.itemid}-${item.tableid}`;
            if (item.price >= 0) {
                total_price += (parseInt(item.price) * parseInt(item.number));
            }

            // بررسی اینکه آیا آیتم در صفحه وجود دارد یا خیر
            if (currentItemsMap[key]) {
                // آیتم در صفحه وجود دارد، بنابراین تعداد و قیمت را به‌روز کنید
                const existingItem = currentItemsMap[key];
                const priceSpan = existingItem.querySelector('.eshop__desc');
                priceSpan.innerHTML = `${item.number >= 1 ? item.number + "×" : ""}<span>${item.price}</span> تومان`;
            }
            else {
                const itemHTML = `
                <div class="shopping-cart__item eshop__item" data-itemid="${item.itemid}" data-tableid="${item.tableid}" data-number="${item.number}">
                    <div class="eshop__pic ${item.src == undefined ? 'd-none' : ''}">
                        <img src="/${item.src}" alt="${item.title}" width="62" height="90">
                    </div>
                    <div class="eshop__content">
                        <div class="eshop__title text__16 text__medium">
                            ${item.title}
                        </div>
                        <div class="eshop__desc text__14">
                            ${item.number >= 1 ? item.number + "×" : ""}<span>${item.price}</span> تومان
                        </div>
                    </div>
                </div>
            `;
                // اضافه کردن آیتم جدید به لیست
                document.querySelector('.shopping-cart__list').insertAdjacentHTML('beforeend', itemHTML);
            }
            delete currentItemsMap[key];
        });

        // حذف آیتم‌هایی که دیگر در Local Storage نیستند
        for (const key in currentItemsMap) {
            currentItemsMap[key].remove();
        }

        // نمایش قیمت کل
        document.querySelector('.total_price').innerHTML = total_price;

    } else {
        document.querySelector('.shopping-cart__list').innerHTML = "محصولی انتخاب نشده است";
    }
}

function countUniqueProducts() {
    const retrievedData = localStorage.getItem('eshopProducts');
    if (retrievedData) {
        const cartItems = JSON.parse(retrievedData);
        const uniqueProducts = new Set();

        cartItems.forEach(item => {
            uniqueProducts.add(item.itemid);
        });
        if (uniqueProducts.size > 0) {
            document.querySelector(".shopping-cart__notif").classList.remove("hide");
            document.querySelector(".shopping-cart__notif").innerHTML = uniqueProducts.size;
        }
        else {
            document.querySelector(".shopping-cart__notif").classList.add("hide");
        }
    } else {
        document.querySelector(".shopping-cart__notif").classList.add("hide");
    }
}

function loadFactor() {
    // بازیابی داده‌ها از Local Storage
    let total_price = 0;
    const retrievedData = localStorage.getItem('eshopProducts');
    if (retrievedData) {
        const cartItems = JSON.parse(retrievedData);

        // بررسی آیتم‌های فعلی در DOM
        const currentItems = document.querySelectorAll('.basket__factor li');
        const currentItemsMap = {};

        // پر کردن یک Map از آیتم‌های فعلی بر اساس itemid و tableid
        currentItems.forEach(item => {
            const itemid = item.getAttribute('data-itemid');
            const tableid = item.getAttribute('data-tableid');
            currentItemsMap[`${itemid}-${tableid}`] = item;
        });

        // پیمایش آیتم‌های ذخیره‌شده و بروزرسانی صفحه
        cartItems.forEach(item => {
            const key = `${item.itemid}-${item.tableid}`;
            const itemPrice = parseInt(item.price, 10);
            const itemNumber = parseInt(item.number, 10);

            // اضافه کردن قیمت به جمع کل
            if (!isNaN(itemPrice) && itemPrice >= 0 && !isNaN(itemNumber) && itemNumber >= 1) {
                total_price += itemPrice * itemNumber;
            }

            if (currentItemsMap[key]) {
                // آیتم در صفحه وجود دارد، بنابراین تعداد و قیمت را به‌روز کنید
                const existingItem = currentItemsMap[key];
                const priceSpan = existingItem.querySelector('.price');
                priceSpan.innerHTML = `${item.number >= 1 ? item.number + "×" : ""}<span>${item.price}</span> تومان`;
            } else {
                // آیتم جدید را اضافه کنید
                const itemHTML = `
                    <li data-itemid="${item.itemid}" data-tableid="${item.tableid}" data-number="${item.number}">
                        <span class="title text__14 text__medium">${item.title}</span>
                        <span class="price text__14 text__medium">${item.number >= 1 ? item.number + "×" : ""}<span>${item.price}</span> تومان</span>
                    </li>
                `;

                if (document.querySelector('.basket__factor'))
                    document.querySelector('.basket__factor ul').insertAdjacentHTML('beforeend', itemHTML);
            }
            // حذف از نقشه برای شناسایی آیتم‌های حذف‌شده
            delete currentItemsMap[key];
        });

        // حذف آیتم‌هایی که دیگر در Local Storage نیستند
        for (const key in currentItemsMap) {
            currentItemsMap[key].remove();
        }

        // اضافه کردن آیتم جدید برای جمع سبد خرید
        const totalItemHTML = `
            <li>
                <span class="title text__14 text__bold">جمع سبد خرید</span>
                <span class="price text__14 text__bold"><span>${total_price}</span> تومان</span>
            </li>
        `;

        if (document.querySelector('.basket__factor'))
            document.querySelector('.basket__factor ul').insertAdjacentHTML('beforeend', totalItemHTML);

        if (total_price > 0) {
            if (document.querySelector(".basket__more")) document.querySelector(".basket__more").classList.remove("disable");
            if (document.querySelector(".basket__coupon")) document.querySelector(".basket__coupon").classList.remove("disable");
            if (document.querySelector(".shopping-cart__submit")) document.querySelector(".shopping-cart__submit").classList.remove("disable");
            if (document.querySelector(".shopping-cart__list .alert")) {
                document.querySelector(".shopping-cart__list .alert").remove();
            }
            if (document.querySelector(".basket__list .alert")) {
                document.querySelector(".basket__list .alert").remove();
            }
        }
        else {
            if (document.querySelector(".basket__more")) document.querySelector(".basket__more").classList.add("disable");
            if (document.querySelector(".basket__coupon")) document.querySelector(".basket__coupon").classList.add("disable");
            if (document.querySelector(".shopping-cart__submit")) document.querySelector(".shopping-cart__submit").classList.add("disable");
            if (document.querySelector(".shopping-cart__list")) {
                document.querySelector(".shopping-cart__list").innerHTML = `<div class="alert alert-danger">شما هنوز محصولی انتخاب نکرده اید</div>`;
            }
            if (document.querySelector(".basket__list")) {
                document.querySelector(".basket__list").innerHTML = `<div class="alert alert-danger">شما هنوز محصولی انتخاب نکرده اید</div>`;
            }
        }

    } else {
        if (document.querySelector('.basket__factor'))
            document.querySelector('.basket__factor ul').innerHTML = "محصولی انتخاب نشده است";
    }
}

function updateProductInLocalStorage(itemid, tableid, newNumber) {
    // بازیابی داده‌ها از Local Storage
    let existingProducts = [];

    try {
        const storedProducts = localStorage.getItem('eshopProducts');
        if (storedProducts) {
            existingProducts = JSON.parse(storedProducts);
        }
    } catch (err) {
        console.error("Error parsing stored products from localStorage:", err);
        return;
    }

    // کلید برای شناسایی محصول
    const key = `${itemid}-${tableid}`;

    // جستجو برای پیدا کردن محصول و به‌روزرسانی تعداد
    const productIndex = existingProducts.findIndex(product => `${product.itemid}-${product.tableid}` === key);

    if (productIndex !== -1) {
        // محصول پیدا شد، تعداد آن را به‌روزرسانی می‌کنیم
        existingProducts[productIndex].number = newNumber;

        try {
            // ذخیره دوباره محصولات در localStorage
            localStorage.setItem('eshopProducts', JSON.stringify(existingProducts));
            console.log(`Product with itemid: ${itemid} and tableid: ${tableid} updated to number: ${newNumber}.`);
        } catch (err) {
            console.error("Error saving products to localStorage:", err);
        }
    } else {
        console.error(`Product with itemid: ${itemid} and tableid: ${tableid} not found.`);
    }
}

function loadFactorList() {
    // بازیابی داده‌ها از Local Storage
    const retrievedData = localStorage.getItem('eshopProducts');
    if (retrievedData) {
        const cartItems = JSON.parse(retrievedData);

        // بررسی آیتم‌های فعلی در DOM
        const currentItems = document.querySelectorAll('.basket__list .books__item');
        const currentItemsMap = {};

        // پر کردن یک Map از آیتم‌های فعلی بر اساس itemid و tableid
        currentItems.forEach(item => {
            const itemid = item.getAttribute('data-itemid');
            const tableid = item.getAttribute('data-tableid');
            currentItemsMap[`${itemid}-${tableid}`] = item;
        });

        // پیمایش آیتم‌های ذخیره‌شده و بروزرسانی صفحه
        cartItems.forEach(item => {
            const key = `${item.itemid}-${item.tableid}`;
            const itemElement = currentItemsMap[key];

            if (!itemElement) {
                // آیتم جدید را به لیست اضافه کنید
                const itemHTML = `
                    <div class="books__item" data-itemid="${item.itemid}" data-tableid="${item.tableid}" data-number="${item.number}">
                        <div class="books__pic p-relative ${item.src == undefined ? 'd-none' : ''}" >
                            <img class="fixed-images" src="/${item.src}" alt="${item.title}">
                        </div>
                        <div class="books__main-content">
                            <div class="books__title line-clamp__2 text__18 text__semibold">${item.title}</div>
                            <div class="books__content">
                                <div class="books__row">
                                    <div class="books__label text__14 text__semibold">قیمت:</div>
                                    <div class="books__data line-clamp__1 text__13">${item.price} ریال</div>
                                </div>
                            </div>
                            <div class="books__more">
                                <div class="eshop__number" style="display: flex;">
                                    <span class="plus">+</span>
                                    <input class="eshop-product__number" data-title="number" type="text" value="${item.number}">
                                    <span class="minus">-</span>
                                </div>
                                <a href="#" class="bordered text__14 text__semibold text__white remove-item" onclick="removeProductFromLocalStorageId(${item.itemid}, ${item.tableid})">حذف از سبد خرید</a>
                            </div>
                        </div>
                    </div>
                `;
                // اضافه کردن آیتم جدید به لیست
                (document.querySelector('.basket__list')) ? document.querySelector('.basket__list').insertAdjacentHTML('beforeend', itemHTML) : '';
            } else {
                // آیتم در صفحه وجود دارد، بنابراین مقدار را به‌روز کنید
                itemElement.querySelector('.eshop-product__number').value = item.number;
                delete currentItemsMap[key]; // حذف از نقشه برای شناسایی آیتم‌های حذف‌شده
            }
        });

        // حذف آیتم‌هایی که دیگر در Local Storage نیستند
        for (const key in currentItemsMap) {
            currentItemsMap[key].remove();
        }

        // اضافه کردن event listeners به دکمه‌های `plus` و `minus`
        document.querySelectorAll('.books__item').forEach(item => {
            const plusButton = item.querySelector('.plus');
            const minusButton = item.querySelector('.minus');
            const input = item.querySelector('.eshop-product__number');

            if (plusButton) {
                const newPlusButton = plusButton.cloneNode(true);
                plusButton.parentNode.replaceChild(newPlusButton, plusButton);

                newPlusButton.addEventListener('click', function () {
                    if (input) {
                        let count = parseInt(input.value) + 1;
                        input.value = count;
                        updateProductInLocalStorage(item.getAttribute("data-itemid"), item.getAttribute("data-tableid"), count); // بروزرسانی `localStorage`
                    }
                });
            }

            if (minusButton) {
                const newMinusButton = minusButton.cloneNode(true);
                minusButton.parentNode.replaceChild(newMinusButton, minusButton);

                newMinusButton.addEventListener('click', function () {
                    if (input) {
                        let count = parseInt(input.value) - 1;
                        if (count <= 0) {
                            removeProductFromLocalStorage(item.getAttribute("data-itemid"), item.getAttribute("data-tableid"));
                            item.remove(); // حذف آیتم از DOM
                        } else {
                            input.value = count;
                            updateProductInLocalStorage(item.getAttribute("data-itemid"), item.getAttribute("data-tableid"), count); // بروزرسانی `localStorage`
                        }
                    }
                });
            }
        });

    } else {
        (document.querySelector('.basket__list')) ? document.querySelector('.basket__list').innerHTML = "محصولی انتخاب نشده است" : '';
    }
}

(function () {
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
})();
