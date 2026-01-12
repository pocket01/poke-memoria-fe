import type { PokemonGenerations } from "@/types/schema";
import { Button } from "../atoms/button";

type Props = { data: PokemonGenerations[] };

/**
 * 【原点】コンポーネント
 * @param props.data 世代データ配列
 * @returns JSX.Element
 */
export default function Origin({ data }: Props) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{data.map((gen) => (
				<Button type="button" key={gen.id}>
					<div className="flex flex-col items-center gap-4">
						<div
							className="w-16 h-16 rounded-full flex items-center justify-center"
							style={{ backgroundColor: gen.bgColor }}
						/>
						<div className="text-center">
							<h3 className="text-lg font-bold mb-1">{gen.name}</h3>
							<p className="text-sm text-[#4A5565]">{gen.generation}</p>
							<p className="text-xs text-[#6A7282] mt-1">{gen.year}</p>
						</div>
					</div>
				</Button>
			))}
		</div>
	);
}
