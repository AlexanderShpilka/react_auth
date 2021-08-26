import { sendEmail } from '../util/sendEmail'

export const testEmailRoute = {
  path: '/api/test-email',
  method: 'post',
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: 'alexander.shpilka+test1@gmail.com',
        from: 'alexander.shpilka@gmail.com',
        subject: 'Does this work?',
        text: 'If you are reading this... yes!!!'
      })

      res.sendStatus(200)
    } catch (err) {
      console.error(err)
      res.sendStatus(500)
    }
  }
}
