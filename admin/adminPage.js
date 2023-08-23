var listProduct = [];
var listManufacturer = [];
var listCategory = [];
var idUpdate = "";




$(function () {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    alert("can dang nhap de truy cap");
    window.location.href = "../login/index.html"
  }
  $("#menu-admin").load("./menuAdmin.html");
  $("#sidebar-admin").load("./sideBarAdmin.html");
  $("#filter-manufacturers").load("./filterManufacturers.html");
  $("#filter-categorys").load("./filterCategorys.html");
  handleShowProduct();
  // localStorage.setItem("listProduct", JSON.stringify(listProduct));
  // localStorage.setItem("listCategory", JSON.stringify(listCategory));
  // localStorage.setItem("listManufacturer", JSON.stringify(listManufacturer));
});

function handleShowManufacturer() {
  $("#section-admin").load("./manufacturersAdmin.html");
}
function handleShowCategory() {
  $("#section-admin").load("./categorysAdmin.html");
}
function handleShowProduct() {
  $("#section-admin").load("./productAdmin.html");
  setTimeout(() => {
    checkLocal();
    fetchListProduct();
  }, 500);
}
function handleShowAcount() {
  $("#section-admin").load("./acountAdmin.html");
}
function checkLocal() {
  //kiem tra xem duoi local-storage co 2 cai danh sach category va manufacture chua
  const listManufacturerLocal = JSON.parse(localStorage.getItem("listManufacturer"));
  const listCategoryLocal = JSON.parse(localStorage.getItem("listCategory"));

  if (!listManufacturerLocal) {
    localStorage.setItem("listManufacturer", JSON.stringify([{
      id: 1,
      name: "SAMSUNG"
    }, {
      id: 2,
      name: 'APPLE'
    },
    {
      id: 3,
      name: 'XIAOMI'
    },
    {
      id: 4,
      name: "OPPO"
    }
    ]));

  }
  if (!listCategoryLocal) {
    localStorage.setItem("listCategory", JSON.stringify([{
      id: 1,
      name: 'Điện Thoại'
    },
    {
      id: 2,
      name: 'Tablet'
    },
    {
      id: 3,
      name: 'Laptop'
    }
    ]));
  }
}

function fetchListProduct() {


  // const listProductLocal = JSON.parse(localStorage.getItem("listProduct"));
  const listManufacturerLocal = JSON.parse(localStorage.getItem("listManufacturer"));
  const listCategoryLocal = JSON.parse(localStorage.getItem("listCategory"));
  // listProduct = listProductLocal ? listProductLocal : [];
  listManufacturer = listManufacturerLocal ? listManufacturerLocal : []
  listCategory = listCategoryLocal ? listCategoryLocal : []



  fetchListManufactureAdmin();
  fetchListCategoryAdmin();


  $("#tbProductAdmin").empty();
  $.ajax({
    type: "GET",
    url: `https://64db7749593f57e435b1000a.mockapi.io/products`,
    success: function (res, status) {
      if (status === "success") {
        listProduct = res;
        listProduct.forEach(product => {
          $("#tbProductAdmin").append(`
          <tr style="vertical-align: middle">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.info}</td>
            <td>${product.detail}</td>
            <td>${product.ratingStar}</td>
            <td> <img style="width: 50px; height: 50px" src="${product.imageName}"/> </td>
            <td>${listManufacturer.filter((manufacture) => manufacture.id === +product.manufacturerID)[0].name}</td>
            <td>${listCategory.find((category) => category.id === +product.categoryID).name}</td>
            <td> <button onclick="handleEditProduct(${product.id})" type="button" class="btn btn-warning"> Edit </button> </td>
            <td> <button onClick="handleDeleteProduct(${product.id})" type="button" class="btn btn-danger">Delete</button> </td>
          </tr>
          `)
        });
      }
    }
  })

}

function handleEditProduct(id) {
  idUpdate = id;
  const index = listProduct.findIndex((product) => +product.id === +id);
  $("#IdUpdate").val(listProduct[index].id);
  $("#NameUpdate").val(listProduct[index].name);
  $("#PriceUpdate").val(listProduct[index].price);
  $("#InfoUpdate").val(listProduct[index].info);
  $("#DetailUpdate").val(listProduct[index].detail);
  $("#StarUpdate").val(listProduct[index].ratingStar);
  $("#ImageUpdate").val(listProduct[index].imageName);
  $("#ManufacturerUpdate").val(listProduct[index].manufacturerID);
  $("#CategoryUpdate").val(listProduct[index].categoryID);
  $("#ModalUpdateProduct").modal("show");
}

function handleUpdateProduct() {
  const data = {
    id: idUpdate,
    name: $("#NameUpdate").val(),
    price: $("#PriceUpdate").val(),
    info: $("#InfoUpdate").val(),
    detail: $("#DetailUpdate").val(),
    ratingStar: $("#StarUpdate").val(),
    imageName: $("#ImageUpdate").val(),
    manufacturerID: $("#ManufacturerUpdate").val(),
    categoryID: $("#CategoryUpdate").val(),
  }

  // const index = listProduct.findIndex((product) => +product.id === +idUpdate);
  // listProduct[index] = data;
  // localStorage.setItem("listProduct", JSON.stringify(listProduct));
  $.ajax({
    type: "PUT",
    url: `https://64db7749593f57e435b1000a.mockapi.io/products/${idUpdate}`,
    data: data,
    success: function (res, status) {
      fetchListProduct();
      $("#ModalUpdateProduct").modal("hide");
    }
  })

}
function handleResetUpdate() {
  //reset cho modal update
  $("#NameUpdate").val("");
  $("#PriceUpdate").val("");
  $("#InfoUpdate").val("");
  $("#DetailUpdate").val("");
  $("#StarUpdate").val("");
  $("#ImageUpdate").val("");
  $("#ManufacturerUpdate").val("");
  $("#CategoryUpdate").val("");
}
function resetCreateAdmin() {
  //reset cho modal create
  $("#Name").val("");
  $("#Price").val("");
  $("#Info").val("");
  $("#Detail").val("");
  $("#Star").val("");
  $("#Image").val("");
  $("#Manufacturer").val("");
  $("#Category").val("");

}

function handleDeleteProduct(id) {
  console.log(id);
  swal({
    title: "Are you sure?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        // const data = listProduct.filter((product) => +product.id !== +id);
        // localStorage.setItem("listProduct", JSON.stringify(data));
        // setTimeout(() => {
        //   fetchListProduct();
        // }, 500);

        $.ajax({
          type: "DELETE",
          url: `https://64db7749593f57e435b1000a.mockapi.io/products/${id}`,
          success: function (res, status) {
            fetchListProduct();
            swal("deleted!", {
              icon: "success",
            });
          }
        })

      } else {
        swal.close();
      }
    });
}

function handleCreateProduct() {
  resetCreateAdmin();
  $("#ModalCreateProduct").modal("show");
}

function fetchListManufactureAdmin() {
  $("#Manufacturer").empty();
  $("#ManufacturerUpdate").empty();
  $("#filter").empty();

  for (let index = 0; index < listManufacturer.length; index++) {
    const manufacture = listManufacturer[index];
    // filter munfacture 
    $("#filter").append(
      `
      <li class="list-group-item">
    <button onClick="filterByManuFacture(${manufacture.id})" type="button" class="btnClass">${manufacture.name}</button>
  </li>
      `
    );

    //create
    $("#Manufacturer").append(
      `
      <option value="${manufacture.id}">${manufacture.name}</option>
      `
    );
    //update
    $("#ManufacturerUpdate").append(
      `
      <option value="${manufacture.id}">${manufacture.name}</option>
      `
    );
  }

}

function filterByManuFacture(id) {
  console.log(123, id);
  console.log(234, listProduct);

}

function fetchListCategoryAdmin() {
  $("#Category").empty();
  $("#CategoryUpdate").empty();
  $("#select-category").empty();

  for (let index = 0; index < listCategory.length; index++) {
    const category = listCategory[index];
    // filter category
    $("#select-category").append(
      `
      <option value="${category.id}">${category.name}</option>
      `
    );

    //create
    $("#Category").append(
      `
      <option value="${category.id}">${category.name}</option>
      `
    );
    //update
    $("#CategoryUpdate").append(
      `
      <option value="${category.id}">${category.name}</option>
      `
    );
  }
}

function filterByCategory(event) {
  console.log(event.target.value);
  console.log(234, listProduct);
}
function changeSearch(event) {
  console.log(event.target.value);
}
function CreateNewProduct() {
  const data = {
    id: Math.floor(Math.random() * 10000),
    name: $("#Name").val(),
    price: $("#Price").val(),
    info: $("#Info").val(),
    detail: $("#Detail").val(),
    ratingStar: $("#Star").val(),
    imageName: $("#Image").val(),
    manufacturerID: $("#Manufacturer").val(),
    categoryID: $("#Category").val(),
  }
  console.log(123, data);
  // listProduct.push(data);
  // localStorage.setItem("listProduct", JSON.stringify(listProduct));
  $.ajax({
    type: "POST",
    url: "https://64db7749593f57e435b1000a.mockapi.io/products",
    data: data,
    success: function (res, status) {
      fetchListProduct();
      $("#ModalCreateProduct").modal("hide");
    }
  })

}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../home/index.html"
}