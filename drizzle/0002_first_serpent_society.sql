CREATE TABLE `diagnostics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationType` varchar(50) NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientEmail` varchar(320) NOT NULL,
	`clientPhone` varchar(20) NOT NULL,
	`diagnosisTitle` varchar(255) NOT NULL,
	`diagnosisDescription` text NOT NULL,
	`requiredDocuments` json,
	`nextSteps` json,
	`importantNotes` json,
	`formAnswers` json,
	`emailSent` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `diagnostics_id` PRIMARY KEY(`id`)
);
