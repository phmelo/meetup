import * as Yup from 'yup';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';

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
    const { page = 1, limit = 10, date, id } = req.query;

    if (Object.keys(req.query).length === 0 && !id) {
      const meetup = await Meetup.findAll({
        where: {
          user_id: req.userId,
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
        limit,
        offset: (page - 1) * limit,
      });
      return res.json(meetup);
    }

    let idmeetup;
    if (!id) {
      idmeetup = req.params.id;
    } else {
      idmeetup = id;
    }

    if (idmeetup) {
      const meetup = await Meetup.findAll({
        where: {
          id,
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
      });
      return res.json(meetup);
    }

    if (!date) {
      return res.status(400).json({ error: `Invalid Date ${date}` });
    }
    const parseDate = parseISO(date);

    if (!(parseDate instanceof Date && !isNaN(parseDate))) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const meetup = await Meetup.findAll({
      where: {
        // user_id: req.userId,
        datetime: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
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
      limit,
      offset: (page - 1) * limit,
    });
    return res.json(meetup);
  }

  async delete(req, res) {
    const id = req.body.id ? req.body.id : req.params.id;
    console.log(`Trying to delete: ${id}`);
    if (!id) {
      return res.status(400).json({
        error: `Meetup not informed. `,
      });
    }

    const meetup = await Meetup.findByPk(id);
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
    meetup.destroy();
    return res.json({
      msg: `Meetup was excluded.`,
    });
  }

  async indexById(req, res) {
    const { id } = req.params;

    if (id) {
      const meetup = await Meetup.findAll({
        where: {
          id,
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
        include: [
          {
            model: File,
            attributes: ['path', 'url'],
          },
        ],
      });
      return res.json(meetup);
    }

    return res.status(400).json({ error: `No meetup found` });
  }
}

export default new MeetupController();
