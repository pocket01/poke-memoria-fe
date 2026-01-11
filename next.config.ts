import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				/**
				 * @TODO ポケモンの画像取得のため一時的に許可
				 */
				protocol: "https",
				hostname: "raw.githubusercontent.com",
			},
		],
	},
	output: "standalone",
	experimental: {
		typedRoutes: true,
	},
};

export default nextConfig;
