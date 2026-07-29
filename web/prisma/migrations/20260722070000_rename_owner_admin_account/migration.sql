UPDATE `users`
SET
  `name` = 'Admin Creativemu',
  `email` = 'admin@creativemu.id',
  `role` = 'admin',
  `status` = 'active'
WHERE LOWER(`email`) = 'owner@creativemu.com';
