// This API route authenticates a Stytch magic link.
import withSession from '../lib/withSession';
import loadStytch from '../lib/loadStytch';
import { user } from 'pg/lib/defaults';

export async function handler(req, res) {
  if (req.method === 'GET') {
    const client = loadStytch();
    const { token } = req.query;
    
    try {
      const resp = await client.magicLinks.authenticate(token);
      // Set session
      req.session.destroy();
      let user_details = await client.users.get(resp.user_id)
      console.log('email address: ', user_details.emails[0].email)
      req.session.set('user', {
        user_id: resp.user_id,
        email: user_details.emails[0].email
      });
      
      // Save additional user data here
      await req.session.save();
      return res.redirect('/');
    } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(error);
      return res.status(400).json({ errorString });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default withSession(handler);