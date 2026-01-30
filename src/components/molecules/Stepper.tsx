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
		<div className="px-8 py-6 max-w-6xl mx-auto">
			<div className="flex items-center justify-center">
				{steps.map((step, index) => (
					<div key={`step-${step.id}`} className="flex items-center flex-1">
						{/* ステップアイテム */}
						<div className="flex flex-col items-center w-full">
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all text-sm shadow-md ${
									index === currentStep
										? "bg-[#284CAC] text-white shadow-lg"
										: index < currentStep
											? "bg-[#B8E3D2] text-white"
											: "bg-[#E3E8EE] text-[#A1A1A1]"
								}`}
							>
								{index < currentStep ? "✓" : index + 1}
							</div>
							<span
								className={`text-xs font-bold mt-2 whitespace-nowrap transition-colors ${
									index <= currentStep ? "text-[#284CAC]" : "text-[#4A5565]"
								}`}
							>
								{step.label}
							</span>
						</div>

						{/* コネクタライン */}
						{index < steps.length - 1 && (
							<div className="flex-1 mx-3 h-1 bg-[#C9DAEB] rounded-full relative">
								<div
									className={`h-full rounded-full transition-all ${
										index < currentStep ? "bg-[#B8E3D2]" : "bg-[#C9DAEB]"
									}`}
									style={{
										width: index < currentStep ? "100%" : "0%",
									}}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
