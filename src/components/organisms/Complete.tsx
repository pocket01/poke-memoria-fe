import { Button } from "../atoms/button";

function Complete() {
	return (
		<main className="w-full flex-1 flex flex-col items-center justify-center px-6 py-8">
			<div className="text-center space-y-8">
				<div className="space-y-4">
					<div className="text-8xl">🎉</div>
					<h1 className="text-5xl font-bold text-[#284CAC]">完成！</h1>
					<p className="text-xl text-[#4A5565]">
						あなたのポケモン履歴書が完成しました！
					</p>
				</div>

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
						<Button className="flex-1 bg-[#284CAC] text-white font-bold py-4 rounded-2xl hover:bg-[#1E3A7F] transition-all shadow-lg">
							履歴書をプレビュー
						</Button>
						<Button className="flex-1 bg-[#B8E3D2] text-[#284CAC] font-bold py-4 rounded-2xl hover:bg-[#A8D4C2] transition-all shadow-md">
							ホームに戻る
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Complete;
