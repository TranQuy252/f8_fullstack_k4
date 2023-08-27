var User = function (name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  };
  

  const data = [];
  register("Trần đình Quý", "123456", "trandinhquy@gmail.com");
  register("Đình Quý", "1234567", "dinhquy@gmail.com");
  console.log(data);

  const dataLogin = login("dinhquy@gmail.com", "1234567");
  console.log(dataLogin);