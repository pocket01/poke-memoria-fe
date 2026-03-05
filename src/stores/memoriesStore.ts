import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_MEMORIES } from "@/constants/constants";
import type { Memories } from "@/types/schema";

/** Zustandストアの型定義 */
type MemoriesStore = {
	memories: Memories;
	/** localStorageから復旧完了フラグ */
	isHydrated: boolean;
	/** 復旧完了フラグを設定する */
	setHydrated: (value: boolean) => void;
	updateMemories: (partial: Partial<Memories>) => void;
	setOrigin: (titleId: number) => void;
	reset: (value?: Partial<Memories>) => void;
};

/** Zustandストアの作成 */
export const useMemoriesStore = create<MemoriesStore>()(
	persist(
		(set) => ({
			memories: DEFAULT_MEMORIES,
			isHydrated: false,
			setHydrated: (value) => set({ isHydrated: value }),
			updateMemories: (partial) =>
				set((state) => ({
					memories: { ...state.memories, ...partial },
				})),

			setOrigin: (titleId) =>
				set((state) => ({
					memories: { ...state.memories, originTitleId: titleId },
				})),

			reset: (value) => set({ memories: { ...DEFAULT_MEMORIES, ...value } }),
		}),
		{
			name: "poke-memoria-storage",
			onRehydrateStorage: () => (state) => {
				state?.setHydrated(true); // 復旧完了フラグ
			},
		},
	),
);
