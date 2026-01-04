import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
			<div className="flex flex-col gap-12 items-center justify-center min-h-screen p-8">
				<header className="text-center">
					<h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
						ポケメモリア
					</h1>
					<p className="text-xl text-gray-600 mb-2">ポケモン履歴書作成ツール</p>
					<p className="text-gray-500">
						あなたのポケモンとの思い出を素敵な履歴書にまとめよう
					</p>
				</header>

				<main className="flex flex-col gap-8 items-center max-w-4xl w-full">
					<div className="bg-white rounded-3xl shadow-2xl p-12 w-full text-center">
						<h2 className="text-3xl font-bold mb-6">4つのステップで完成</h2>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
							<div className="p-6">
								<div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
									1
								</div>
								<h3 className="font-bold mb-2">原点</h3>
								<p className="text-sm text-gray-600">最初の冒険を選択</p>
							</div>
							<div className="p-6">
								<div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
									2
								</div>
								<h3 className="font-bold mb-2">軌跡</h3>
								<p className="text-sm text-gray-600">プレイ作品を記録</p>
							</div>
							<div className="p-6">
								<div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
									3
								</div>
								<h3 className="font-bold mb-2">相棒</h3>
								<p className="text-sm text-gray-600">思い出の6匹を選択</p>
							</div>
							<div className="p-6">
								<div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
									4
								</div>
								<h3 className="font-bold mb-2">完成</h3>
								<p className="text-sm text-gray-600">自己紹介を入力</p>
							</div>
						</div>
						<Link href="/create">
							<button
								type="button"
								className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white px-12 py-6 text-xl rounded-full shadow-xl transition-opacity"
							>
								履歴書を作成する
							</button>
						</Link>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
						<div className="bg-white rounded-2xl p-6 shadow-lg">
							<div className="text-4xl mb-4">📝</div>
							<h3 className="font-bold mb-2">簡単入力</h3>
							<p className="text-sm text-gray-600">
								ステップバイステップで迷わず作成できます
							</p>
						</div>
						<div className="bg-white rounded-2xl p-6 shadow-lg">
							<div className="text-4xl mb-4">🎨</div>
							<h3 className="font-bold mb-2">美しいデザイン</h3>
							<p className="text-sm text-gray-600">
								シェアしたくなる素敵な履歴書が完成します
							</p>
						</div>
						<div className="bg-white rounded-2xl p-6 shadow-lg">
							<div className="text-4xl mb-4">📱</div>
							<h3 className="font-bold mb-2">簡単共有</h3>
							<p className="text-sm text-gray-600">
								SNSで友達と思い出をシェアしましょう
							</p>
						</div>
					</div>
				</main>

				<footer className="text-center text-sm text-gray-500">
					<p>Next.js 16 + React 19 + Tailwind CSS 4</p>
				</footer>
			</div>
		</div>
	);
}
