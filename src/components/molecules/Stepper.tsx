import type { ReactNode } from "react";

type Props<
	TStep extends {
		id: number;
		label: ReactNode;
	},
> = {
	// ステップ配列
	steps: TStep[];
	// 現在のステップ
	activeStep: number;
};

/**
 * ステッパーコンポーネント
 * @param props.steps ステップ配列
 * @param props.activeStep 現在のステップ
 * @returns
 */
export default function Stepper<
	TStep extends {
		id: number;
		label: ReactNode;
	},
>({ steps, activeStep: currentStep }: Props<TStep>) {
	return (
		<div className="bg-white px-6 py-4">
			<div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
				{steps.map((step, index) => (
					<div key={`step-${step.id}`} className="flex items-center gap-4">
						<div className="flex flex-col items-center gap-2">
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
									index === currentStep
										? "bg-yellow-400 text-red-600 shadow-lg opacity-[0.58]"
										: index >= currentStep
											? "bg-gray-300 text-gray-600"
											: " bg-red-500 text-white shadow-lg"
								}`}
							>
								{index >= currentStep ? index + 1 : "✓"}
							</div>
							<span
								className={`text-sm ${
									index === currentStep
										? "font-bold text-black"
										: "text-gray-600"
								}`}
							>
								{step.label}
							</span>
						</div>
						{index < currentStep && <div className="w-32 h-1 bg-red-500"></div>}
						{index >= currentStep && index < steps.length - 1 && (
							<div className="w-32 h-1 bg-gray-300" />
						)}
					</div>
				))}
			</div>
		</div>
	);
}
