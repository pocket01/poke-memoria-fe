"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { DEFAULT_MEMORIES } from "@/constants/constants";
import type { FormData } from "@/lib/formSchema";
import { formSchema } from "@/lib/formSchema";
import { useMemoriesStore } from "@/stores/memoriesStore";

/**
 * GlobalFormProviderのProps
 */
type GlobalFormProviderProps = PropsWithChildren;

/**
 * グローバルなフォームプロバイダー
 * 全ステップのフォームデータを管理
 */
export function GlobalFormProvider({ children }: GlobalFormProviderProps) {
	const { memories } = useMemoriesStore();

	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originTitleId: memories.originTitleId ?? DEFAULT_MEMORIES.originTitleId,
			history: memories.history ?? DEFAULT_MEMORIES.history,
			partners: memories.partners ?? DEFAULT_MEMORIES.partners,
			profile: memories.profile ?? DEFAULT_MEMORIES.profile,
		},
		mode: "onChange",
	});

	/** @todo SSRとの同期問題解決は後ほど要検討 */
	// ローカルストレージからの復旧が完了したタイミングでフォームの状態を更新する
	// useEffect(() => {
	// 	if (isHydrated) {
	// 		methods.reset({
	// 			originTitleId: memories.originTitleId ?? DEFAULT_MEMORIES.originTitleId,
	// 			history: memories.history ?? DEFAULT_MEMORIES.history,
	// 			partners: memories.partners ?? DEFAULT_MEMORIES.partners,
	// 			profile: memories.profile ?? DEFAULT_MEMORIES.profile,
	// 		});
	// 	}
	// }, [isHydrated, methods.reset, memories]);

	return <FormProvider {...methods}>{children}</FormProvider>;
}

/**
 * 型安全なuseFormContextのカスタムフック
 */
export function useGlobalForm() {
	return useFormContext<FormData>();
}
