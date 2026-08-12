INSERT INTO `app_settings` (`setting_key`, `setting_value`, `created_at`, `updated_at`)
VALUES (
  'app_theme_colors',
  '{"primaryColor":"#b91c1c","primaryHoverColor":"#991b1b","softColor":"#fee2e2","subtleColor":"#fff5f5","textColor":"#b91c1c"}',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  `setting_value` = VALUES(`setting_value`),
  `updated_at` = NOW();
