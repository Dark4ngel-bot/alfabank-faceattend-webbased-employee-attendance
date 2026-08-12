UPDATE `users`
SET `role` = 'admin'
WHERE LOWER(TRIM(`role`)) IN ('administrator', 'superadmin', 'super_admin')
  OR LOWER(TRIM(`email`)) = 'admin@alfabankjogja.com'
  OR LOWER(TRIM(`name`)) IN ('admin alfabank', 'admin alfabank lama');
