import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	output: "standalone",
	experimental: {
		typedRoutes: true,
	},
	// 画面左下のNext.jsアイコンを非表示にする
	devIndicators: false,
};

export default nextConfig;
