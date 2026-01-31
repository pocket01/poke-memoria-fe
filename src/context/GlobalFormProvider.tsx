"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
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
	const memories = useMemoriesStore((state) => state.memories);

	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originTitleId: memories.originTitleId || null,
			history: memories.history,
			style: memories.style || null,
			trainerName: memories.trainerName || null,
			startedYear: memories.startedYear || null,
			partners: memories.partners,
			tags: memories.tags,
			freeMessage: memories.freeMessage,
		},
		mode: "onChange",
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
}

/**
 * 型安全なuseFormContextのカスタムフック
 */
export function useGlobalForm() {
	return useFormContext<FormData>();
}
