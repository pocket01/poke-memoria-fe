import Profile, { type TrainerData } from "@/components/organisms/Profile";

const trainerData: TrainerData = {
	name: "ポケット",
	startYear: "1997",
	totalGames: 42,
	tags: ["#対戦勢", "#ストーリー重視", "#御三家派", "#シングルバトル"],
	freeText: "ポケモンが大好きです！よろしくお願いします。",
};

const availableTags = [
	"#対戦勢",
	"#色違い厳選",
	"#図鑑コンプ",
	"#考察勢",
	"#努力値ガチ勢",
	"#ストーリー重視",
	"#色違い所持",
	"#伝説ポケモン好き",
	"#御三家派",
	"#マイナーポケモン愛好家",
	"#ダブルバトル",
	"#シングルバトル",
	"#ポケモンGO",
	"#アニメファン",
	"#カードゲーム",
];

export default async function ProfilePage() {
	return <Profile data={trainerData} availableTags={availableTags} />;
}
