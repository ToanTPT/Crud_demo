var listProduct = [];
var listManufacturer = [];
var listCategory = [];

$(function () {
    setTimeout(() => {
        fetchListProduct();
    }, 500);
})




function fetchListProduct() {
    const listProductLocal = JSON.parse(localStorage.getItem("listProduct"));
    const listManufacturerLocal = JSON.parse(localStorage.getItem("listManufacturer"));
    const listCategoryLocal = JSON.parse(localStorage.getItem("listCategory"));
    listProduct = listProductLocal ? listProductLocal : [];
    listManufacturer = listManufacturerLocal ? listManufacturerLocal : []
    listCategory = listCategoryLocal ? listCategoryLocal : []
    $("#product-list").empty();

    listProduct.forEach(product => {
        $("#product-list").append(`
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div class="product-box">
                <!-- Ảnh -->
                <div class="row">
                  <div
                    class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center"
                  >
                    <img
                      src="${product.imageName}"
                      alt=""
                      style="width: 190px; height: 190px"
                    />
                  </div>
                </div>
                <!-- Tên sản phẩm -->
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h5 style="font-weight: bold">${product.name}</h5>
                  </div>
                </div>
                <!-- Hãng sản xuất -->
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h5>Hãng sản xuất: ${listManufacturer.filter((manufacture) => manufacture.id === +product.manufacturerID)[0].name}</h5>
                  </div>
                </div>
                <!-- Đánh giá -->
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <ul
                      class="rating"
                      style="
                        list-style: none;
                        display: flex;
                        font-size: 20px;
                        padding-inline-start: 0px;
                      "
                    >
                      <li>
                       ${showRatingStar(+product.ratingStar)}
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- Thêm vào giỏ hàng -->
                <div class="row align-items-center justify-content-between">
                  <div class="col-sm-4 col-md-4 col-lg-4">
                    <h6 style="margin-bottom: 0">${product.price}</h6>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-end">
                    <button
                      type="button"
                      class="btn btn-default"
                      style="border: 0px"
                    >
                      <img
                        style="width: 25px; height: 25px"
                        src="https://cdn2.cellphones.com.vn/50x,webp,q70/media/wysiwyg/add-to-cart.png"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
      `)
    });
}

function showRatingStar(star) {
    let ratingStar = "";
    for (let index = 1; index <= star; index++) {
        ratingStar += `<i class="fa fa-star selected" style="color: orange"></i>`
    }
    return ratingStar;
}


