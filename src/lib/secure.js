import 'dotenv/config';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;

export const hashPassword = async (person) => {
  if (!person.changed('password')) {
    return;
  }

  const hashedPassword = await bcrypt.hash(person.password, Number(saltRounds));
  person.password = hashedPassword;
}

export const compare = (value, hash) => {
  return bcrypt.compare(value, hash);
}
