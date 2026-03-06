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
			padding: 40,
			fontFamily: "NotoSansJP",
			backgroundColor: "#FFFFFF",
		},
		container: {
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
		header: {
			display: "flex",
			flexDirection: "column",
			gap: 8,
			paddingBottom: 15,
			borderBottom: "2pt solid #0A0A0A",
		},
		title: {
			fontSize: 32,
			fontWeight: 900,
			color: "#0A0A0A",
			textAlign: "center",
		},
		trainerName: {
			fontSize: 24,
			fontWeight: 700,
			color: "#284CAC",
			textAlign: "center",
		},
		subtitle: {
			fontSize: 12,
			fontWeight: 600,
			color: "#666666",
			textAlign: "center",
			marginTop: 4,
		},
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
			gap: 12,
		},
		partnerCard: {
			display: "flex",
			flexDirection: "column",
			gap: 6,
			width: "30%",
			padding: 10,
			border: "1pt solid #CCCCCC",
			borderRadius: 4,
		},
		pokemonImage: {
			width: 60,
			height: 60,
			alignSelf: "center",
			marginBottom: 4,
		},
		pokemonName: {
			fontSize: 12,
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
			padding: "2px 6px",
			borderRadius: 2,
			alignSelf: "center",
			marginTop: 2,
		},
		comment: {
			fontSize: 9,
			color: "#444444",
			fontStyle: "italic",
			marginTop: 4,
			textAlign: "center",
		},
		freeMessage: {
			fontSize: 11,
			color: "#0A0A0A",
			lineHeight: 1.6,
			whitespace: "pre-wrap",
			padding: 10,
			backgroundColor: "#F9F9F9",
			borderRadius: 4,
		},
		footer: {
			fontSize: 9,
			color: "#999999",
			textAlign: "center",
			marginTop: 20,
			paddingTop: 10,
			borderTop: "1pt solid #CCCCCC",
		},
	});

	const partnerList = memories.partners.filter((p) => p !== null);

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.container}>
					{/* ヘッダー: トレーナー名 */}
					<View style={styles.header}>
						<Text style={styles.title}>ポケメモリア</Text>
						<Text style={styles.trainerName}>{memories.profile.name}</Text>
						<Text style={styles.subtitle}>ポケモン履歴書</Text>
					</View>

					{/* プレイ履歴サマリー */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>プレイ履歴</Text>
						<View style={styles.row}>
							<View style={styles.badge}>
								<Text style={styles.badgeLabel}>原点作品</Text>
								<Text style={styles.badgeValue}>
									ID: {memories.originTitleId}
								</Text>
							</View>
							<View style={styles.badge}>
								<Text style={styles.badgeLabel}>プレイ作品数</Text>
								<Text style={styles.badgeValue}>
									{memories.history.length}作品
								</Text>
							</View>
							<View style={styles.badge}>
								<Text style={styles.badgeLabel}>相棒ポケモン</Text>
								<Text style={styles.badgeValue}>{partnerList.length}匹</Text>
							</View>
						</View>
					</View>

					{/* 相棒ポケモン */}
					{partnerList.length > 0 && (
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>相棒ポケモン</Text>
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
														detail.sprites.other["official-artwork"]
															.front_default
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
						</View>
					)}

					{/* 自由記述メッセージ */}
					{memories.profile.freeMessage && (
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>フットプリント</Text>
							<Text style={styles.freeMessage}>
								{memories.profile.freeMessage}
							</Text>
						</View>
					)}

					{/* フッター */}
					<View style={styles.footer}>
						<Text>Generated by PokeMemoria</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}
