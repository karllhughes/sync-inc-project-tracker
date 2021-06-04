This repository is a starter for building your own completely custom client portal on Airtable:

![End state](https://docs.syncinc.so/assets/client-portal/01.png)

You can build this project from scratch by following **[the step-by-step guide](https://docs.syncinc.so/playbooks/client-portal)**.

Or, you can simply update the `.env` file with your credntials and start building from this foundation.

## Getting Started

1. Clone the project.
2. Install the dependencies with `npm install`
3. Open the `.env.local` file and add your enivironment variables for (1) Cotter (2) Sync Inc and (2) Airtable

```bash
# .env.local file
NEXT_PUBLIC_COTTER_API_KEY_ID="..."
COTTER_API_KEY_SECRET="..."
PG_CONNECTION_STRING="..."
AIRTABLE_API_KEY="..."
AIRTABLE_BASE="..."
```
4. Launch your development environment `npm run dev`

## Deploy to Vercel
Once you've built your client portal, you can deploy your Next.js app using Vercel.
