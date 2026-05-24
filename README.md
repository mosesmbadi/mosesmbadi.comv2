I want to recreate my website. Essentially what I want is to display who I am, most specifically indicate that I do consultancy for anything IT and also offer private one-on-one sessisons. I want to use a tool such us https://github.com/calcom/cal.diy, so that people can schedule sessions, and they can also see when I am available. User's can schedule and use MPesa STK (Mobile Money) or pay with Visa (PayStack), just as I have done with Soma Stories.

Without using AI, (Just google and docs), create a comprehensive design brief, that will briefly show the design wireframes, the user journeys, and the hosting infrastructure.


##

Third Party Tools:
1. Cal.com (cal.diy) - for scheduling and calendar management.
2. PayStack - for payment processing (Visa).
3. MPesa STK - for mobile money payments.

## Technology Stack
1. Frontend: VueJS or ReactJS for building the user interface.
2. Backend: Node.js for clen API, Fast API (How many sessions are paid for and how many are free), and handling payment processing.
3. Database: MongoDB
4. Infrastructure: AWS (EC2 for hosting, S3 for storage, RDS for database), Namecheap, Dockerhub, Github Actions for CI/CD, and Cloudflare for DNS management and security.

## Frontend
cd frontend
bun install
bun format
bun dev


To get started
1. Create your secrets file


cp cal.env.example cal.env
Then fill in cal.env:

Generate secrets: openssl rand -base64 32 (run twice — one for each key)
Set NEXTAUTH_URL=http://localhost:3000 for local dev
2. Start everything


docker compose -f docker-compose-local.yml up
Cal.com will take 2–4 minutes on first boot — it's running Prisma migrations against PostgreSQL.

3. Create your account + event type

Visit http://localhost:3000 and sign up
Create an event type with the slug meet
That gives you the mosesmbadi/meet calLink the embed uses
4. Production
Set VITE_CAL_ORIGIN=https://cal.yourdomain.com as a build arg in your GitHub Actions workflow (or as a Docker build arg) so the frontend bakes in the right URL at build time.

Note on NEXT_PUBLIC_DISABLE_SIGNUP — uncomment that line in cal.env once you've created your account. It blocks anyone else from registering on your self-hosted instance.