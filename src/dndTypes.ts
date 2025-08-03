export const dndStats = [
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
] as const;

export type DndStat = (typeof dndStats)[number];
