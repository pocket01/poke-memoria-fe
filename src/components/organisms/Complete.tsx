"use client";

import { pdf } from "@react-pdf/renderer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PokemonList } from "@/api/pokemon/type";
import { useMemoriesStore } from "@/stores/memoriesStore";
import { Button } from "../atoms/button";
import { ResumePDF } from "./ResumePDF";

type Props = {
	pokemons: PokemonList;
};

function Complete({ pokemons }: Props) {
	const router = useRouter();
	const { memories } = useMemoriesStore();
	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

	// 履歴書PDF生成 & 別タブで開く
	const handleGeneratePDF = async () => {
		setIsGeneratingPDF(true);
		try {
			const doc = <ResumePDF memories={memories} pokemons={pokemons} />;
			const asPdf = pdf(doc);
			const blob = await asPdf.toBlob();
			const url = URL.createObjectURL(blob);
			window.open(url, "_blank");
		} catch (error) {
			console.error("Failed to generate PDF:", error);
		} finally {
			setIsGeneratingPDF(false);
		}
	};

	// ホームに戻る
	const handleGoHome = () => {
		router.push("/");
	};

	return (
		<div className="text-center space-y-8">
			<div className="space-y-6 max-w-2xl">
				<div className="bg-[#E3E8EE] rounded-2xl p-8 text-left space-y-4 shadow-md border-2 border-[#B8E3D2]">
					<h2 className="text-2xl font-bold text-[#0A0A0A]">次のステップ</h2>
					<ul className="space-y-3 text-[#4A5565]">
						<li className="flex items-start gap-3">
							<span className="text-[#284CAC] font-bold mt-1">1.</span>
							<span>あなたの履歴書をプレビューできます</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-[#284CAC] font-bold mt-1">2.</span>
							<span>SNSでシェアして、友達と思い出を共有しましょう</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-[#284CAC] font-bold mt-1">3.</span>
							<span>何度でも履歴書を作成・編集できます</span>
						</li>
					</ul>
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<Button
						onClick={handleGeneratePDF}
						disabled={isGeneratingPDF}
						className="flex-1 bg-[#284CAC] text-white font-bold py-4 rounded-2xl hover:bg-[#1E3A7F] transition-all shadow-lg disabled:opacity-50"
					>
						{isGeneratingPDF ? "生成中..." : "履歴書をプレビュー"}
					</Button>
					<Button
						onClick={handleGoHome}
						className="flex-1 bg-[#B8E3D2] text-[#284CAC] font-bold py-4 rounded-2xl hover:bg-[#A8D4C2] transition-all shadow-md"
					>
						ホームに戻る
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Complete;
