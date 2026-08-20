SET @add_profile_photo_data_sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE `users` ADD COLUMN `profile_photo_data` LONGBLOB NULL',
    'SELECT 1'
  )
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'profile_photo_data'
);

PREPARE add_profile_photo_data_stmt FROM @add_profile_photo_data_sql;
EXECUTE add_profile_photo_data_stmt;
DEALLOCATE PREPARE add_profile_photo_data_stmt;

SET @add_profile_photo_mime_sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE `users` ADD COLUMN `profile_photo_mime` VARCHAR(50) NULL',
    'SELECT 1'
  )
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'users'
    AND COLUMN_NAME = 'profile_photo_mime'
);

PREPARE add_profile_photo_mime_stmt FROM @add_profile_photo_mime_sql;
EXECUTE add_profile_photo_mime_stmt;
DEALLOCATE PREPARE add_profile_photo_mime_stmt;
