# A starter repo for building a completely custom client portal on Airtable

![End state](https://docs.syncinc.so/assets/client-portal/01.png)

You can build this project from scratch by following **[the step-by-step guide](https://docs.syncinc.so/playbooks/client-portal)**.

Or, you can simply start building from this foundation 🚀

## Getting Started

1. Clone the project.
2. Install the dependencies with `npm install`
3. Create a `.env.local` file and add your enivironment variables for (1) [Cotter](https://www.cotter.app/) (2) [Sync Inc](https://syncinc.so) and (2) [Airtable](https://airtable.com)

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
Once you've built your client portal, you can deploy your Next.js app using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
