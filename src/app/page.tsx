import Link from "next/link";
import { Button } from "@/components/atoms/button";

export default function Home() {
	// const [mounted, setMounted] = useState(false);

	// useEffect(() => {
	// 	setMounted(true);
	// }, []);

	return (
		<div className="w-full min-h-screen bg-background overflow-hidden">
			{/* スタイル定義 */}
			{/* <style jsx>{`
				@keyframes fadeInDown {
					from {
						opacity: 0;
						transform: translateY(-30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style> */}

			{/* メインコンテンツ */}
			<div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
				{/* ニューモフィズム背景 */}
				<div className="absolute inset-0 neu-bg opacity-30" />

				{/* メインコンテンツ */}
				<div className="relative z-20 flex flex-col items-center justify-center gap-12 p-8 text-center max-w-2xl">
					{/* ヘッダーセクション */}
					<header className="space-y-4">
						<h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wide drop-shadow-lg">
							ポケメモリア
						</h1>
					</header>

					{/* アクションボタン */}
					<div style={{ animationDelay: "0.4s" }}>
						<Link href="/create" className="inline-block">
							<Button
								type="button"
								size="lg"
								className="px-12 text-lg font-semibold"
							>
								START
							</Button>
						</Link>
					</div>
				</div>

				{/* 下部装飾 */}
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
			</div>
		</div>
	);
}
