"use client";

import Link from "next/link";

export default function CreateIntroPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-2xl w-full text-center">
				<h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
					ポケメモリア
				</h1>
				<p className="text-gray-600 mb-8">ポケモン履歴書作成ツール</p>
				<p className="text-lg mb-12">
					あなたのポケモンとの思い出を
					<br />
					素敵な履歴書にまとめましょう
				</p>
				<Link
					href="/create/origin"
					className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold hover:opacity-90 transition-opacity"
				>
					はじめる
				</Link>
			</div>
		</div>
	);
}
