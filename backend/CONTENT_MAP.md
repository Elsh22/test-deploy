# DMC Website Backend Content Map

This Strapi backend is mapped to the redesigned DMC website, not the archived frontend.

## Homepage

- Hero text/video: keep in `frontend/src/app/page.tsx` for now.
- Companies orbit: `companies`
- Student success highlights: `success-stories`
- Program preview cards: `programs`
- Upcoming events: `events`
- Sunday/student/alumni spotlights: `spotlights`
- Contact form submissions: `contact-messages`

## Programs Page

- Professional Academy groups and scheduling links: `professional-academy-groups`
- Committees and GroupMe links: `committees`
- Mentorship and Wellness/Sports copy: `programs`
- Upcoming event categories: `events`

## Leadership Page

- Advisor and E-Board directory: `leaders`
- Individual profile pages: `leaders`
- Organizations, biographies, LinkedIn URLs, and LinkedIn post excerpts: `leaders`

## Calendar Page

- Full event list: `events`

## Resources Page

- Forms, guides, professional development links, and member tools: `resources`

## Contact Page

- Form submissions: `contact-messages`

## Donate Page

- Donation UI and Stripe/payment logic should stay in frontend/API code until the donor flow is rebuilt.
- Donor copy can later move into a Strapi single type if needed.

## Notes

- Use the current frontend in `frontend/src/app` as the source of truth.
- Do not depend on `frontend/_archive` for new website content.
- Image fields are strings for now so they can point to existing public paths like `/images/leadership/kaleb.jpg`.
- Later, these can be replaced with Strapi Media fields if you want uploads managed inside the Strapi admin.
