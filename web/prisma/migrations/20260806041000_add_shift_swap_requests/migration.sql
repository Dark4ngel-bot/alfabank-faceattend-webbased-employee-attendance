CREATE TABLE IF NOT EXISTS `shift_swap_requests` (
  `id` CHAR(36) NOT NULL,
  `requester_id` CHAR(36) NOT NULL,
  `target_user_id` CHAR(36) NOT NULL,
  `swap_date` DATE NOT NULL,
  `requester_shift_name` VARCHAR(100) NOT NULL,
  `target_shift_name` VARCHAR(100) NOT NULL,
  `reason` TEXT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'pending',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `shift_swap_requests_requester_id_idx` (`requester_id`),
  INDEX `shift_swap_requests_target_user_id_idx` (`target_user_id`),
  INDEX `shift_swap_requests_swap_date_idx` (`swap_date`),
  INDEX `shift_swap_requests_status_idx` (`status`),
  CONSTRAINT `shift_swap_requests_requester_id_fkey`
    FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shift_swap_requests_target_user_id_fkey`
    FOREIGN KEY (`target_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
