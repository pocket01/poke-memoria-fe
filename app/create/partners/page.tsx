"use client";

import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Partner {
	id: number;
	name: string;
	memory: string;
}

export default function PartnersPage() {
	const router = useRouter();
	const [partners, setPartners] = useState<Partner[]>([
		{ id: 1, name: "ピカチュウ", memory: "" },
		{ id: 2, name: "リザードン", memory: "" },
		{ id: 3, name: "イーブイ", memory: "" },
	]);

	const addPartner = () => {
		if (partners.length < 6) {
			setPartners([...partners, { id: Date.now(), name: "", memory: "" }]);
		}
	};

	const removePartner = (id: number) => {
		setPartners(partners.filter((p) => p.id !== id));
	};

	const updatePartner = (
		id: number,
		field: "name" | "memory",
		value: string,
	) => {
		setPartners(
			partners.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
		);
	};

	const handleNext = () => {
		router.push("/create/identity");
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* ヘッダー */}
			<header className="bg-white border-b-2 border-red-400 shadow-sm px-6 py-6">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
						ポケメモリア
					</h1>
					<p className="text-sm text-gray-600 mt-1">ポケモン履歴書作成ツール</p>
				</div>
			</header>

			{/* プログレスバー */}
			<div className="bg-white px-6 py-4">
				<div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-red-500 shadow-lg flex items-center justify-center text-white">
							✓
						</div>
						<span className="text-sm text-gray-600">原点</span>
					</div>
					<div className="w-32 h-1 bg-red-500"></div>
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-red-500 shadow-lg flex items-center justify-center text-white">
							✓
						</div>
						<span className="text-sm text-gray-600">軌跡</span>
					</div>
					<div className="w-32 h-1 bg-red-500"></div>
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center text-red-600 font-bold">
							3
						</div>
						<span className="font-bold text-sm">相棒</span>
					</div>
					<div className="w-32 h-1 bg-gray-300"></div>
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
							4
						</div>
						<span className="text-sm text-gray-600">完成</span>
					</div>
				</div>
			</div>

			{/* メインコンテンツ */}
			<main className="flex-1 px-4 py-8">
				<div className="max-w-5xl mx-auto">
					<div className="mb-8">
						<h2 className="text-4xl font-normal mb-2 text-center">
							手持ちの6匹
						</h2>
						<p className="text-gray-600 text-center mb-6">
							あなたの最高の相棒たちを選んでください
						</p>
						<div className="bg-green-50 rounded-full py-3 px-6 inline-flex items-center gap-3 mx-auto block w-fit">
							<span className="text-2xl font-bold text-green-600">
								{partners.length}
							</span>
							<span className="text-gray-600">/ 6匹</span>
						</div>
					</div>

					{/* パートナーリスト */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{partners.map((partner) => (
							<div
								key={partner.id}
								className="bg-white border-4 border-pink-400 rounded-2xl p-6 shadow-lg relative"
							>
								<button
									type="button"
									onClick={() => removePartner(partner.id)}
									className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
								>
									<X size={16} />
								</button>
								<div className="flex flex-col items-center gap-4 mb-4">
									<div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg"></div>
									<input
										type="text"
										value={partner.name}
										onChange={(e) =>
											updatePartner(partner.id, "name", e.target.value)
										}
										placeholder="ポケモン名"
										className="text-xl font-bold text-center w-full bg-transparent border-b-2 border-gray-300 focus:border-pink-500 outline-none py-1"
									/>
								</div>
								<textarea
									value={partner.memory}
									onChange={(e) =>
										updatePartner(partner.id, "memory", e.target.value)
									}
									placeholder="思い出を記入..."
									className="w-full bg-gray-100 rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-pink-500"
								/>
							</div>
						))}

						{/* 追加ボタン */}
						{partners.length < 6 && (
							<button
								type="button"
								onClick={addPartner}
								className="bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-dashed border-gray-400 rounded-2xl p-6 hover:border-gray-500 transition-colors flex flex-col items-center justify-center gap-4 min-h-[300px]"
							>
								<div className="w-20 h-20 border-4 border-dashed border-gray-400 rounded-full flex items-center justify-center">
									<Plus size={32} className="text-gray-500" />
								</div>
								<div className="text-center">
									<p className="text-gray-500">
										スロット {partners.length + 1}
									</p>
									<p className="text-sm text-gray-600 mt-1">クリックして追加</p>
								</div>
							</button>
						)}
					</div>
				</div>
			</main>

			{/* フッター */}
			<footer className="bg-white border-t-2 border-gray-300 shadow-lg px-6 py-6">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<button
						type="button"
						onClick={() => router.back()}
						className="px-6 py-3 bg-gray-300 rounded-xl flex items-center gap-2 text-gray-700 hover:bg-gray-400 transition-colors"
					>
						<ChevronLeft size={20} />
						<span>戻る</span>
					</button>
					<p className="text-sm text-gray-600">ステップ 3 / 4</p>
					<button
						type="button"
						onClick={handleNext}
						className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
					>
						<span>次へ</span>
						<ChevronRight size={20} />
					</button>
				</div>
			</footer>
		</div>
	);
}
