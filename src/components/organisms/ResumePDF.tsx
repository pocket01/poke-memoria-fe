import {
	Document,
	Font,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import type { PokemonList } from "@/api/pokemon/type";
import { POKEMON_TITLES } from "@/constants/constants";
import type {
	Memories,
	PartnerPokemon,
	TitleHistory,
	TrainerProfile,
} from "@/types/schema";
import { PokemonArrowBorder } from "../pdf/atoms/PokemonArrowBorder";
import { PokemonNameBorder } from "../pdf/atoms/PokemonNameBorder";
import { PokemonBorderContainer } from "../pdf/molecules/PokemonBorderContainer";

/**
 * フォント登録
 */
// 改行時に挿入される文字を空文字にする
Font.registerHyphenationCallback((word) =>
	Array.from(word).flatMap((char) => [char, ""]),
);
// ポケモンフォント
const PkmnFont = {
	family: "Pkmn",
	src: "/fonts/PkmnFont/pkmn_s.ttf",
} as const;
Font.register(PkmnFont);
// NotoSans JP（日本語フォント）
const NotoSansJPFont = {
	family: "NotoSansJP",
	src: "/fonts/Noto_Sans_JP/static/NotoSansJP-Regular.ttf",
} as const;
Font.register(NotoSansJPFont);
type Props = {
	memories: Memories;
	pokemons: PokemonList;
};

const styles = StyleSheet.create({
	page: {
		padding: 10,
		fontFamily: PkmnFont.family,
		backgroundColor: "#FFFFFF",
		fontSize: 11,
	},
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
	},
	/* タイトル */
	titleContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
	},
	title: {
		fontSize: 16,
		fontWeight: 700,
		color: "#000000",
		textAlign: "right",
	},
});

/**
 * PDF用履歴書コンポーネント
 * Memories データを PDF レイアウトに変換
 */
export function ResumePDF({ memories, pokemons }: Props) {
	// 世代別のゲーム履歴を整理
	const historyByGeneration = new Map<number, typeof memories.history>();
	memories.history?.forEach((item) => {
		const title = POKEMON_TITLES.find((t) => t.id === item.titleId);
		if (title) {
			if (!historyByGeneration.has(title.generation)) {
				historyByGeneration.set(title.generation, []);
			}
			historyByGeneration.get(title.generation)?.push(item);
		}
	});

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.container}>
					{/* タイトル */}
					<View style={styles.titleContainer}>
						<Text style={styles.title}>ポケモンりれきしょ</Text>
					</View>

					{/* トレーナープロフィールセクション */}
					<TrainerProfileSection
						profile={memories.profile}
						/** @todo 型要確認 */
						partners={memories.partners.map((partner) => ({
							...partner,
							pokemonId: partner?.pokemonId ?? -1,
							comment: partner?.comment ?? "",
							name:
								pokemons.find((p) => p.id === partner?.pokemonId)?.name ?? "",
						}))}
						pokemons={pokemons}
					/>

					{/* レポートセクション */}
					<ReportSection histories={memories.history} />
				</View>
			</Page>
		</Document>
	);
}

/**
 * トレーナープロフィールセクション
 * - トレーナー名
 * - 相棒ポケモン（最大6匹）
 * - トレーナーアイコン
 */
const trainerProfileStyles = StyleSheet.create({
	// コンテナ
	container: {
		flexDirection: "column",
		gap: 4,
		width: "95%",
		padding: 8,
	},
	name: {
		fontFamily: NotoSansJPFont.family,
	},
	freeMessage: {
		maxWidth: "150pt",
	},
	freeMessageText: {
		fontFamily: NotoSansJPFont.family,
	},
	partnersSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},
	pokemonContainer: {
		flexBasis: "16%",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	pokemon: {
		width: 64,
		height: 64,
	},
	pokemonName: {
		marginBottom: 8,
	},
});

type TrainerProfileSectionProps = {
	profile: TrainerProfile;
	partners: (({ name: string } & PartnerPokemon) | null)[];
	pokemons: PokemonList;
};
const TrainerProfileSection = ({
	profile,
	partners,
	pokemons,
}: TrainerProfileSectionProps) => (
	<View style={trainerProfileStyles.container}>
		{/* トレーナープロフィール */}
		<PokemonBorderContainer
			title="きみのプロフィール"
			borderProps={{ width: "3xl", height: 8 }}
			containtsStyle={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<PokemonNameBorder
				maxLength={10}
				name={profile.name}
				nameStyle={trainerProfileStyles.name}
			/>
			<View style={trainerProfileStyles.freeMessage}>
				{profile.freeMessage && (
					<Text style={trainerProfileStyles.freeMessageText}>
						{profile.freeMessage}
					</Text>
				)}
			</View>
			{/** @todo ユーザアイコン。いったん仮表示。 */}
			<Image source="/icon.jpg" style={{ width: 64, height: 64 }} />
		</PokemonBorderContainer>

		{/* 相棒ポケモン */}
		<PokemonBorderContainer
			title="きみのパートナー"
			borderProps={{ width: "3xl", height: 10 }}
			containtsStyle={trainerProfileStyles.partnersSection}
		>
			{Array.from({ length: 6 }).map((_, index) => {
				const partner = partners[index];
				if (!partner) return <Text key={`partner-${index.toString()}`}>@</Text>;
				return (
					<View
						key={`partner-${index.toString()}`}
						style={trainerProfileStyles.pokemonContainer}
					>
						<Image
							source={
								pokemons.find((p) => p.id === partner.pokemonId)?.imageUrl
							}
							style={trainerProfileStyles.pokemon}
						/>
						{/** @todo ポケモンの種族名とニックネームを表示する */}
						<Text style={trainerProfileStyles.pokemonName}>{partner.name}</Text>
						<Text style={trainerProfileStyles.pokemonName}>
							{partner.comment}
						</Text>
					</View>
				);
			})}
		</PokemonBorderContainer>
	</View>
);

/**
 * レポートセクション
 * - トレーナー名
 * - 相棒ポケモン（最大6匹）
 * - トレーナーアイコン
 */
const reportStyles = StyleSheet.create({
	/* コンテナ */
	container: {
		flexDirection: "column",
		gap: 8,
		padding: 8,
	},
	/** 世代ラベル */
	genLabel: {
		width: "100%",
		fontSize: 12,
		paddingBottom: 4,
	},
	/** タイトルセクション */
	titleSection: {
		flexDirection: "row",
	},
});

type ReportSectionProps = {
	histories: TitleHistory[];
};
const ReportSection = ({ histories }: ReportSectionProps) => (
	<PokemonBorderContainer
		title="きみのレポート"
		borderProps={{ width: "3xl", height: 46 }}
	>
		<View style={reportStyles.container}>
			{Array.from({ length: 9 }).map((_, index) => {
				return (
					<View key={`gen-${index + 1}`}>
						<PokemonArrowBorder
							length={39}
							borderText={`GEN ${index + 1}`}
							containerStyle={reportStyles.genLabel}
						/>
						<View style={reportStyles.titleSection}>
							{histories.map((history) => {
								if (`gen${index + 1}` === history.titleId.split("-")[0]) {
									return (
										<Text key={`history-${history.titleId}`}>
											{`${POKEMON_TITLES.find((t) => t.id === history.titleId)?.name} `}
										</Text>
									);
								}
								return null;
							})}
						</View>
					</View>
				);
			})}
		</View>
	</PokemonBorderContainer>
);
