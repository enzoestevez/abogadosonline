CREATE TABLE `divorce_consultations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hasChildren` varchar(10) NOT NULL,
	`childrenAges` varchar(50),
	`hasAssets` varchar(10) NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(20) NOT NULL,
	`diagnosis` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `divorce_consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `succession_consultations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hasWill` varchar(10) NOT NULL,
	`deceasedType` varchar(50) NOT NULL,
	`maritalStatus` varchar(50) NOT NULL,
	`hasChildren` varchar(10) NOT NULL,
	`heirstAgreement` varchar(10) NOT NULL,
	`heirName` varchar(255) NOT NULL,
	`heirEmail` varchar(320) NOT NULL,
	`heirPhone` varchar(20) NOT NULL,
	`diagnosis` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `succession_consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
