
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,
    "first_name" VARCHAR (40),
    "last_name" VARCHAR (40),
    "phone_number" VARCHAR (40),
    "email" VARCHAR (100),
    "street_address" VARCHAR (120),
    "city" VARCHAR (80),
    "state" VARCHAR (30),
    "profile_pic" VARCHAR (1200)
);

CREATE TABLE "proposal"(
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (2000) NOT NULL,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE, 
	"created_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"status" VARCHAR (40) DEFAULT 'In Progress',
	"status_updated_date" TIMESTAMP
);

	
CREATE TABLE "proposal_vote"(
	"id" SERIAL PRIMARY KEY,
	"proposal_id" INTEGER REFERENCES "proposal" ON DELETE CASCADE,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"vote" BOOLEAN,
	CONSTRAINT unique_vote_per_user_proposal UNIQUE (user_id, proposal_id)
);

CREATE TABLE "event_calendar" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE, 
	"title" varchar(250) NOT NULL,
	"description" VARCHAR (1000),
	"start" timestamp with time zone,
  	"end" timestamp with time zone
);
 
CREATE TABLE "gallery" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE, 
	"url" VARCHAR (1500) NOT NULL,
	"title" VARCHAR (120) NOT NULL,
	"description" VARCHAR (2000),
	"likes" INTEGER DEFAULT 0
);