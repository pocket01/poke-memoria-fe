"use client";

import { Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
	const router = useRouter();

	return (
		<div className="min-h-screen flex flex-col">
			{/* ヘッダー */}
			<header className="bg-white border-b-2 border-red-400 shadow-sm px-6 py-6">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
							ポケメモリア
						</h1>
						<p className="text-sm text-gray-600 mt-1">
							ポケモン履歴書作成ツール
						</p>
					</div>
					<div className="flex gap-3">
						<button
							type="button"
							className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
						>
							<Share2 size={20} />
							<span>シェア</span>
						</button>
						<button
							type="button"
							className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
						>
							<Download size={20} />
							<span>保存</span>
						</button>
					</div>
				</div>
			</header>

			{/* メインコンテンツ */}
			<main className="flex-1 px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-8">
						<h2 className="text-4xl font-bold mb-4">🎉 完成しました！ 🎉</h2>
						<p className="text-gray-600">
							あなたのポケモン履歴書が完成しました
						</p>
					</div>

					{/* プレビューカード */}
					<div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
						<div className="text-center mb-8">
							<div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-600 rounded-full mx-auto mb-4 shadow-lg"></div>
							<h3 className="text-3xl font-bold mb-2">サトシ</h3>
							<p className="text-gray-600">のポケモン履歴書</p>
						</div>

						<div className="space-y-4 mb-8">
							<div className="flex items-center gap-3 text-lg">
								<span>🗓️</span>
								<span>1997年4月1日から冒険開始</span>
							</div>
							<div className="flex items-center gap-3 text-lg">
								<span>🎮</span>
								<span>8作品プレイ済み</span>
							</div>
							<div className="flex flex-wrap gap-2 mt-4">
								<span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
									#対戦勢
								</span>
								<span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
									#ストーリー重視
								</span>
							</div>
						</div>

						<div className="border-t pt-8">
							<h4 className="font-bold mb-4">思い出の相棒たち</h4>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{["ピカチュウ", "リザードン", "イーブイ"].map((pokemon) => (
									<div
										key={pokemon}
										className="bg-gray-50 rounded-xl p-4 text-center"
									>
										<div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-2"></div>
										<p className="font-bold">{pokemon}</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* アクション */}
					<div className="flex gap-4 justify-center">
						<button
							type="button"
							onClick={() => router.push("/create/identity")}
							className="px-8 py-4 bg-gray-200 rounded-xl text-gray-700 hover:bg-gray-300 transition-colors"
						>
							編集する
						</button>
						<button
							type="button"
							onClick={() => router.push("/")}
							className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity"
						>
							トップに戻る
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
