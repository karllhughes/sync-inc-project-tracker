// This API route authenticates a Stytch magic link.
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-iron-session';
import withSession from '../../lib/withSession';
import loadStytch from '../../lib/loadStytch';
// type NextIronRequest = NextApiRequest & { session: Session };

// type ErrorData = {
//   errorString: string;
// };

export async function handler(req: NextIronRequest, res: NextApiResponse<ErrorData>) {
  if (req.method === 'GET') {
    const client = loadStytch();
    const { token } = req.query;
    try {
      const resp = await client.magicLinks.authenticate(token as string);
      // Set session
      req.session.destroy();
      req.session.set('user', {
        user_id: resp.user_id,
      });
      // Save additional user data here
      await req.session.save();
      return res.redirect('/profile'); //<------------change
    } catch (error) {
      const errorString = JSON.stringify(error);
      console.log(error);
      return res.status(400).json({ errorString });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default handler;

//export default withSession(handler);
