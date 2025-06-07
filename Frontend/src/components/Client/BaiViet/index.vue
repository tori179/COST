<template>
  <div class="row">
    <div class="col-lg-12 text-center">
      <h2>BÀI VIẾT CỦA CHÚNG TÔI <i class="fa-regular fa-newspaper"></i></h2>
      <p>
        Learn Hub luôn quan tâm đến bạn và đã tổng hợp các bài viết về kiến thức
        lập trình, thông báo quan trọng cùng những tin tức khác mới nhất.
      </p>
    </div>
    <hr />
    <div class="col-lg-12">
      <div class="row mt-3">
        <div class="col-lg-12">
          <h4>BÀI VIẾT MỚI</h4>
        </div>
        <div class="col-lg-12 mt-2">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 product-grid"
          >
            <template v-for="(value, index) in list_bai_viet" :key="index">
              <div class="col d-flex">
                <div class="card rounded-4 flex-fill">
                  <a :href="value.link" target="_blank">
                    <img
                      :src="value.hinh_anh"
                      class="card-img-top"
                      style="
                        border-top-left-radius: 20px;
                        border-top-right-radius: 20px;
                        height: 160px;
                      "
                      alt="Bài viết"
                    />
                  </a>
                  <div class="card-body">
                    <h5 class="card-title cursor-pointer">
                      <a
                        :href="value.link"
                        target="_blank"
                        class="text-decoration-none text-dark"
                      >
                        {{ value.tieu_de }}
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
            </template>
          </div>
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
      list_bai_viet: [],
    };
  },
  mounted() {
    this.loadBaiViet();
  },
  methods: {
    loadBaiViet() {
      axios.get("http://127.0.0.1:8000/api/bai-viet/data-open").then((res) => {
        this.list_bai_viet = res.data.data;
      });
    },
  },
};
</script>
<style></style>
