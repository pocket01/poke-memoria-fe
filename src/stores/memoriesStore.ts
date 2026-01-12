import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_MEMORIES } from "@/constants/constants";
import type { Memories } from "@/types/schema";

/** Zustandストアの型定義 */
type MemoriesStore = {
	memories: Memories;
	updateMemories: (partial: Partial<Memories>) => void;
	setOrigin: (titleId: string) => void;
	reset: () => void;
};

/** Zustandストアの作成 */
export const useMemoriesStore = create<MemoriesStore>()(
	persist(
		(set) => ({
			memories: DEFAULT_MEMORIES,

			updateMemories: (partial) =>
				set((state) => ({
					memories: { ...state.memories, ...partial },
				})),

			setOrigin: (titleId) =>
				set((state) => ({
					memories: { ...state.memories, originTitleId: titleId },
				})),

			reset: () => set({ memories: DEFAULT_MEMORIES }),
		}),
		{
			name: "poke-memoria-storage",
		},
	),
);
