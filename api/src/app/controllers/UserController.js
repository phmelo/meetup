import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { name, email, password, password_new, password_confirm } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (password) {
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Password does not match' });
      }
      if (password_new !== password_confirm) {
        return res.status(401).json({ error: 'New password does not match' });
      }
    }
    await user.update({
      name,
      email,
      password: password_new,
    });

    return res.json({
      id: req.userId,
      name,
      email,
    });
  }
}

export default new UserController();
