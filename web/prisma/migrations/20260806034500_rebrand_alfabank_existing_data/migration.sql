UPDATE `users`
SET
  `email` = CASE LOWER(`email`)
    WHEN 'admin@creativemu.id' THEN 'admin.lama@alfabankjogja.com'
    ELSE CONCAT(SUBSTRING_INDEX(LOWER(`email`), '@', 1), '@alfabankjogja.com')
  END,
  `employee_code` = CASE
    WHEN `employee_code` LIKE 'CR-%' THEN CONCAT('AB-', SUBSTRING(`employee_code`, 4))
    ELSE `employee_code`
  END,
  `name` = CASE
    WHEN `name` = 'Admin Creativemu' THEN 'Admin Alfabank Lama'
    ELSE `name`
  END
WHERE LOWER(`email`) LIKE '%@creativemu.%';

UPDATE `OfficeLocation`
SET `name` = 'Alfabank Sedayu'
WHERE `name` = 'Creativemu Academy';
