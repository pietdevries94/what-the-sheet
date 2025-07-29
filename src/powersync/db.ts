import { PowerSyncDatabase } from "@powersync/web";
import { wrapPowerSyncWithKysely } from "@powersync/kysely-driver";
import { AppSchema } from "./AppSchema";
import type { Database } from "./AppSchema";

export const powerSyncDb = new PowerSyncDatabase({
	// The schema you defined in the previous step
	schema: AppSchema,
	database: {
		dbFilename: "what-the-sheet.db",
	},
});
powerSyncDb.init();

export const db = wrapPowerSyncWithKysely<Database>(powerSyncDb);
