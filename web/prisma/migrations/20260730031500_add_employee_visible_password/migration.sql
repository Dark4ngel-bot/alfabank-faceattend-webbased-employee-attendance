SET @add_visible_password_sql = (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'users'
        AND COLUMN_NAME = 'visible_password'
    ),
    'SELECT 1',
    'ALTER TABLE `users` ADD COLUMN `visible_password` VARCHAR(255) NULL'
  )
);

PREPARE add_visible_password_stmt FROM @add_visible_password_sql;
EXECUTE add_visible_password_stmt;
DEALLOCATE PREPARE add_visible_password_stmt;
