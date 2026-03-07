"use client";

import { Pencil } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { PokemonList } from "@/api/pokemon/type";
import { useMemoriesStore } from "@/stores/memoriesStore";
import type { PokemonGenerations } from "@/types/schema";
import { Button } from "../atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";

type CreateRoute = Route<
	| "/create/origin"
	| "/create/history"
	| "/create/partners"
	| "/create/profile"
	| "/create/preview"
	| "/create/complete"
>;

type Props = {
	gens: PokemonGenerations[];
	pokemons: PokemonList;
};

/**
 * プレビュー画面：履歴書の最終確認画面
 * ユーザーが入力した履歴書情報を表示（参照のみ）
 */
function Preview({ gens, pokemons }: Props) {
	const { memories } = useMemoriesStore();
	// const [partnerDetails, setPartnerDetails] = useState<
	// 	({ id: number; name: string; imageUrl: string } | null)[]
	// >([]);
	const myPartners = memories.partners.map((partner) => {
		if (!partner) return null;
		const pokemon = pokemons.find((p) => p.id === partner.pokemonId);
		if (!pokemon) return null;
		return {
			id: pokemon.id,
			name: pokemon.name,
			imageUrl: pokemon.imageUrl,
		};
		// if (!pokemon) {
		// 	console.error(
		// 		`Pokemon with ID ${partner.pokemonId} not found in the list`,
		// 	);
		// 	return null;
		// }
		// return {
		// 	id: pokemon.id,
		// 	name: pokemon.name,
		// 	imageUrl: pokemon.imageUrl,
		// 	height: pokemon.height,
		// 	weight: pokemon.weight,
		// 	types: pokemon.types,
		// } as PokemonDetail;
	});

	const displayPartners = useMemo(() => {
		return memories.partners.map((partner, index) => {
			if (!partner) return null;
			return {
				...myPartners[index],
			};
		});
	}, [memories.partners, myPartners]);

	return (
		<div className="max-w-6xl mx-auto w-full flex-1 flex flex-col gap-8 py-8 px-4">
			{/* ヘッダー：トレーナー情報 */}
			<SectionCard
				title="トレーナー情報"
				editLink="/create/profile"
				highlighted
			>
				<div className="flex flex-col gap-4">
					<div>
						<p className="text-xs font-medium text-gray-600 uppercase tracking-widest">
							トレーナー名
						</p>
						<p className="text-3xl font-bold text-gray-900 mt-2">
							{memories.profile.name || "未設定"}
						</p>
						{/* 自由記述欄の情報 */}
						{memories.profile.freeMessage && (
							<p className="text-gray-700 whitespace-pre-wrap">
								{memories.profile.freeMessage}
							</p>
						)}
					</div>
				</div>
			</SectionCard>

			{/* 軌跡のサマリー */}
			<SectionCard title="プレイ履歴" editLink="/create/history">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<SummaryBadge
						label="はじめて遊んだポケモン"
						value={
							gens.find((g) => g.gen === memories.originTitleId)?.name ||
							"未設定"
						}
					/>
					<SummaryBadge
						label="プレイ作品数"
						value={`${memories.history.length}作品`}
					/>
					<SummaryBadge
						label="相棒ポケモン数"
						value={`${memories.partners.filter((p) => p !== null).length}匹`}
					/>
				</div>
			</SectionCard>

			{/* 相棒ポケモン */}
			{displayPartners.some((p) => p !== null) && (
				<SectionCard title="相棒ポケモン" editLink="/create/partners">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{displayPartners.map((partner) => {
							if (!partner) return null;
							return (
								<PartnerCard
									key={`partner-${partner.id ?? 0}`}
									partner={partner}
								/>
							);
						})}
					</div>
				</SectionCard>
			)}
		</div>
	);
}

/**
 * セクション共通カードコンポーネント
 */
interface SectionCardProps {
	title: string;
	editLink: CreateRoute;
	highlighted?: boolean;
	children: React.ReactNode;
}

function SectionCard({
	title,
	editLink,
	highlighted = false,
	children,
}: SectionCardProps) {
	return (
		<Card
			className={`bg-white ${
				highlighted ? "border-blue-200 neu-raised" : "bg-gray-50 neu-flat"
			}`}
		>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>{title}</CardTitle>
				<Link href={editLink}>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 hover:neu-pressed bg-white"
						title={`${title}を編集`}
					>
						<Pencil className="h-4 w-4 text-gray-600" />
					</Button>
				</Link>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

/**
 * サマリーバッジコンポーネント
 */
interface SummaryBadgeProps {
	label: string;
	value: string;
}

function SummaryBadge({ label, value }: SummaryBadgeProps) {
	return (
		<div className="bg-white rounded-lg p-4 border border-gray-200 neu-flat">
			<p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-1">
				{label}
			</p>
			<p className="text-xl font-bold text-gray-900">{value}</p>
		</div>
	);
}

/**
 * 相棒ポケモンカード
 */
type PartnerCardProps = {
	partner: {
		id?: number;
		name?: string;
		imageUrl?: string;
	} | null;
};

function PartnerCard({ partner }: PartnerCardProps) {
	if (!partner) {
		return (
			<Card className="neu-flat animate-pulse">
				<CardContent className="p-6 h-64 flex items-center justify-center">
					<p className="text-gray-400">ローディング中...</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="neu-flat hover:neu-hover transition-all overflow-hidden">
			<CardContent className="p-6 flex flex-col gap-4">
				{/* ポケモン画像 */}
				<div className="flex justify-center">
					{partner.imageUrl ? (
						<Image
							src={partner.imageUrl}
							alt={partner.name ?? ""}
							width={96}
							height={96}
							className="object-contain"
						/>
					) : (
						<div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
							No Image
						</div>
					)}
				</div>

				{/* ポケモン名と基本情報 */}
				<div className="text-center">
					<h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
					<p className="text-xs text-gray-600">ID: {partner.id}</p>
				</div>

				{/* コメント */}
				{/** @todo コメントは後ほど実装  */}
				{/* {partner.comment && (
					<div className="border-t border-gray-200 pt-3">
						<p className="text-xs font-medium text-gray-600 uppercase tracking-widest mb-1">
							コメント
						</p>
						<p className="text-sm text-gray-700">{partner.comment}</p>
					</div>
				)} */}
			</CardContent>
		</Card>
	);
}

export default Preview;
