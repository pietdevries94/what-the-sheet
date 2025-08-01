import { Events, Schema, State, makeSchema } from "@livestore/livestore";

export const tables = {
	characterSheets: State.SQLite.table({
		name: "characterSheets",
		columns: {
			id: State.SQLite.text({ primaryKey: true }),
			name: State.SQLite.text(),
		},
	}),
	statAdjustments: State.SQLite.table({
		name: "statAdjustments",
		columns: {
			characterSheetId: State.SQLite.text(),
			stat: State.SQLite.text(),
			value: State.SQLite.integer(),
		},
	}),
};

export const events = {
	characterSheetCreated: Events.synced({
		name: "v1.CharacterSheetCreated",
		schema: Schema.Struct({ id: Schema.String, name: Schema.String.pipe(Schema.optional) }),
	}),
	statAdjustmentCreated: Events.synced({
		name: "v1.StatAdjustmentCreated",
		schema: Schema.Struct({
			characterSheetId: Schema.String,
			stat: Schema.String,
			value: Schema.Number,
		}),
	}),
};

const materializers = State.SQLite.materializers(events, {
	"v1.CharacterSheetCreated": ({ id, name }) =>
		tables.characterSheets.insert({
			id,
			name: name || "unknown name",
		}),
	"v1.StatAdjustmentCreated": ({ characterSheetId, stat, value }) =>
		tables.statAdjustments.insert({
			characterSheetId,
			stat,
			value,
		}),
});

const state = State.SQLite.makeState({ tables, materializers });
export const schema = makeSchema({ events, state });
