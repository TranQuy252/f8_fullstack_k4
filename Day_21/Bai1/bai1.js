var errors = {
    name: {
      required: "Vui lòng nhập họ tên",
      min: "Họ tên phải từ 5 ký tự",
    },
    email: {
      email: "Định dạng email không hợp lệ",
      unique: "Email đã có người sử dụng",
      required: "Vui lòng nhập địa chỉ email",
    },
    password: {
      required: "Vui lòng nhập mật khẩu",
      same: "Mật khẩu phải khớp với mật khẩu nhập lại",
    },
  };
  // Hàm getError(field)
  let getError = function (field) {
    let error = errors[field];
    let message = Object.values(error)[0];
    console.log(message);
  };
  getError("name");
  getError("email");