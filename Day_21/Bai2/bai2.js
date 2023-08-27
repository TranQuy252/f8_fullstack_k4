// Hàm constructor
function User(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  // Hàm sắp xếp và thêm shortName createCustomers
  function createCustomers(users) {
    return users
      .map(function (user) {
        var fullName = user.name.split(" ");
        var firstName = fullName[0];
        var lastName = fullName[fullName.length - 1];
        var person = new User(user.name, user.age, user.address);
        person.shortName = `${firstName} ${lastName}`;
        return person;
      })
      .sort(function (a, b) {
        return a.age - b.age;
      });
  }

  const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
  ];

  const result = createCustomers(customers);

  console.log(result);