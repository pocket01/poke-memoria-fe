"use client";
import type { FC } from "react";
import { GenerationCard } from "@/components/molecules/GenerationCard";
import type { PokemonGenerations } from "@/types/schema";
import PageHeader from "../molecules/PageHeader";

export type OriginProps = {
	/** 世代データ配列 */
	data: PokemonGenerations[];
	/** 選択された世代ID */
	selectedId?: string;
	/** 世代選択時のイベントハンドラ */
	onSelectGeneration?: (id: string) => void;
};

/**
 * 【原点】コンポーネント（Organisms層）
 * ポケモンの最初の冒険を選択する画面
 * @param props OriginProps
 * @returns JSX.Element
 */
const Origin: FC<OriginProps> = ({ data, selectedId, onSelectGeneration }) => {
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
							selected={selectedId === gen.id}
							onClick={onSelectGeneration}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

Origin.displayName = "Origin";

export default Origin;
