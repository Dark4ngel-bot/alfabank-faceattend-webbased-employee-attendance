SET @rename_jabatan_table_sql = (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'jabatan'
    )
    AND NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'jabatans'
    ),
    'RENAME TABLE `jabatan` TO `jabatans`',
    'SELECT 1'
  )
);

PREPARE rename_jabatan_table_stmt FROM @rename_jabatan_table_sql;
EXECUTE rename_jabatan_table_stmt;
DEALLOCATE PREPARE rename_jabatan_table_stmt;

SET @create_jabatans_table_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'jabatans'
    ),
    'CREATE TABLE `jabatans` (
      `id` CHAR(36) NOT NULL,
      `name` VARCHAR(100) NOT NULL,
      `department_id` CHAR(36) NULL,
      `status` VARCHAR(20) NOT NULL DEFAULT ''active'',
      `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (`id`)
    )',
    'SELECT 1'
  )
);

PREPARE create_jabatans_table_stmt FROM @create_jabatans_table_sql;
EXECUTE create_jabatans_table_stmt;
DEALLOCATE PREPARE create_jabatans_table_stmt;

SET @add_users_jabatan_id_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'users'
        AND COLUMN_NAME = 'jabatan_id'
    ),
    'ALTER TABLE `users` ADD COLUMN `jabatan_id` CHAR(36) NULL',
    'SELECT 1'
  )
);

PREPARE add_users_jabatan_id_stmt FROM @add_users_jabatan_id_sql;
EXECUTE add_users_jabatan_id_stmt;
DEALLOCATE PREPARE add_users_jabatan_id_stmt;

SET @add_position_jabatan_id_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Position'
        AND COLUMN_NAME = 'jabatan_id'
    ),
    'ALTER TABLE `Position` ADD COLUMN `jabatan_id` CHAR(36) NULL',
    'SELECT 1'
  )
);

PREPARE add_position_jabatan_id_stmt FROM @add_position_jabatan_id_sql;
EXECUTE add_position_jabatan_id_stmt;
DEALLOCATE PREPARE add_position_jabatan_id_stmt;

SET @add_jabatans_unique_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'jabatans'
        AND INDEX_NAME = 'jabatans_department_id_name_key'
    ),
    'CREATE UNIQUE INDEX `jabatans_department_id_name_key` ON `jabatans`(`department_id`, `name`)',
    'SELECT 1'
  )
);

PREPARE add_jabatans_unique_stmt FROM @add_jabatans_unique_sql;
EXECUTE add_jabatans_unique_stmt;
DEALLOCATE PREPARE add_jabatans_unique_stmt;

SET @add_jabatans_department_idx_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'jabatans'
        AND INDEX_NAME = 'jabatans_department_id_idx'
    ),
    'CREATE INDEX `jabatans_department_id_idx` ON `jabatans`(`department_id`)',
    'SELECT 1'
  )
);

PREPARE add_jabatans_department_idx_stmt FROM @add_jabatans_department_idx_sql;
EXECUTE add_jabatans_department_idx_stmt;
DEALLOCATE PREPARE add_jabatans_department_idx_stmt;

SET @add_position_jabatan_unique_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Position'
        AND INDEX_NAME = 'Position_jabatan_id_name_key'
    ),
    'CREATE UNIQUE INDEX `Position_jabatan_id_name_key` ON `Position`(`jabatan_id`, `name`)',
    'SELECT 1'
  )
);

PREPARE add_position_jabatan_unique_stmt FROM @add_position_jabatan_unique_sql;
EXECUTE add_position_jabatan_unique_stmt;
DEALLOCATE PREPARE add_position_jabatan_unique_stmt;

SET @add_position_jabatan_idx_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Position'
        AND INDEX_NAME = 'Position_jabatan_id_idx'
    ),
    'CREATE INDEX `Position_jabatan_id_idx` ON `Position`(`jabatan_id`)',
    'SELECT 1'
  )
);

PREPARE add_position_jabatan_idx_stmt FROM @add_position_jabatan_idx_sql;
EXECUTE add_position_jabatan_idx_stmt;
DEALLOCATE PREPARE add_position_jabatan_idx_stmt;

SET @add_users_jabatan_idx_sql = (
  SELECT IF(
    NOT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'users'
        AND INDEX_NAME = 'users_jabatan_id_idx'
    ),
    'CREATE INDEX `users_jabatan_id_idx` ON `users`(`jabatan_id`)',
    'SELECT 1'
  )
);

PREPARE add_users_jabatan_idx_stmt FROM @add_users_jabatan_idx_sql;
EXECUTE add_users_jabatan_idx_stmt;
DEALLOCATE PREPARE add_users_jabatan_idx_stmt;
