import bcrypt from 'bcryptjs';

const users = [
  { name: 'Admin User', email: 'admin@routina.com', password: bcrypt.hashSync('123456', 10), role: 'admin' },
  { name: 'Teodor Gavric', email: 'teodor@routina.com', password: bcrypt.hashSync('123456', 10), role: 'user' },
];

export default users;