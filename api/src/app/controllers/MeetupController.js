import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      banner_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      datetime: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (isBefore(parseISO(req.body.datetime), new Date())) {
      return res
        .status(400)
        .json({ error: 'Impossible to create a meetup in the past' });
    }

    try {
      const meetup = await Meetup.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.json(meetup);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  async update(req, res) {
    const meetup = await Meetup.findByPk(req.body.id);
    if (!meetup) {
      return res.status(400).json({
        error: `Meetup not found. `,
      });
    }
    const { user_id, title } = meetup;
    if (user_id !== req.userId) {
      return res.status(401).json({
        error: `You are not allowed to update ${title} meetup. `,
      });
    }

    if (isBefore(parseISO(req.body.datetime), new Date())) {
      return res
        .status(400)
        .json({ error: 'Impossible to update a meetup that already happend' });
    }

    meetup.update(req.body);
    return res.json(meetup);
  }

  async index(req, res) {
    const meetup = await Meetup.findAll({
      where: { user_id: req.userId },
    });
    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.body.id);
    if (!meetup) {
      return res.status(400).json({
        error: `Meetup not found. `,
      });
    }

    const { user_id, datetime } = meetup;
    if (user_id !== req.userId) {
      return res.status(401).json({
        error: `You are not allowed to exclude this meetup. `,
      });
    }
    if (isBefore(datetime, new Date())) {
      return res.status(400).json({
        error: 'You are nor allowed to exclude a meetup that already happend',
      });
    }
    // meetup.destroy();
    return res.json({
      msg: `Meetup was excluded.`,
    });
  }
}

export default new MeetupController();
