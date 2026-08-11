ALTER TABLE `appointments`
  ADD COLUMN `paymentStatus` ENUM('not_required','pending','paid','failed','refunded') NOT NULL DEFAULT 'not_required' AFTER `notes`,
  ADD COLUMN `amount` INT AFTER `paymentStatus`,
  ADD COLUMN `mpPreferenceId` VARCHAR(100) AFTER `amount`,
  ADD COLUMN `mpPaymentId` VARCHAR(100) AFTER `mpPreferenceId`;
