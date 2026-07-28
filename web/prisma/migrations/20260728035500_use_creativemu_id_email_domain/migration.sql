UPDATE `users` AS `user`
LEFT JOIN `users` AS `existing`
  ON LOWER(`existing`.`email`) = CONCAT(SUBSTRING_INDEX(LOWER(`user`.`email`), '@', 1), '@creativemu.id')
  AND `existing`.`id` <> `user`.`id`
SET `user`.`email` = CONCAT(SUBSTRING_INDEX(LOWER(`user`.`email`), '@', 1), '@creativemu.id')
WHERE (
  LOWER(`user`.`email`) LIKE '%@creativemu.com'
  OR LOWER(`user`.`email`) LIKE '%@creativemu.co.id'
)
AND `existing`.`id` IS NULL;
