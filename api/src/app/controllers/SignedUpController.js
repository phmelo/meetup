import { isBefore, parseISO } from 'date-fns';
import SignedUpMeetup from '../models/SignedupMeetup';
import User from '../models/User';
import Meetup from '../models/Meetup';

class SignedUpMeetupController {
  async store(req, res) {
    if (!req.body.meetup_id) {
      return res.status(400).json({
        error: `Meetup not informed. `,
      });
    }

    const meetup = await Meetup.findByPk(req.body.meetup_id);
    if (!meetup) {
      return res.status(400).json({
        error: `Meetup not foud. `,
      });
    }

    const { user_id, datetime } = meetup;
    if (user_id === req.userId) {
      return res.status(401).json({
        error: `You are not allowed to sign up your own meetup. `,
      });
    }

    if (isBefore(datetime, new Date())) {
      return res
        .status(400)
        .json({ error: 'Impossible to sign up a meetup that already happend' });
    }

    const signedUpMeetupByUser = await SignedUpMeetup.findOne({
      where: { user_id: req.userId },
      attributes: ['user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          required: true,
          where: { datetime },
          attributes: ['user_id', 'datetime'],
        },
      ],
    });

    if (signedUpMeetupByUser) {
      return res.status(401).json({
        error: `You are not allowed to sign up meetups that occur at the same time. `,
      });
    }

    try {
      const signUpMeetup = await SignedUpMeetup.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.json(signUpMeetup);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async index(req, res) {
    return res.status(400).json({
      error: `Not implemented. `,
    });
  }

  async delete(req, res) {
    return res.status(400).json({
      error: `Not implemented. `,
    });
  }
}

export default new SignedUpMeetupController();
