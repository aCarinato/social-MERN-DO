import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';

export const register = async (req, res) => {
  // console.log('REGISTER ENDPOINT =>', req.body);
  const { name, email, password, secret } = req.body;

  // validation
  if (!name) return res.status(400).send('Name is required');
  if (!password || password.length < 6)
    return res
      .status(400)
      .send('Password is required and should be more than 6 characters long');
  if (!secret) return res.status(400).send('Answer is required');

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send('Email already taken');

  // Hashing password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword, secret });
  try {
    await user.save();
    console.log('Registered user => ', user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log('Registration failed with error => ', err);
    return res.status(400).send('Error. Try again');
  }
};
