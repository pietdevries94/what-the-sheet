import { useQuery } from "@powersync/tanstack-react-query";
import { useContext } from "react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type React from "react";
import { db } from "@/powersync/db";

const StatBlock: React.FC<{ label: string; value: number | null }> = ({
	label,
	value,
}) => {
	const modifier = value ? Math.floor((value - 10) / 2) : undefined;
	return (
		<div className="flex flex-col items-center justify-center relative py-2">
			<span className="text-sm tracking-wide text-stone-500 absolute top-0 border-stone-400 bg-background leading-3.5 py-0.5 h-5 text-center w-9 rounded-md border">
				{label}
			</span>
			<span className="flex items-center justify-center w-12 h-14 rounded-md border border-stone-400 text-lg text-stone-600">
				{modifier && modifier >= 0 ? "+" : ""}
				{modifier ?? ""}
			</span>
			<span className="text-sm text-stone-500 absolute bottom-0 bg-background border-stone-400 leading-3.5 py-0.5 h-5 w-6 text-center rounded-md border">
				{value}
			</span>
		</div>
	);
};

export const MainStats: React.FC = () => {
	const id = useContext(CharacterSheetContext);

	const { data, isLoading } = useQuery({
		queryKey: ["mainStats", id],
		query: db
			.selectFrom("characterSheets")
			.select([
				"constitution",
				"dexterity",
				"intelligence",
				"charisma",
				"wisdom",
				"strength",
			])
			.where("id", "=", id),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data || data.length === 0) {
		return <div>No stats available.</div>;
	}

	return (
		<div className="flex flex-col gap-2">
			<StatBlock label="Con" value={data[0].constitution} />
			<StatBlock label="Dex" value={data[0].dexterity} />
			<StatBlock label="Int" value={data[0].intelligence} />
			<StatBlock label="Cha" value={data[0].charisma} />
			<StatBlock label="Wis" value={data[0].wisdom} />
			<StatBlock label="Str" value={data[0].strength} />
		</div>
	);
};
