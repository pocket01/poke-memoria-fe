"use client";
import { useState } from "react";
import { GenerationCard } from "@/components/molecules/GenerationCard";
import type { PokemonGenerations } from "@/types/schema";
import PageHeader from "../molecules/PageHeader";

type Props = {
	// 世代データ配列
	data: PokemonGenerations[];
	// 選択された世代ID
	selectedId?: string;
};

/**
 * 【原点】コンポーネント
 * ポケモンの最初の冒険を選択する画面
 * @param props Props
 * @returns JSX.Element
 */
function Origin({ data, selectedId }: Props) {
	// 選択された世代IDを管理する状態
	const [selectedGame, setSelectedGame] = useState<string>(selectedId ?? "");

	// 世代選択時のハンドラ
	const onSelectGeneration = (id: string) => {
		setSelectedGame(id);
	};

	return (
		<main className="flex-1 px-4 py-8">
			<div className="max-w-[1024px] mx-auto">
				<PageHeader
					title="あなたの冒険はどこから始まりましたか？"
					description="最初に出会ったポケモンの世界を選択してください"
					className="mb-12"
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{data.map((gen) => (
						<GenerationCard
							key={gen.id}
							id={gen.id}
							name={gen.name}
							generation={gen.generation}
							year={gen.year}
							bgColor={gen.bgColor}
							selected={selectedGame === gen.id}
							onClick={onSelectGeneration}
						/>
					))}
				</div>
			</div>
		</main>
	);
}

Origin.displayName = "Origin";

export default Origin;
