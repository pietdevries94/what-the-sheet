import { Schema, queryDb, sql } from "@livestore/livestore";

export const statAndModifier$ = (characterSheetId: string, stat: string) =>
	queryDb({
		query: sql`select floor((coalesce(sum(value),0)-10)/2) as modifier, coalesce(sum(value),0) as value from statAdjustments where characterSheetId = ${characterSheetId} and stat = '${stat}'`,
		schema: Schema.Struct({
			value: Schema.Number,
			modifier: Schema.Number,
		}).pipe(Schema.Array, Schema.headOrElse()),
	});
