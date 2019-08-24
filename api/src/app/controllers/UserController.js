import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .when('password_new', (password_new, field) =>
          password_new ? field.min(6).required() : field
        ),

      password_new: Yup.string().min(6),
      password_confirm: Yup.string()
        .min(6)
        .when('password_new', (password_new, field) =>
          password_new
            ? field
                .required()
                .min(6)
                .oneOf([Yup.ref('password_new')])
            : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      email,
      password,
      password_new,
      password_confirm,
      avatar_id,
    } = req.body;

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
      avatar_id,
    });

    return res.json({
      id: req.userId,
      name,
      email,
      avatar_id,
    });
  }
}

export default new UserController();
