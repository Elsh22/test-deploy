-- Promote this DMC member account to an officer role.
-- Run this in the Supabase SQL Editor.
--
-- Why SQL Editor?
-- Role changes should be done from a trusted admin context, not from client-side
-- app code. The website only has the public anon key locally, which is correct.

update public.profiles
set
  role = 'officer',
  updated_at = now()
where email = 'watsonsm2@vcu.edu';

-- Confirm the update worked.
select id, email, role, updated_at
from public.profiles
where email = 'watsonsm2@vcu.edu';
