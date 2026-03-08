import {
	Document,
	Font,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import type { PokemonDetail } from "@/api/pokemon/type";
import type { Memories } from "@/types/schema";

/**
 * Noto Sans JP フォントを登録（日本語対応）
 * ローカルフォントファイルを使用
 */
Font.register({
	family: "NotoSansJP",
	src: "/fonts/Noto_Sans_JP/NotoSansJP-VariableFont_wght.ttf",
});

type ResumePDFProps = {
	memories: Memories;
	partnerDetails: (PokemonDetail | null)[];
};

/**
 * PDF用履歴書コンポーネント
 * Memories データを PDF レイアウトに変換
 */
export function ResumePDF({ memories, partnerDetails }: ResumePDFProps) {
	const styles = StyleSheet.create({
		page: {
			padding: 30,
			fontFamily: "NotoSansJP",
			backgroundColor: "#F5F6F8",
		},
		container: {
			display: "flex",
			flexDirection: "column",
			gap: 16,
		},
		/* ヘッダーセクション */
		basicInfoSection: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			padding: 20,
			backgroundColor: "#FFFFFF",
			borderRadius: 16,
			boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		},
		basicInfoLabel: {
			fontSize: 11,
			fontWeight: 600,
			color: "#999999",
			textTransform: "uppercase",
			letterSpacing: 0.5,
		},
		basicInfoValue: {
			fontSize: 28,
			fontWeight: 700,
			color: "#0A0A0A",
		},
		/* 原点セクション */
		originSection: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			padding: 20,
			backgroundColor: "#FFFFFF",
			borderRadius: 16,
			boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		},
		originLabel: {
			fontSize: 11,
			fontWeight: 600,
			color: "#999999",
			textTransform: "uppercase",
		},
		originValue: {
			fontSize: 16,
			fontWeight: 700,
			color: "#0A0A0A",
		},
		/* 軌跡セクション */
		historySection: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			padding: 20,
			backgroundColor: "#FFFFFF",
			borderRadius: 16,
			boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		},
		historyLabel: {
			fontSize: 11,
			fontWeight: 600,
			color: "#999999",
			textTransform: "uppercase",
		},
		historyTags: {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 8,
		},
		historyTag: {
			padding: "8px 12px",
			backgroundColor: "#F0F4F8",
			borderRadius: 20,
			flexGrow: 0,
		},
		historyTagText: {
			fontSize: 11,
			fontWeight: 600,
			color: "#0A0A0A",
		},
		/* セクション共通 */
		section: {
			display: "flex",
			flexDirection: "column",
			gap: 10,
		},
		sectionTitle: {
			fontSize: 16,
			fontWeight: 700,
			color: "#0A0A0A",
			marginBottom: 8,
			paddingBottom: 4,
			borderBottom: "1pt solid #CCCCCC",
		},
		sectionContent: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
		},
		row: {
			display: "flex",
			flexDirection: "row",
			gap: 16,
			marginBottom: 8,
		},
		badge: {
			display: "flex",
			flexDirection: "column",
			gap: 4,
			padding: "8px 12px",
			backgroundColor: "#F0F4F8",
			borderRadius: 4,
			flex: 1,
		},
		badgeLabel: {
			fontSize: 10,
			fontWeight: 600,
			color: "#666666",
			textTransform: "uppercase",
		},
		badgeValue: {
			fontSize: 14,
			fontWeight: 700,
			color: "#0A0A0A",
		},
		partnerContainer: {
			display: "flex",
			flexDirection: "row",
			wrap: true,
			gap: 16,
			padding: 24,
			backgroundColor: "#FFFFFF",
			borderRadius: 32,
			boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
		},
		partnerCard: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			width: "30%",
			alignItems: "center",
		},
		pokemonImage: {
			width: 80,
			height: 80,
			alignSelf: "center",
			marginBottom: 4,
		},
		pokemonName: {
			fontSize: 13,
			fontWeight: 700,
			color: "#0A0A0A",
			textAlign: "center",
		},
		pokemonStats: {
			fontSize: 9,
			color: "#666666",
			textAlign: "center",
		},
		typeTag: {
			fontSize: 8,
			fontWeight: 600,
			color: "#FFFFFF",
			backgroundColor: "#284CAC",
			padding: "3px 8px",
			borderRadius: 3,
			alignSelf: "center",
			marginTop: 2,
		},
		comment: {
			fontSize: 10,
			color: "#555555",
			fontStyle: "italic",
			marginTop: 4,
			textAlign: "center",
		},
		/* 自由記述セクション */
		freeMessageSection: {
			display: "flex",
			flexDirection: "column",
			gap: 12,
			padding: 20,
			backgroundColor: "#FFFFFF",
			borderRadius: 16,
			boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		},
		freeMessageLabel: {
			fontSize: 11,
			fontWeight: 600,
			color: "#999999",
			opacity: 0.8,
		},
		freeMessage: {
			fontSize: 11,
			color: "#333333",
			lineHeight: 1.6,
			whitespace: "pre-wrap",
		},
	});

	const partnerList = memories.partners.filter((p) => p !== null);

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.container}>
					{/* 基本情報: トレーナー名 */}
					<View style={styles.basicInfoSection}>
						<Text style={styles.basicInfoLabel}>トレーナー名</Text>
						<Text style={styles.basicInfoValue}>{memories.profile.name}</Text>
					</View>

					{/* 原点: 最初のポケモンタイトル */}
					<View style={styles.originSection}>
						<Text style={styles.originLabel}>原点</Text>
						<Text style={styles.originValue}>ポケットモンスター</Text>
					</View>

					{/* 軌跡: 遊んだ作品 */}
					{memories.history && memories.history.length > 0 && (
						<View style={styles.historySection}>
							<Text style={styles.historyLabel}>軌跡（遊んだ作品）</Text>
							<View style={styles.historyTags}>
								{memories.history.map((item) => (
									<View
										key={`history-${item.titleId}`}
										style={styles.historyTag}
									>
										<Text style={styles.historyTagText}>{item.titleId}</Text>
									</View>
								))}
							</View>
						</View>
					)}

					{/* 相棒ポケモン */}
					{partnerList.length > 0 && (
						<View style={styles.partnerContainer}>
							{memories.partners.map((partner, index) => {
								if (!partner) return null;
								const detail = partnerDetails[index];
								return (
									<View
										key={`partner-${partner.pokemonId}`}
										style={styles.partnerCard}
									>
										{/* ポケモン画像 */}
										{detail?.sprites?.other?.["official-artwork"]
											?.front_default && (
											<Image
												source={
													detail.sprites.other["official-artwork"].front_default
												}
												style={styles.pokemonImage}
											/>
										)}

										{/* ポケモン名 */}
										<Text style={styles.pokemonName}>
											{detail?.name || "不明"}
										</Text>

										{/* ステータス */}
										{detail && (
											<Text style={styles.pokemonStats}>
												H: {detail.height / 10}m | W: {detail.weight / 10}kg
											</Text>
										)}

										{/* タイプ */}
										{detail?.types && detail.types.length > 0 && (
											<Text style={styles.typeTag}>
												{detail.types[0].type.name}
											</Text>
										)}

										{/* コメント */}
										{partner.comment && (
											<Text style={styles.comment}>
												&quot;{partner.comment}&quot;
											</Text>
										)}
									</View>
								);
							})}
						</View>
					)}

					{/* 自由記述メッセージ */}
					{memories.profile.freeMessage && (
						<View style={styles.freeMessageSection}>
							<Text style={styles.freeMessageLabel}>メッセージ</Text>
							<Text style={styles.freeMessage}>
								{memories.profile.freeMessage}
							</Text>
						</View>
					)}
				</View>
			</Page>
		</Document>
	);
}
