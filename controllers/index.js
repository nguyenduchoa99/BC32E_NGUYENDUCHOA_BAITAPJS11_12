function layDanhSachProduct() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });
    promise.then(function (result) {
        console.log(result.data);
        renderProduct(result.data);
    });
    promise.catch(function (error) {
        console.log(error);
    });
};

window.onload = function () {
    layDanhSachProduct();
};

function renderProduct(arrProduct) {
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var pd = arrProduct[i];
        html += `
    <tr>
        <td>${pd.id}</td>
        <td><img src="${pd.img}" alt="" style="width:10%"/></td>
        <td>${pd.name}</td>
        <td>${pd.price}</td>
        <td>${pd.description}</td>
        <td>${pd.type}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct('${pd.id}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button class="btn btn-primary" onclick="editProduct('${pd.id}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        </td>
    </tr>
    `;
    };
    document.querySelector('#tblProduct').innerHTML = html;
    return html;
};

document.querySelector('#btnCreate').onclick = function () {
    var product = new Product();
    product.id = document.querySelector('#nhap_id').value;
    product.name = document.querySelector('#nhap_name').value;
    product.price = document.querySelector('#nhap_price').value;
    product.img = document.querySelector('#nhap_image').value;
    product.description = document.querySelector('#nhap_productType').value;
    product.type = document.querySelector('#nhap_price2').value;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: product
    });
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachProduct();
    });
    promise.catch(function (error) {
        console.log((error));
    });
};

function deleteProduct(idProductClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idProductClick,
        method: 'DELETE'
    });
    promise.then(function (result) {
        layDanhSachProduct();
    });
    promise.catch(function (error) {
        console.log(error);
    });
};

function editProduct(idProductClick2) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + idProductClick2,
        method: 'GET'
    });
    promise.then(function (result) {
        var pd = result.data;
        document.querySelector('#nhap_id').value = pd.id;
        document.querySelector('#nhap_name').value = pd.name;
        document.querySelector('#nhap_price').value = pd.price;
        document.querySelector('#nhap_image').value = pd.img;
        document.querySelector('#nhap_productType').value = pd.description;
        document.querySelector('#nhap_price2').value = pd.type;
    });
    promise.catch(function (error) {
        console.log(error);
    });
};

document.querySelector('#btnUpdate').onclick = function () {
    var productUpdate = new Product();
    productUpdate.id = document.querySelector('#nhap_id').value;
    productUpdate.name = document.querySelector('#nhap_name').value;
    productUpdate.price = document.querySelector('#nhap_price').value;
    productUpdate.img = document.querySelector('#nhap_image').value;
    productUpdate.description = document.querySelector('#nhap_productType').value;
    productUpdate.type = document.querySelector('#nhap_price2').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + productUpdate.id,
        method: 'Put',
        data: productUpdate
    });
    promise.then(function (result) {
        layDanhSachProduct();
    });
    promise.catch(function (error) {
        console.log(error);
    });
};

document.querySelector('#btnSearch').onclick = function (e) {
    e.preventDefault();
    var searchUser = document.querySelector('#inputSearch').value;
    var promise = axios({

        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name=' + searchUser,
        method: 'GET'
    });
    promise.then(function (result) {
        console.log(result.data);
        var searchByName = result.data.filter(value => {
            return value.name.toLowerCase().includes(searchUser.toLowerCase().trim())
        });
        renderProduct(searchByName);
    });
    promise.catch(function (error) {
        console.log(error);
        if (searchUser === '') {
            window.onload();    
        } else {
            document.querySelector('#tblProduct').innerHTML = 'Không tìm thấy!';
        };
    });
};