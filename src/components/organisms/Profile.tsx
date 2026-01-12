import { Calendar, Gamepad2, Tag, User } from "lucide-react";

// const tags = [
// 	"#対戦勢",
// 	"#色違い厳選",
// 	"#図鑑コンプ",
// 	"#考察勢",
// 	"#努力値ガチ勢",
// 	"#ストーリー重視",
// 	"#色違い所持",
// 	"#伝説ポケモン好き",
// 	"#御三家派",
// 	"#マイナーポケモン愛好家",
// 	"#ダブルバトル",
// 	"#シングルバトル",
// 	"#ポケモンGO",
// 	"#アニメファン",
// 	"#カードゲーム",
// ];

/**
 * 【プロフィール】 コンポーネント
 * @returns
 */
export async function Profile() {
	// const router = useRouter();
	// const [trainerName, setTrainerName] = useState("サトシ");
	// const [startDate, setStartDate] = useState("1997年4月1日");
	// const [totalTitles, setTotalTitles] = useState("8");
	// const [selectedTags, setSelectedTags] = useState([
	// 	"#対戦勢",
	// 	"#ストーリー重視",
	// ]);
	// const [freeText, setFreeText] = useState(
	// 	"例: ポケモンは幼少期からずっと大好きです。対戦では受けループを使うのが得意で、特にラッキーとハピナスの使い分けにこだわっています。最近はポケモンカードも始めました！",
	// );

	// const toggleTag = (tag: string) => {
	// 	if (selectedTags.includes(tag)) {
	// 		setSelectedTags(selectedTags.filter((t) => t !== tag));
	// 	} else {
	// 		setSelectedTags([...selectedTags, tag]);
	// 	}
	// };

	// const handleComplete = () => {
	// 	router.push("/create/preview");
	// };

	return (
		<div className="min-h-screen flex flex-col">
			{/* メインコンテンツ */}
			<main className="flex-1 px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-normal mb-4">履歴書の仕上げ</h2>
						<p className="text-gray-600">あなた自身について教えてください</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* 左側：入力フォーム */}
						<div className="lg:col-span-2 space-y-8">
							{/* トレーナー名 */}
							<div className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-lg">
								<div className="flex items-center gap-2 mb-3">
									<User size={20} className="text-red-500" />
									<span className="font-bold">トレーナー名</span>
									<span className="text-xs text-red-500">*必須</span>
								</div>
								<input
									type="text"
									// value={trainerName}
									// onChange={(e) => setTrainerName(e.target.value)}
									className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:border-pink-500"
								/>
							</div>

							{/* 旅を始めた年 */}
							<div className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-lg">
								<div className="flex items-center gap-2 mb-3">
									<Calendar size={20} className="text-yellow-500" />
									<span className="font-bold">旅を始めた年</span>
								</div>
								<input
									type="text"
									// value={startDate}
									// onChange={(e) => setStartDate(e.target.value)}
									className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:border-pink-500"
								/>
							</div>

							{/* 通算プレイ作品数 */}
							<div className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-lg">
								<div className="flex items-center gap-2 mb-3">
									<Gamepad2 size={20} className="text-blue-500" />
									<span className="font-bold">通算プレイ作品数</span>
								</div>
								<input
									type="number"
									// value={totalTitles}
									// onChange={(e) => setTotalTitles(e.target.value)}
									className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:border-pink-500"
								/>
							</div>

							{/* タグ選択 */}
							<div className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-lg">
								<div className="flex items-center gap-2 mb-3">
									<Tag size={20} className="text-purple-500" />
									<span className="font-bold">あなたのタグ</span>
									<span className="text-xs text-gray-500">（複数選択可）</span>
								</div>
								<div className="flex flex-wrap gap-2 mb-4">
									{/* {tags.map((tag) => (
										<button
											type="button"
											key={tag}
											onClick={() => toggleTag(tag)}
											className={`px-4 py-2 rounded-full text-sm transition-all ${
												selectedTags.includes(tag)
													? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
													: "bg-gray-200 text-gray-700 hover:bg-gray-300"
											}`}
										>
											{tag}
										</button>
									))} */}
								</div>
								<div className="bg-purple-50 rounded-lg p-3">
									<p className="text-sm text-purple-800">
										{/* {selectedTags.length} */}
										個のタグを選択中
									</p>
								</div>
							</div>

							{/* 自由記述 */}
							<div className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-lg">
								<div className="mb-3">
									<span className="font-bold block mb-1">自由記述</span>
									<p className="text-xs text-gray-500">
										ポケモンへの思いや、その他の趣味などを自由に書いてください
									</p>
								</div>
								<textarea
									// value={freeText}
									// onChange={(e) => setFreeText(e.target.value)}
									className="w-full border-2 border-gray-300 rounded-xl p-3 resize-none h-32 focus:outline-none focus:border-pink-500"
								/>
								<p className="text-xs text-gray-500 text-right mt-2">
									{/* {freeText.length} */}
									文字
								</p>
							</div>

							{/* プレビューボタン */}
							<div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 shadow-xl">
								<button type="button" className="w-full text-center">
									<span className="text-white font-bold text-lg block mb-2">
										プレビュー
									</span>
									<div className="bg-white/20 rounded-xl p-4">
										{/* <p className="text-white font-bold mb-2">{trainerName}</p> */}
										<p className="text-white text-sm">
											{/* 🗓️ {startDate} */}
											から冒険開始
										</p>
										<p className="text-white text-sm">
											🎮{/* {totalTitles} */}
											作品プレイ済み
										</p>
										<div className="flex gap-2 mt-2 justify-center flex-wrap">
											{/* {selectedTags.slice(0, 2).map((tag) => (
												<span
													key={tag}
													className="bg-white/40 text-white text-xs px-3 py-1 rounded-full"
												>
													{tag}
												</span>
											))} */}
										</div>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
