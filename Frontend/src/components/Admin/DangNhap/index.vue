<template>
  <div class="container-fluid">
    <div class="row row-cols-lg-2">
      <div class="col mx-auto">
        <div class="mb-4 text-center">
          <img src="/src/assets/img/LH_vip.png" width="200" alt="" />
        </div>
        <div class="card">
          <div class="card-body">
            <div class="border p-4 rounded">
              <div class="text-center">
                <h3 class="">
                  ĐĂNG NHẬP TÀI KHOẢN
                  <span class="text-danger fw-bold">ADMIN</span>
                </h3>
              </div>
              <hr />
              <div class="form-body">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="mb-2">Email</label>
                    <div class="input-group">
                      <span class="input-group-text"
                        ><i class="fa-solid fa-envelope"></i
                      ></span>
                      <input
                        v-model="tai_Khoan.email"
                        type="text"
                        placeholder="Nhập email của bạn"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="mb-2">Password</label>
                    <div class="input-group">
                      <span class="input-group-text"
                        ><i class="fa-solid fa-lock"></i
                      ></span>
                      <input
                        v-model="tai_Khoan.password"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        placeholder="Nhập mật khẩu"
                        class="form-control"
                      />
                      <span
                        class="input-group-text"
                        @click="togglePasswordVisibility"
                      >
                        <i
                          :class="
                            isPasswordVisible
                              ? 'fa-solid fa-eye'
                              : 'fa-solid fa-eye-slash'
                          "
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="mb-2">Recaptcha</label>
                    <div class="input-group">
                      <div
                        class="g-recaptcha"
                        data-sitekey="6LcGsYwqAAAAAGbO3dMvso_ZzpESyqLJ3lOin-p0"
                        ref="recaptcha"
                      ></div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button
                        v-on:click="dangNhap()"
                        type="submit"
                        class="btn btn-primary"
                      >
                        <i class="fa-solid fa-lock-open"></i> Đăng Nhập
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      tai_Khoan: {
        email: "",
        password: "",
      },
      isPasswordVisible: false,
    };
  },
  mounted() {
    this.kiemTraDangNhap();
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://www.google.com/recaptcha/api.js"
    );
    recaptchaScript.onerror = () => {
      this.$toast.error("Không thể tải Recaptcha. Vui lòng thử lại sau.");
    };
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    dangNhap() {
      let code = grecaptcha.getResponse();
      if (!code) {
        this.$toast.error("Bạn chưa chọn recaptcha");
      } else {
        this.tai_Khoan.code = code;
        axios
          .post("http://127.0.0.1:8000/api/admin/dang-nhap", this.tai_Khoan)
          .then((res) => {
            if (res.data.status == 1) {
              this.$toast.success(res.data.message);
              this.tai_Khoan = { email: "", password: "" };
              localStorage.setItem("key_admin", res.data.key);
              localStorage.setItem("name", res.data.user && res.data.user.name ? res.data.user.name : "Admin");
              this.$router.push("/admin/nhan-vien");
            } else {
              this.$toast.error(res.data.message);
            }
          })
          .catch((res) => {
            const list = Object.values(res.response.data.errors);
            list.forEach((v) => {
              this.$toast.error(v[0]);
            });
          });
      }
    },
    kiemTraDangNhap() {
      axios
        .get("http://127.0.0.1:8000/api/admin/nhan-vien/check-login", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("key_admin"),
          },
        })
        .then((res) => {
          if (res.data.status) {
            this.$router.push("/admin/nhan-vien");
          }
        });
    },
  },
};
</script>

<style>
.password-toggle-icon {
  font-size: 16px; /* Kích thước icon */
  padding: 0 10px; /* Điều chỉnh padding để căn giữa */
  line-height: 1.5; /* Căn giữa theo chiều dọc */
}

.input-group .btn {
  border-left: 0;
  height: 38px; /* Đảm bảo nút có chiều cao khớp với input */
  display: flex;
  align-items: center; /* Căn giữa icon theo chiều dọc */
  justify-content: center; /* Căn giữa icon theo chiều ngang */
}
</style>
