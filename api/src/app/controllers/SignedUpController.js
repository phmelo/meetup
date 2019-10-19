import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import SignedUpMeetup from '../models/SignedupMeetup';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Queue from '../../lib/Queue';
import NotificationMail from '../jobs/NotificationMail';

class SignedUpMeetupController {
  async store(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: `Meetup not informed. `,
      });
    }
    console.log(`Trying to subscribe id: ${id}`);
    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });
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
        meetup_id: id,
        user_id: req.userId,
      });

      const { name, email } = await User.findByPk(req.userId);

      await Queue.add(NotificationMail.key, {
        organizer: meetup.User.name,
        organizerMail: meetup.User.email,
        name,
        email,
      });

      return res.json(signUpMeetup);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err });
    }
  }

  async index(req, res) {
    const signed = await SignedUpMeetup.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          where: {
            datetime: {
              [Op.gte]: new Date(),
            },
          },
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'datetime',
            'banner_id',
            'user_id',
          ],
          required: true,
        },
      ],
      order: [[Meetup, 'datetime']],
    });

    return res.json(signed);
  }

  async delete(req, res) {
    return res.status(400).json({
      error: `Not implemented. `,
    });
  }
}

export default new SignedUpMeetupController();
