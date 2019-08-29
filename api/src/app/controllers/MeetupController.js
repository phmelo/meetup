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
}

export default new MeetupController();
