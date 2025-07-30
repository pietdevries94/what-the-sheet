import { Events, Schema, State, makeSchema } from "@livestore/livestore";

export const tables = {
	characterSheets: State.SQLite.table({
		name: "characterSheets",
		columns: {
			id: State.SQLite.text({ primaryKey: true }),
			constitution: State.SQLite.integer({ nullable: false }),
			dexterity: State.SQLite.integer({ nullable: false }),
			intelligence: State.SQLite.integer({ nullable: false }),
			charisma: State.SQLite.integer({ nullable: false }),
			wisdom: State.SQLite.integer({ nullable: false }),
			strength: State.SQLite.integer({ nullable: false }),
		},
	}),
};

export const events = {
	characterSheetCreated: Events.synced({
		name: "v1.CharacterSheetCreated",
		schema: Schema.Struct({ id: Schema.String }),
	}),
};

const materializers = State.SQLite.materializers(events, {
	"v1.CharacterSheetCreated": ({ id }) =>
		tables.characterSheets.insert({
			id,
			constitution: 10,
			dexterity: 10,
			intelligence: 10,
			charisma: 10,
			wisdom: 10,
			strength: 10,
		}),
});

const state = State.SQLite.makeState({ tables, materializers });
export const schema = makeSchema({ events, state });
