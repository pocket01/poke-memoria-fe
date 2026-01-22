"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/formSchema";
import { formSchema } from "@/lib/formSchema";

/**
 * GlobalFormProviderのProps
 */
type GlobalFormProviderProps = PropsWithChildren;

/**
 * グローバルなフォームプロバイダー
 * 全ステップのフォームデータを管理
 */
export function GlobalFormProvider({ children }: GlobalFormProviderProps) {
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			style: null,
			trainerName: null,
			startedYear: null,
			originTitleId: null,
			history: [],
			partners: [],
			tags: [],
			freeMessage: "",
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
