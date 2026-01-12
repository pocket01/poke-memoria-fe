"use client";

import { usePathname, useRouter } from "next/navigation";
import {
	type ComponentProps,
	type PropsWithChildren,
	useCallback,
	useMemo,
} from "react";
import { CreateSteps } from "@/constants/routes";
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
	const handleNext = useCallback(() => {
		console.log(CreateSteps[stepperProps.activeStep + 1].page);
		router.push(CreateSteps[stepperProps.activeStep + 1].page);
	}, [router, stepperProps.activeStep]);

	// 次へボタンの表示可否
	const nextVisible = stepperProps.activeStep < stepperProps.steps.length - 1;

	return (
		<>
			<Stepper
				steps={stepperProps.steps}
				activeStep={stepperProps.activeStep}
			/>
			{children}
			<StepperNavigation
				steps={stepperProps.steps}
				activeStep={stepperProps.activeStep}
				handleBack={handleBack}
				backVisible={backVisible}
				handleNext={handleNext}
				nextVisible={nextVisible}
			/>
		</>
	);
}
