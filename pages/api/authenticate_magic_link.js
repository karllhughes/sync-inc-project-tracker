// This API route authenticates a Stytch magic link.
// import { Session } from 'next-iron-session';
import withSession from '../lib/withSession';
import loadStytch from '../lib/loadStytch';

export async function handler(req, res) {
  if (req.method === 'GET') {
    const client = loadStytch();
    const { token } = req.query;
    
    try {
      const resp = await client.magicLinks.authenticate(token);
      // Set session
      console.log(resp)
      req.session.destroy();
      req.session.set('user', {
        user_id: resp.user_id,
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
