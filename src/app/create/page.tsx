"use client";

import Link from "next/link";
import { Card } from "@/components/atoms/card";

export default function CreateIntroPage() {
	return (
		<div className="flex-1 flex items-center justify-center min-h-screen p-8">
			<div className="w-full max-w-5xl grid grid-cols-2 gap-8">
				{/* 左側：2つのカード */}
				<div className="flex flex-col gap-6">
					{/* さいしょからはじめる */}
					<Link href="/create/origin" className="block">
						<Card className="bg-[#E3E8EE] neo-flat hover:neo-hover transition-all cursor-pointer">
							<div className="flex items-center justify-between gap-6 px-6 py-5">
								<div className="flex flex-col gap-0.5">
									<h2 className="text-2xl font-medium text-[#212D47]">
										さいしょからはじめる
									</h2>
									<p className="text-xs font-normal text-[#999CAA]">
										New Journey
									</p>
								</div>
								<div className="w-8 h-8 rounded-full bg-[#284CAC] flex-shrink-0 shadow-md" />
							</div>
						</Card>
					</Link>

					{/* つづきからはじめる */}
					<Link href="/create/history" className="block">
						<Card className="bg-[#E3E8EE] neo-flat hover:neo-hover transition-all cursor-pointer">
							<div className="flex items-center justify-between gap-6 px-6 py-5">
								<div className="flex flex-col gap-0.5">
									<h2 className="text-2xl font-medium text-[#212D47]">
										つづきからはじめる
									</h2>
									<p className="text-xs font-normal text-[#999CAA]">Continue</p>
								</div>
								<div className="flex items-center justify-center px-3 h-7 rounded-full bg-blue-50 flex-shrink-0">
									<span className="text-xs font-medium text-[#284CAC]">
										Step 2/6
									</span>
								</div>
							</div>
						</Card>
					</Link>
				</div>

				{/* 右側：SAVE DATA */}
				<div>
					<Card className="bg-[#E3E8EE] neo-flat">
						<div className="px-6 py-6">
							<h3 className="text-xs font-medium text-[#999CAA] uppercase tracking-widest mb-5">
								SAVE DATA
							</h3>

							<div className="flex flex-col gap-3">
								{/* しゅじんこう */}
								<div className="flex items-center justify-between">
									<span className="text-xs font-normal text-[#999CAA]">
										しゅじんこう
									</span>
									<span className="text-sm font-normal text-[#212D47]">
										しゅじんこう
									</span>
								</div>

								{/* 区切り線 */}
								<div className="h-px bg-gradient-to-r from-[#D4D9E3] to-transparent" />

								{/* もっているバッジ */}
								<div className="space-y-1.5">
									<span className="text-xs font-normal text-[#999CAA]">
										もっているバッジ
									</span>
									<div className="flex gap-0.5">
										{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
											<div
												key={i}
												className={`w-2.5 h-2.5 rounded-full ${
													i <= 3 ? "bg-[#284CAC] shadow-sm" : "bg-[#D4D9E3]"
												}`}
											/>
										))}
									</div>
								</div>

								{/* 区切り線 */}
								<div className="h-px bg-gradient-to-r from-[#D4D9E3] to-transparent" />

								{/* ポケモンずかん */}
								<div className="flex items-center justify-between">
									<span className="text-xs font-normal text-[#999CAA]">
										ポケモンずかん
									</span>
									<span className="text-sm font-normal text-[#212D47]">
										42ひき
									</span>
								</div>

								{/* 区切り線 */}
								<div className="h-px bg-gradient-to-r from-[#D4D9E3] to-transparent" />

								{/* プレイじかん */}
								<div className="flex items-center justify-between">
									<span className="text-xs font-normal text-[#999CAA]">
										プレイじかん
									</span>
									<span className="text-sm font-normal text-[#212D47]">
										8:22
									</span>
								</div>

								{/* フッター */}
								<div className="flex items-center justify-center gap-1.5 mt-3 opacity-50">
									<div className="w-1 h-1 rounded-full bg-[#284CAC]" />
									<span className="text-xs font-normal text-[#999CAA] uppercase tracking-widest">
										POKEMEMORIA
									</span>
									<div className="w-1 h-1 rounded-full bg-[#284CAC]" />
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
