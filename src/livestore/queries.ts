import { Schema, queryDb, sql } from "@livestore/livestore";
import { dndStats } from "../dndTypes.js";
import { tables } from "./schema.js";

export const statAndModifier$ = (characterSheetId: string, stat: string) =>
	queryDb({
		query: sql`select floor((coalesce(sum(value),0)-10)/2) as modifier, coalesce(sum(value),0) as value from statAdjustments where characterSheetId = '${characterSheetId}' and stat = '${stat}'`,
		schema: Schema.Struct({
			value: Schema.Number,
			modifier: Schema.Number,
		}).pipe(Schema.Array, Schema.headOrElse()),
	});

export const allStatsAndModifiers$ = (characterSheetId: string) =>
	queryDb({
		query: sql`
			select 
				stat,
				floor((coalesce(sum(value),0)-10)/2) as modifier, 
				coalesce(sum(value),0) as value 
			from statAdjustments 
			where characterSheetId = '${characterSheetId}' 
			group by stat
		`,
		schema: Schema.Struct({
			stat: Schema.String,
			value: Schema.Number,
			modifier: Schema.Number,
		}).pipe(Schema.Array),
	});

export const savingThrowProficiencies$ = (characterSheetId: string) =>
	queryDb(
		tables.savingThrowProficiencies
			.select("savingThrow", "expert")
			.where({ characterSheetId }),
	);

export const skillProficiencies$ = (characterSheetId: string) =>
	queryDb(
		tables.skillProficiencies
			.select("skill", "expert")
			.where({ characterSheetId }),
	);
