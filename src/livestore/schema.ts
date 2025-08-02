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
	savingThrowProficiencies: State.SQLite.table({
		name: "savingThrowProficiencies",
		columns: {
			characterSheetId: State.SQLite.text(),
			savingThrow: State.SQLite.text(),
		},
	}),
	skillProficiencies: State.SQLite.table({
		name: "skillProficiencies",
		columns: {
			characterSheetId: State.SQLite.text(),
			skill: State.SQLite.text(),
		},
	}),
	generalProficiencies: State.SQLite.table({
		name: "generalProficiencies",
		columns: {
			characterSheetId: State.SQLite.text(),
			proficiencyType: State.SQLite.text(),
			proficiencyName: State.SQLite.text(),
		},
	}),
};

export const events = {
	characterSheetCreated: Events.synced({
		name: "v1.CharacterSheetCreated",
		schema: Schema.Struct({
			id: Schema.String,
			name: Schema.String.pipe(Schema.optional),
		}),
	}),
	statAdjustmentCreated: Events.synced({
		name: "v1.StatAdjustmentCreated",
		schema: Schema.Struct({
			characterSheetId: Schema.String,
			stat: Schema.String,
			value: Schema.Number,
		}),
	}),
	savingThrowProficiencyCreated: Events.synced({
		name: "v1.SavingThrowProficiencyCreated",
		schema: Schema.Struct({
			characterSheetId: Schema.String,
			savingThrow: Schema.String,
		}),
	}),
	skillProficiencyCreated: Events.synced({
		name: "v1.SkillProficiencyCreated",
		schema: Schema.Struct({
			characterSheetId: Schema.String,
			skill: Schema.String,
		}),
	}),
	generalProficiencyCreated: Events.synced({
		name: "v1.GeneralProficiencyCreated",
		schema: Schema.Struct({
			characterSheetId: Schema.String,
			proficiencyType: Schema.String,
			proficiencyName: Schema.String,
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
	"v1.SavingThrowProficiencyCreated": ({ characterSheetId, savingThrow }) =>
		tables.savingThrowProficiencies.insert({
			characterSheetId,
			savingThrow,
		}),
	"v1.SkillProficiencyCreated": ({ characterSheetId, skill }) =>
		tables.skillProficiencies.insert({
			characterSheetId,
			skill,
		}),
	"v1.GeneralProficiencyCreated": ({ characterSheetId, proficiencyType, proficiencyName }) =>
		tables.generalProficiencies.insert({
			characterSheetId,
			proficiencyType,
			proficiencyName,
		}),
});

const state = State.SQLite.makeState({ tables, materializers });
export const schema = makeSchema({ events, state });
