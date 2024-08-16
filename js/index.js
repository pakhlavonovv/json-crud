// const user_modal = document.getElementById("user-modal")
// const open_modal = document.getElementById("open_modal")
// const save_btn = document.getElementById("save")
// const result = document.getElementById("result")
// let baseUrl = "http://localhost:3000/products"
// let form = {}
// let products = []
// let edit_index = 1
// document.addEventListener("DOMContentLoaded", function(){
//     open_modal.addEventListener("click", openModal)
//     save_btn.addEventListener("click", saveProduct)
//     getProducts();
// })
// window.addEventListener("click", function(event){
//     if(event.target === user_modal){
//         toggleModal("none")
//     }
// })
// function openModal(){
//     toggleModal("block")
// }
// function toggleModal(status){
//     user_modal.style.display = status;
// }
// async function saveProduct(){
//     if(typeof edit_index === 'string'){
//          try {
//             const response = await fetch(`${baseUrl}/${edit_index}`, {
//                 method: 'UPDATE',
//                 headers:{
//                     "Content-Type": "application/json"
//                 },
//                 body:JSON.stringify(form)
//             })
//             console.log(response)
//          } catch (error) {
//             console.log(error)
//          }
//     } else {
//         try{
//             const response = await fetch(`${baseUrl}`, {
//                 method: 'POST',
//                 headers:{
//                     "Content-Type": "application/json"
//                 },
//                 body:JSON.stringify(form)
//             })
//             console.log(response)
//         }catch(error){
//             console.log(error)
//         }
//     }
// }
// async function getProducts(){
//     try {
//         const response = await fetch(`${baseUrl}`)  
//         products = await response.json()
//         displayProducts()
//     } catch (error) {
//         console.log(error)
//     }
// }
// function handleChange(event){
//     const {name, value} = event.target
//     form = {...form, [name]: value}
// }
// function displayProducts(){
//     result.innerHTML = ""
//     products.forEach((item, index) => {
//         let tr = document.createElement("tr")
//         tr.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${item.name}</td>
//             <td>${item.price}</td>
//             <td>${item.brand}</td>
//             <td>${item.number}</td>
//             <td>${item.color}</td>
//             <td>
//             <button class="btn btn-primary mx-1" onclick="editProduct('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
//             <button class="btn btn-danger mx-1" onclick="deleteProduct('${item.id}')"><i class="fa-solid fa-trash"></i></button>
//             </td>
//         `
//         result.appendChild(tr)
//     })
// }
// async function deleteProduct(id){
//     try {
//         await fetch(`${baseUrl}/${id}`, {
//             method: 'DELETE'
//         })  
//     } catch (error) {
//         console.log(error)
//     }
// }
// // async function editProduct(id){
// //     edit_index = id
// //     let obj = products.find((item)=> item.id == id)
// //     console.log(obj)
// //     toggleModal("block")
// //     document.querySelector("input[name='name']").value = form.name
// //     document.querySelector("input[name='price']").value = form.price
// //     document.querySelector("input[name='number']").value = form.number
// //     document.querySelector("input[name='brand']").value = form.brand
// //     document.querySelector("input[name='color']").value = form.color
// // }
// async function editProduct(id) {
//     edit_index = id;
//     let obj = products.find((item) => item.id == id);

//     // Ob'yekt mavjud bo'lsa
//     if (obj) {
//         form = { ...obj }; // Formni tanlangan mahsulot bilan to'ldiramiz

//         // Modalni ko'rsatish va inputlarni mahsulot ma'lumotlari bilan to'ldirish
//         toggleModal("block");
//         document.querySelector("input[name='name']").value = form.name || "";
//         document.querySelector("input[name='price']").value = form.price || "";
//         document.querySelector("input[name='number']").value = form.number || "";
//         document.querySelector("select[name='brand']").value = form.brand || "";
//         document.querySelector("input[name='color']").value = form.color || "#000000"; // Agar rang berilmagan bo'lsa, default qora rang

//     } else {
//         console.log("Mahsulot topilmadi.");
//     }
// }

// async function saveProduct() {
//     // Agar edit_index string bo'lsa, mahsulotni yangilash uchun PATCH so'rovi
//     if (typeof edit_index === 'string') {
//         try {
//             const response = await fetch(`${baseUrl}/${edit_index}`, {
//                 method: 'PATCH', 
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(form)
//             });
//             const updatedProduct = await response.json();
//             console.log("Yangilangan product: ", updatedProduct);
            
//             // Yangilangan mahsulotni frontendda aks ettirish uchun:
//             getProducts(); 
//             toggleModal("none"); // Modalni yopish

//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         // Yangi mahsulot qo'shish uchun POST so'rovi
//         try {
//             const response = await fetch(`${baseUrl}`, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(form)
//             });
//             const newProduct = await response.json();
//             console.log("Yangi product: ", newProduct);
            
//             // Yangi mahsulotni frontendda aks ettirish uchun:
//             getProducts();
//             toggleModal("none"); // Modalni yopish

//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
const user_modal = document.getElementById("user-modal");
const open_modal = document.getElementById("open_modal");
const save_btn = document.getElementById("save");
const result = document.getElementById("result");
let baseUrl = "http://localhost:3000/products";
let form = {};
let products = [];
let edit_index = null;

document.addEventListener("DOMContentLoaded", function () {
    open_modal.addEventListener("click", openModal);
    save_btn.addEventListener("click", saveProduct);
    getProducts();
});

window.addEventListener("click", function (event) {
    if (event.target === user_modal) {
        toggleModal("none");
    }
});

function openModal() {
    edit_index = null; // Yangi mahsulot qo'shilayotganini ko'rsatadi
    form = {}; // Formni tozalaymiz
    clearForm(); // Inputlarni tozalaymiz
    toggleModal("block");
}

function toggleModal(status) {
    user_modal.style.display = status;
}

function clearForm() {
    // Barcha input maydonlarini tozalaymiz
    document.querySelector("input[name='name']").value = "";
    document.querySelector("input[name='price']").value = "";
    document.querySelector("input[name='number']").value = "";
    document.querySelector("select[name='brand']").value = "";
    document.querySelector("input[name='color']").value = "#000000"; // Default qora rang
}

async function saveProduct() {
    try {
        if (edit_index !== null) {
            // Mahsulotni yangilash uchun PATCH so'rovi
            const response = await fetch(`${baseUrl}/${edit_index}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            console.log("Yangilangan mahsulot: ", await response.json());
        } else {
            // Yangi mahsulot qo'shish uchun POST so'rovi
            const response = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            console.log("Yangi mahsulot: ", await response.json());
        }
        // Mahsulotlar ro'yxatini yangilash va modalni yopish
        getProducts();
        toggleModal("none");
    } catch (error) {
        console.log("Xato: ", error);
    }
}

async function getProducts() {
    try {
        const response = await fetch(baseUrl);
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.log("Xato: ", error);
    }
}

function handleChange(event) {
    const { name, value } = event.target;
    form = { ...form, [name]: value };
}

function displayProducts() {
    result.innerHTML = "";
    products.forEach((item, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.brand}</td>
            <td>${item.number}</td>
            <td>${item.color}</td>
            <td>
                <button class="btn btn-primary mx-1" onclick="editProduct('${item.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger mx-1" onclick="deleteProduct('${item.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        result.appendChild(tr);
    });
}

async function deleteProduct(id) {
    try {
        await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
        // Mahsulotlar ro'yxatini yangilash
        getProducts();
    } catch (error) {
        console.log("Xato: ", error);
    }
}

async function editProduct(id) {
    edit_index = id;
    let obj = products.find((item) => item.id == id);

    // Ob'yekt mavjud bo'lsa
    if (obj) {
        form = { ...obj }; // Formni tanlangan mahsulot bilan to'ldiramiz

        // Modalni ko'rsatish va inputlarni mahsulot ma'lumotlari bilan to'ldirish
        document.querySelector("input[name='name']").value = form.name || "";
        document.querySelector("input[name='price']").value = form.price || "";
        document.querySelector("input[name='number']").value = form.number || "";
        document.querySelector("select[name='brand']").value = form.brand || "";
        document.querySelector("input[name='color']").value = form.color || "#000000"; // Default qora rang

        toggleModal("block");
    } else {
        console.log("Mahsulot topilmadi.");
    }
}

