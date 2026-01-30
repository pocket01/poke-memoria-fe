"use client";

import { usePathname, useRouter } from "next/navigation";
import {
	type ComponentProps,
	type PropsWithChildren,
	useCallback,
	useMemo,
} from "react";
import { CreateSteps } from "@/constants/routes";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { useMemoriesStore } from "@/stores/memoriesStore";
import Stepper from "../molecules/Stepper";
import StepperNavigation from "../molecules/StepperNavigation";

type Props<T> = PropsWithChildren<T>;

/**
 * 履歴書作成ステッパーコンポーネント
 * @returns
 */
export default function CreateStepper<T>({ children }: Props<T>) {
	const path = usePathname();
	const router = useRouter();
	const { trigger, getValues } = useGlobalForm();
	const updateMemories = useMemoriesStore((state) => state.updateMemories);

	const stepperProps = useMemo(() => {
		// ステッパーのpropsを生成
		const stepperProps: ComponentProps<typeof Stepper> = {
			steps: [],
			activeStep: -1,
		};

		CreateSteps.forEach((s, i) => {
			stepperProps.steps.push({ id: i, label: s.label });
			if (s.page === path) {
				stepperProps.activeStep = i;
			}
		});
		return stepperProps;
	}, [path]);

	// 戻るボタンのイベントハンドラ
	const handleBack = useCallback(() => {
		router.push(CreateSteps[stepperProps.activeStep - 1].page);
	}, [router, stepperProps.activeStep]);

	// 戻るボタンの表示可否
	const backVisible = stepperProps.activeStep > 0;

	// 次へボタンのイベントハンドラ
	const handleNext = useCallback(async () => {
		// 現在のページに応じたバリデーション
		let fieldsToValidate: string[] = [];
		const currentPath = CreateSteps[stepperProps.activeStep].page;

		if (currentPath.includes("/origin")) {
			fieldsToValidate = ["originTitleId"];
		}
		// 他のステップのバリデーションは今後追加

		// バリデーション実行
		const isValid =
			fieldsToValidate.length > 0
				? await trigger(
						fieldsToValidate as (keyof import("@/lib/formSchema").FormData)[],
					)
				: true;

		if (isValid) {
			// バリデーション成功時、フォームの値を保存
			const formValues = getValues();
			if (currentPath.includes("/origin") && formValues.originTitleId) {
				updateMemories({
					originTitleId: formValues.originTitleId,
				});
			}
			// 他のステップの保存処理は今後追加

			router.push(CreateSteps[stepperProps.activeStep + 1].page);
		}
	}, [router, stepperProps.activeStep, trigger, getValues, updateMemories]);

	// 次へボタンの表示可否
	const nextVisible = stepperProps.activeStep < stepperProps.steps.length - 1;

	return (
		<>
			<div className="max-w-6xl mx-auto px-4 w-full">
				<Stepper
					steps={stepperProps.steps}
					activeStep={stepperProps.activeStep}
				/>
			</div>
			<div className="flex-1 flex flex-col">{children}</div>
			<div className="max-w-6xl mx-auto px-4 w-full">
				<StepperNavigation
					steps={stepperProps.steps}
					activeStep={stepperProps.activeStep}
					handleBack={handleBack}
					backVisible={backVisible}
					handleNext={handleNext}
					nextVisible={nextVisible}
				/>
			</div>
		</>
	);
}
