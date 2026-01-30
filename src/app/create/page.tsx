"use client";

import Link from "next/link";

export default function CreateIntroPage() {
	return (
		<div className="flex-1 flex items-center justify-center p-8">
			<div className="max-w-2xl w-full text-center">
				<h1 className="text-5xl font-bold mb-6 text-[#0A0A0A]">ポケメモリア</h1>
				<p className="text-xl text-[#4A5565] mb-8">ポケモン履歴書作成ツール</p>
				<p className="text-lg text-[#4A5565] mb-16 leading-relaxed">
					あなたのポケモンとの思い出を
					<br />
					素敵な履歴書にまとめましょう
				</p>
				<Link
					href="/create/origin"
					className="inline-block px-12 py-4 bg-[#284CAC] text-white rounded-3xl font-bold hover:bg-[#1E3A7F] transition-colors shadow-lg"
				>
					はじめる
				</Link>
			</div>
		</div>
	);
}
