import 'dotenv/config';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;

export const hashPassword = async (person) => {
  if (!person.changed('password')) {
    return;
  }

  person.password = await bcrypt.hash(person.password, Number(saltRounds));
}

export const compare = (value, hash) => {
  return bcrypt.compare(value, hash);
}
