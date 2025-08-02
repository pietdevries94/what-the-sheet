import { Schema, queryDb, sql } from "@livestore/livestore";

export const statAndModifier$ = (characterSheetId: string, stat: string) =>
	queryDb({
		query: sql`select floor((coalesce(sum(value),0)-10)/2) as modifier, coalesce(sum(value),0) as value from statAdjustments where characterSheetId = ${characterSheetId} and stat = '${stat}'`,
		schema: Schema.Struct({
			value: Schema.Number,
			modifier: Schema.Number,
		}).pipe(Schema.Array, Schema.headOrElse()),
	});

export const savingThrowProficiencies$ = (characterSheetId: string) =>
	queryDb({
		query: sql`select savingThrow from savingThrowProficiencies where characterSheetId = ${characterSheetId}`,
		schema: Schema.Struct({
			savingThrow: Schema.String,
		}).pipe(Schema.Array),
	});

export const skillProficiencies$ = (characterSheetId: string) =>
	queryDb({
		query: sql`select skill from skillProficiencies where characterSheetId = ${characterSheetId}`,
		schema: Schema.Struct({
			skill: Schema.String,
		}).pipe(Schema.Array),
	});

export const generalProficiencies$ = (characterSheetId: string) =>
	queryDb({
		query: sql`select proficiencyType, proficiencyName from generalProficiencies where characterSheetId = ${characterSheetId}`,
		schema: Schema.Struct({
			proficiencyType: Schema.String,
			proficiencyName: Schema.String,
		}).pipe(Schema.Array),
	});

export const generalProficienciesByType$ = (characterSheetId: string, proficiencyType: string) =>
	queryDb({
		query: sql`select proficiencyName from generalProficiencies where characterSheetId = ${characterSheetId} and proficiencyType = ${proficiencyType}`,
		schema: Schema.Struct({
			proficiencyName: Schema.String,
		}).pipe(Schema.Array),
	});
