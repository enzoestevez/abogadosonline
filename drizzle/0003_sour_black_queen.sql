ALTER TABLE `appointments` ADD `paymentStatus` enum('not_required','pending','paid','failed','refunded') DEFAULT 'not_required' NOT NULL;--> statement-breakpoint
ALTER TABLE `appointments` ADD `amount` int;--> statement-breakpoint
ALTER TABLE `appointments` ADD `mpPreferenceId` varchar(100);--> statement-breakpoint
ALTER TABLE `appointments` ADD `mpPaymentId` varchar(100);