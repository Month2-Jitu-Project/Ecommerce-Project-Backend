import cron from 'node-cron'
import { sendWelcomeEmail } from './EmailServices/welcomeEmail';


cron.schedule('*/2 * * * * *', async () => {
    await sendWelcomeEmail() ///check if there is a new user and send a welcome email
  });