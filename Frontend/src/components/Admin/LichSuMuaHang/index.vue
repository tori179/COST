<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h4>LỊCH SỬ MUA HÀNG</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead class="text-center">
                <tr>
                  <th>#</th>
                  <th>ID Khách Hàng</th>
                  <th>Họ Tên Khách Hàng</th>
                  <th>Email Khách Hàng</th>
                  <th>Tên Khóa Học</th>
                  <th>Số Tiền Mua</th>
                  <th>Thời Gian</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(value, index) in list" :key="index">
                  <tr class="align-middle">
                    <th class="text-center">{{ index + 1 }}</th>
                    <td class="text-center">{{ value.id_khach_hang }}</td>
                    <td>{{ value.ho_va_ten }}</td>
                    <td>{{ value.email }}</td>
                    <td>{{ value.ten_khoa_hoc }}</td>
                    <td>
                      <button class="btn btn-warning w-100 text-end">
                        {{ formatVND(value.so_tien_mua) }}
                      </button>
                    </td>
                    <td class="text-center">
                      {{ formatdate(value.created_at) }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
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
      list: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    formatVND(number) {
      return new Intl.NumberFormat("vi-VI", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },
    formatdate(thoi_gian) {
      const date = new Date(thoi_gian);
      return date.toLocaleString();
    },
    loadData() {
      axios
        .get("http://127.0.0.1:8000/api/admin/lich-su-mua/data", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("key_admin"),
          },
        })
        .then((res) => {
          this.list = res.data.data;
        });
    },
  },
};
</script>

<style>
/* Thống nhất với bảng lịch sử giao dịch */
/* .card-header {
  background-color: #000;
  color: white;
  text-align: center;
} */

.table th,
.table td {
  text-align: center;
}

.btn-warning {
  font-weight: bold;
}

tr:hover {
  background-color: #f8f9fa;
}
</style>
