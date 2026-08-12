UPDATE `app_settings`
SET
  `setting_value` = '/images/alfabank-logo/alfabank_logo.png',
  `setting_file` = NULL,
  `setting_mime` = NULL
WHERE `setting_key` = 'site_logo_src';

UPDATE `app_settings`
SET `setting_value` = 'Alfabank'
WHERE `setting_key` = 'site_title'
  AND LOWER(TRIM(`setting_value`)) IN ('presensi alfabank', 'presensi presensi alfabank', 'creativemu', 'presensi creativemu');
