import { create } from "zustand";

/**
 * 共通モーダル一覧
 */
export type ModalType =
	// 情報
	| "info"
	// 確認
	| "confirm"
	// 警告
	| "warning"
	// エラー
	| "error";

/**
 * モーダルストアの型定義
 */
export type ModalStore = {
	// 現在開いているモーダルの種類（未定義の場合はモーダルが開いていない）
	types: ModalType[];
	// 引数で指定したモーダルを開く関数
	openModal: <TModalType extends ModalType>(type: TModalType) => void;
	// 引数で指定したモーダルを閉じる関数
	closeModal: <TModalType extends ModalType>(type: TModalType) => void;
};

/**
 * モーダルストアの実装
 * openModalでモーダルの種類をtypesに追加し、closeModalでtypesから削除する
 */
export const useModalStore = create<ModalStore>((set) => ({
	types: [],
	openModal: (type) => set((state) => ({ types: [...state.types, type] })),
	closeModal: (type) =>
		set((state) => ({ types: state.types.filter((t) => t !== type) })),
}));
