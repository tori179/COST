<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row mt-5">
        <div class="col-lg-12 text-center">
          <h2>
            KHÓA HỌC TẠI LEARN HUB
            <i class="fa-brands fa-square-web-awesome-stroke text-warning"></i>
          </h2>
          <p>
            Danh Sách các khóa học lập trình online
            <span class="text-warning">PRO</span> đã được
            <span class="text-primary fw-bold">Learn Hub</span> ra mắt
          </p>
        </div>
        <div class="col-lg-12 mt-2">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid"
          >
            <template v-for="(value, index) in list_khoa_hoc" :key="index">
              <template v-if="index">
                <router-link
                  :to="
                    `/chi-tiet-khoa-hoc/` + value.id + '-' + value.slug_khoa_hoc
                  "
                >
                  <div class="col d-flex">
                    <div class="card rounded-4 flex-fill">
                      <img
                        :src="value.hinh_anh"
                        class="card-img-top"
                        style="
                          border-top-left-radius: 20px;
                          border-top-right-radius: 20px;
                          height: 180px;
                        "
                        alt="..."
                      />
                      <div class="">
                        <div
                          class="position-absolute top-0 end-0 m-3 product-discount"
                        >
                          <i
                            class="fa-brands fa-square-web-awesome-stroke text-warning fa-xl"
                          ></i>
                        </div>
                      </div>
                      <div class="card-body d-flex flex-column">
                        <h6 class="card-title cursor-pointer">
                          {{ value.ten_khoa_hoc }}
                        </h6>
                        <div class="clearfix mt-auto">
                          <p class="mb-0 float-start">
                            <span
                              class="me-2 text-decoration-line-through text-secondary"
                              >{{ formatVND(value.gia_goc) }}</span
                            ><b class="text-danger">{{
                              formatVND(value.gia_ban)
                            }}</b>
                          </p>
                        </div>
                        <div class="d-flex justify-content-between mt-4">
                          <p class="text-secondary">
                            <i class="fa-solid fa-users me-1"></i> 131.495
                          </p>
                          <p class="text-secondary">
                            <i class="fa-solid fa-circle-play me-1"></i> 100
                          </p>
                          <p class="text-secondary">
                            <i class="fa-solid fa-clock me-1"></i> 116h44p
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </template>
            </template>
          </div>
        </div>
        <div class="col-lg-12 text-center">
          <button class="btn btn-lg btn-outline-secondary radius-30 px-5">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      list_khoa_hoc: [],
    };
  },
  mounted() {
    this.loadKhoaHoc();
  },
  methods: {
    formatVND(number) {
      return new Intl.NumberFormat("vi-VI", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },
    loadKhoaHoc() {
      axios
        .get("http://127.0.0.1:8000/api/home-page/loai-khoa-hoc/data-open", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("key_khach_hang"),
          },
        })
        .then((res) => {
          this.list_khoa_hoc = res.data.data;
        });
    },
  },
};
</script>
<style></style>
