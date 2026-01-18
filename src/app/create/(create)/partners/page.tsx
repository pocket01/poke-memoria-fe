import Partners, { type Pokemon } from "@/components/organisms/Partners";

// サンプルのポケモンデータ
const popularPokemon = [
	"ピカチュウ",
	"イーブイ",
	"リザードン",
	"ミュウツー",
	"ルカリオ",
	"ゲッコウガ",
	"ニンフィア",
	"ガブリアス",
	"メタグロス",
	"サーナイト",
	"バンギラス",
	"カイリュー",
	"ゲンガー",
	"フシギバナ",
	"カメックス",
	"ジュカイン",
	"バシャーモ",
	"ラグラージ",
	"エンペルト",
	"ゴウカザル",
	"ドダイトス",
	"ゾロアーク",
	"ウルガモス",
	"ギルガルド",
	"ニャオハ",
];

const team: (Pokemon | null)[] = [null, null, null, null, null, null];

export default async function PartnersPage() {
	return <Partners popularPokemon={popularPokemon} defaultTeam={team} />;
}
