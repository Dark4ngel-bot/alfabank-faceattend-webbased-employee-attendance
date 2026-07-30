SET @add_check_out_work_mode_sql = (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Attendance'
        AND COLUMN_NAME = 'check_out_work_mode'
    ),
    'SELECT 1',
    'ALTER TABLE `Attendance` ADD COLUMN `check_out_work_mode` VARCHAR(20) NULL'
  )
);

PREPARE add_check_out_work_mode_stmt FROM @add_check_out_work_mode_sql;
EXECUTE add_check_out_work_mode_stmt;
DEALLOCATE PREPARE add_check_out_work_mode_stmt;

SET @add_check_out_work_mode_idx_sql = (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Attendance'
        AND INDEX_NAME = 'Attendance_check_out_work_mode_idx'
    ),
    'SELECT 1',
    'CREATE INDEX `Attendance_check_out_work_mode_idx` ON `Attendance`(`check_out_work_mode`)'
  )
);

PREPARE add_check_out_work_mode_idx_stmt FROM @add_check_out_work_mode_idx_sql;
EXECUTE add_check_out_work_mode_idx_stmt;
DEALLOCATE PREPARE add_check_out_work_mode_idx_stmt;
