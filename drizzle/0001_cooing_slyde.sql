CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationType` varchar(50) NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientEmail` varchar(320) NOT NULL,
	`clientPhone` varchar(20) NOT NULL,
	`appointmentDate` varchar(10) NOT NULL,
	`appointmentTime` varchar(5) NOT NULL,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
