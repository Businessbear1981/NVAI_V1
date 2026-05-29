CREATE TABLE `kiki_archive` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`type` varchar(100) NOT NULL,
	`content_url` varchar(512) NOT NULL,
	`year` int,
	`source` varchar(255),
	`is_public` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kiki_archive_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kiki_film_campaign` (
	`id` int AUTO_INCREMENT NOT NULL,
	`supporter_name` varchar(255) NOT NULL,
	`pledge_amount` int NOT NULL,
	`pledge_message` text,
	`email` varchar(320),
	`is_public` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kiki_film_campaign_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kiki_guest_book` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitor_name` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`email` varchar(320),
	`is_public` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kiki_guest_book_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kiki_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`type` varchar(100) NOT NULL,
	`price` int NOT NULL,
	`image_url` varchar(512),
	`download_url` varchar(512),
	`is_available` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kiki_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lingerie_line` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`era` varchar(100) NOT NULL,
	`inspiration` text,
	`image_url` varchar(512),
	`price` int NOT NULL,
	`brand` varchar(255),
	`is_available` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lingerie_line_id` PRIMARY KEY(`id`)
);
