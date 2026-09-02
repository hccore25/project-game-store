CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` text NOT NULL,
	`game_slug` text NOT NULL,
	`title` text NOT NULL,
	`unit_price` real NOT NULL,
	`qty` integer NOT NULL,
	`image` text NOT NULL,
	`keys` text NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`customer_name` text NOT NULL,
	`total` real NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
