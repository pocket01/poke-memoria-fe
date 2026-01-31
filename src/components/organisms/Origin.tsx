"use client";
import { useWatch } from "react-hook-form";
import { GenerationCard } from "@/components/molecules/GenerationCard";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import type { PokemonGenerations } from "@/types/schema";

type Props = {
	// 世代データ配列
	data: PokemonGenerations[];
};

/**
 * 【原点】コンポーネント
 * ポケモンの最初の冒険を選択する画面
 * @param props Props
 * @returns JSX.Element
 */
export default function Origin({ data }: Props) {
	// グローバルフォームの状態を取得
	const { setValue, control } = useGlobalForm();
	const selectedGame =
		useWatch({
			control,
			name: "originTitleId",
			defaultValue: null,
		}) ?? 0;

	// 世代選択時のハンドラ
	const onSelectGeneration = (gen: number) => {
		setValue("originTitleId", gen, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	return (
		<div className="max-w-6xl mx-auto w-full flex-1">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((gen) => (
					<GenerationCard
						key={gen.gen}
						gen={gen.gen}
						name={gen.name}
						generation={gen.generation}
						year={gen.year}
						selected={selectedGame === gen.gen}
						onClick={onSelectGeneration}
					/>
				))}
			</div>
		</div>
	);
}
