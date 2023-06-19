
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" BOOLEAN DEFAULT false,
    "first_name" VARCHAR (40) NOT NULL,
    "last_name" VARCHAR (40) NOT NULL,
    "phone_number" INTEGER,
    "email" VARCHAR (100),
    "street_adress" VARCHAR (120),
    "state" VARCHAR (30)
);

CREATE TABLE "proposal"(
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (2000) NOT NULL,
	"user_id" INTEGER REFERENCES "user", 
	"created_date" TIMESTAMP,
	"status" VARCHAR (40) DEFAULT 'In Progress'
);
	
CREATE TABLE "proposal_vote"(
	"id" SERIAL PRIMARY KEY,
	"proposal_id" INTEGER REFERENCES "proposal",
	"user_id" INTEGER REFERENCES "user",
	"vote" BOOLEAN 
);

CREATE TABLE "event_calendar" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user", 
	"description" VARCHAR (1000),
	"start" timestamp with time zone,
  	"end" timestamp with time zone
);
 
CREATE TABLE "gallery" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user", 
	"url" VARCHAR (1500) NOT NULL,
	"title" VARCHAR (120) NOT NULL,
	"description" VARCHAR (2000),
	"likes" INTEGER DEFAULT 0
);