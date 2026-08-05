ALTER TABLE `shifts` ADD COLUMN IF NOT EXISTS `start_time` VARCHAR(10) NOT NULL DEFAULT '08:00';
ALTER TABLE `shifts` ADD COLUMN IF NOT EXISTS `end_time` VARCHAR(10) NOT NULL DEFAULT '17:00';
ALTER TABLE `shifts` ADD COLUMN IF NOT EXISTS `check_in_open` VARCHAR(10) NOT NULL DEFAULT '07:00';
ALTER TABLE `shifts` ADD COLUMN IF NOT EXISTS `check_out_open` VARCHAR(10) NOT NULL DEFAULT '16:50';

UPDATE `shifts` SET `tolerance_minutes` = 5 WHERE `tolerance_minutes` = 0 AND `name` != 'MAGANG';

UPDATE `shifts` SET `start_time` = '08:00', `end_time` = '17:00', `check_in_open` = '07:00', `check_out_open` = '16:50' WHERE `name` = 'UTAMA';
UPDATE `shifts` SET `start_time` = '08:00', `end_time` = '17:00', `check_in_open` = '07:00', `check_out_open` = '16:50' WHERE `name` = 'MAGANG';
UPDATE `shifts` SET `start_time` = '07:30', `end_time` = '15:30', `check_in_open` = '06:30', `check_out_open` = '15:20' WHERE `name` = 'SHIFT PAGI';
UPDATE `shifts` SET `start_time` = '13:00', `end_time` = '21:00', `check_in_open` = '11:00', `check_out_open` = '20:50' WHERE `name` = 'SHIFT SIANG';
