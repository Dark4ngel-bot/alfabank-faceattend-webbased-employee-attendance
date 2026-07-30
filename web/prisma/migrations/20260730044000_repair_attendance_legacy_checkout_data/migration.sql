UPDATE `Attendance`
SET `check_out_work_mode` = `work_mode`
WHERE `check_out_time` IS NOT NULL
  AND `check_out_work_mode` IS NULL;

UPDATE `Attendance`
SET `work_minutes` = GREATEST(
  1,
  CEIL(TIMESTAMPDIFF(SECOND, `check_in_time`, `check_out_time`) / 60)
)
WHERE `check_in_time` IS NOT NULL
  AND `check_out_time` IS NOT NULL
  AND TIMESTAMPDIFF(SECOND, `check_in_time`, `check_out_time`) > 0
  AND COALESCE(`work_minutes`, 0) = 0;
