import Image from "next/image";
import { Link } from "@/components/ui/link";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center neu-bg">
			<h1 className="text-9xl font-bold text-foreground mb-8">
				ポケメモリア 制作中！
			</h1>
			<div className="neu-flat neu-hover rounded-3xl p-12 transition-all duration-300">
				<div className="space-y-3 text-muted-foreground">
					<p className="text-lg">
						<span className="font-semibold text-foreground">制作：</span>
						ポケット（
						<Link
							className="text-md p-0"
							href="https://x.com/pocket0173"
							target="_blank"
							rel="noopener noreferrer"
						>
							@pocket0173
						</Link>
						）
					</p>
					<div className="flex items-center justify-center text-lg">
						<span className="font-semibold text-foreground">相棒：</span>
						<Image
							src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png"
							alt="ヒノアラシ"
							width={96}
							height={96}
						/>
						<Image
							src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/156.png"
							alt="マグマラシ"
							width={96}
							height={96}
						/>
						<Image
							src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png"
							alt="バクフーン"
							width={96}
							height={96}
						/>
						<Image
							src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
							alt="リザードン"
							width={96}
							height={96}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
