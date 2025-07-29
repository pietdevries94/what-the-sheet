import { Schema, Table, column } from "@powersync/web";

const characterSheets = new Table({
	id: column.text,
	constitution: column.integer,
	dexterity: column.integer,
	intelligence: column.integer,
	charisma: column.integer,
	wisdom: column.integer,
	strength: column.integer,
});

export const AppSchema = new Schema({
	characterSheets,
});

export type Database = (typeof AppSchema)["types"];
