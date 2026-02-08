import { create } from "zustand";

// モーダルの種類を定義
export type ModalType =
	// ポケモン選択モーダル
	"pokemonSelect";
/** @todo 以下は今後追加予定 */
// 	// 確認モーダル
// | "confirm"
// // 警告モーダル
// | "warning"

/**
 * モーダルストアの型定義
 */
export type ModalStore<
	TModalType extends ModalType,
	TData = TModalType extends "pokemonSelect"
		? {
				slot: 1 | 2 | 3 | 4 | 5 | 6;
			}
		: unknown,
> = {
	// モーダルタイプ
	type?: ModalType;
	// モーダルの開閉状態
	isOpen: boolean;
	// モーダルに渡すデータ
	data?: TData;
	// モーダルを開く関数
	openModal: (type: ModalType, data?: TData) => void;
	// モーダルを閉じる関数
	closeModal: () => void;
	// モーダルの送信関数
	submitModal?: (data: TData) => void;
};

/**
 * モーダルストアの作成
 * @returns
 */
export const useModalStore = create<ModalStore<ModalType>>((set) => ({
	type: undefined,
	isOpen: false,
	openModal: (type, data) => set({ isOpen: true, type, data }),
	closeModal: () => set({ isOpen: false, type: undefined, data: undefined }),
}));
