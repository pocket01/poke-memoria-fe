"use client";

import { usePathname } from "next/navigation";
import {
	type ComponentProps,
	type PropsWithChildren,
	useCallback,
	useMemo,
} from "react";
import { CreateSteps } from "@/constants/routes";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { useMemoriesStore } from "@/stores/memoriesStore";
import PageHeader from "../molecules/PageHeader";
import Stepper from "../molecules/Stepper";
import StepperNavigation from "../molecules/StepperNavigation";

type Props<T> = PropsWithChildren<T>;

/**
 * 履歴書作成テンプレートコンポーネント
 * @returns
 */
export default function CreateTemplate<T>({ children }: Props<T>) {
	const path = usePathname();
	// const router = useRouter();
	const { trigger, getValues } = useGlobalForm();
	const updateMemories = useMemoriesStore((state) => state.updateMemories);

	/**
	 * ステッパーのpropsを生成
	 */
	const stepperProps = useMemo(() => {
		const stepperProps: ComponentProps<typeof Stepper> = {
			steps: [],
			activeStep: -1,
		};

		CreateSteps.forEach((s, i) => {
			stepperProps.steps.push({ id: i, label: s.label, url: s.page });
			// 現在のパスとステップのページが前方一致する場合、activeStepを設定
			if (path?.startsWith(s.page)) {
				stepperProps.activeStep = i;
			}
		});
		return stepperProps;
	}, [path]);

	// 現在のステップ情報
	const currentStep = CreateSteps[stepperProps.activeStep];

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
			switch (currentPath) {
				case "/create/origin":
					if (formValues.originTitleId)
						updateMemories({
							originTitleId: formValues.originTitleId,
						});
					break;
				case "/create/history":
					updateMemories({
						history: formValues.history,
					});
					break;
				case "/create/partners":
					updateMemories({
						partners: formValues.partners,
					});
					break;
				case "/create/profile":
					updateMemories({
						profile: formValues.profile,
					});
					break;
				default:
					// 他のステップの保存処理は今後追加
					break;
			}

			// router.push(CreateSteps[stepperProps.activeStep + 1].page);
		}
	}, [stepperProps.activeStep, trigger, getValues, updateMemories]);

	// 次へボタンの表示可否
	const nextVisible = stepperProps.activeStep < stepperProps.steps.length - 1;

	return (
		<>
			<Stepper
				steps={stepperProps.steps}
				activeStep={stepperProps.activeStep}
			/>
			<PageHeader {...currentStep} />
			{children}
			<StepperNavigation
				steps={stepperProps.steps}
				activeStep={stepperProps.activeStep}
				backVisible={backVisible}
				handleNext={handleNext}
				nextVisible={nextVisible}
			/>
		</>
	);
}
