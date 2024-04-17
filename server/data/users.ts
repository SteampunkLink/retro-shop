import bcrypt from "bcryptjs";

const userData = [
  {
    name: "Admin Adam",
    email: "admin@email.com",
    password: bcrypt.hashSync("test123", 10),
    isAdmin: true,
  },
  {
    name: "Regular Rudy",
    email: "rudy@email.com",
    password: bcrypt.hashSync("test123", 10),
    isAdmin: false,
  },
  {
    name: "Standard Steve",
    email: "steve@email.com",
    password: bcrypt.hashSync("test123", 10),
    isAdmin: false,
  },
];

export default userData;
