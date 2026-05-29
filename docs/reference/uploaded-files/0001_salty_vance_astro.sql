CREATE TABLE `artists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`period` varchar(100) NOT NULL,
	`biography` text,
	`roomTheme` varchar(100) NOT NULL,
	`colorPalette` varchar(500),
	`ambientAudio` varchar(500),
	`doorTransition` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `artists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `artworks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artistId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`year` int,
	`description` text,
	`imageUrl` varchar(500),
	`highResImageUrl` varchar(500),
	`medium` varchar(100),
	`dimensions` varchar(100),
	`estimatedValue` varchar(100),
	`provenance` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `artworks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `escrowRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artworkId` int NOT NULL,
	`userId` int NOT NULL,
	`escrowType` enum('vault','lending','sale') NOT NULL,
	`status` enum('pending','active','completed','cancelled') DEFAULT 'pending',
	`amount` varchar(100),
	`startDate` timestamp,
	`endDate` timestamp,
	`terms` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `escrowRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lendingEligibility` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artworkId` int NOT NULL,
	`isEligible` int DEFAULT 1,
	`loanToValue` varchar(50),
	`maxLoanAmount` varchar(100),
	`interestRate` varchar(50),
	`terms` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lendingEligibility_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ndaSignatures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`artworkId` int NOT NULL,
	`signedAt` timestamp NOT NULL DEFAULT (now()),
	`documentVersion` varchar(50) DEFAULT '1.0',
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ndaSignatures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provenanceNarratives` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artworkId` int NOT NULL,
	`narrative` text NOT NULL,
	`generatedBy` varchar(50) DEFAULT 'claude',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `provenanceNarratives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `artworks` ADD CONSTRAINT `artworks_artistId_artists_id_fk` FOREIGN KEY (`artistId`) REFERENCES `artists`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `escrowRecords` ADD CONSTRAINT `escrowRecords_artworkId_artworks_id_fk` FOREIGN KEY (`artworkId`) REFERENCES `artworks`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `escrowRecords` ADD CONSTRAINT `escrowRecords_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lendingEligibility` ADD CONSTRAINT `lendingEligibility_artworkId_artworks_id_fk` FOREIGN KEY (`artworkId`) REFERENCES `artworks`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ndaSignatures` ADD CONSTRAINT `ndaSignatures_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ndaSignatures` ADD CONSTRAINT `ndaSignatures_artworkId_artworks_id_fk` FOREIGN KEY (`artworkId`) REFERENCES `artworks`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `provenanceNarratives` ADD CONSTRAINT `provenanceNarratives_artworkId_artworks_id_fk` FOREIGN KEY (`artworkId`) REFERENCES `artworks`(`id`) ON DELETE no action ON UPDATE no action;