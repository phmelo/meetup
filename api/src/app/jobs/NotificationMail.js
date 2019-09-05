import Mail from '../../lib/Mail';

class NotificationMail {
  get key() {
    return 'NotificationMail';
  }

  async handle({ data }) {
    const { organizer, organizerMail, name, email } = data;
    await Mail.sendMail({
      to: `${organizer} <${organizerMail}>`,
      subject: 'Nova inscrição!',
      template: 'notification',
      context: {
        organizer: name,
        user: name,
        email,
      },
    });
  }
}

export default new NotificationMail();
