UPDATE `app_settings`
SET `setting_value` = 'Alfabank'
WHERE `setting_key` = 'site_title'
  AND LOWER(TRIM(`setting_value`)) IN ('presensi alfabank', 'presensi presensi alfabank');

UPDATE `app_settings`
SET
  `setting_value` = '/images/alfabank-logo/alfabank_logo.png',
  `setting_file` = NULL,
  `setting_mime` = NULL
WHERE `setting_key` = 'site_logo_src'
  AND (
    `setting_value` LIKE '/uploads/%'
    OR `setting_value` LIKE '%/images/creativemu-logo/%'
    OR `setting_value` = '/images/alfabank-logo/logo.png'
    OR `setting_value` LIKE '/api/site-logo%'
  )
  AND `setting_file` IS NULL;
