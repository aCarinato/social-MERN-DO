import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';

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

export const login = async (req, res) => {
  // on successful login a jwt is generated
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('No user found');
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send('wrong password');
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again');
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ ok: true }); // this is a switch to protect the page in the front end
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
