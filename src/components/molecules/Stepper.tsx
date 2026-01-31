import { Check } from "lucide-react";
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
		<div className="flex items-center justify-center gap-4">
			{steps.map((step, index) => (
				<div key={step.id} className="flex flex-col items-center w-full">
					{/* ステップアイテム */}
					<div
						className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all text-sm ${
							index === currentStep
								? "neu-flat bg-[#284CAC] text-white"
								: index < currentStep
									? "neu-flat bg-[#B8E3D2] text-[#284CAC] "
									: "neu-pressed bg-[#E3E8EE] text-[#A1A1A1]"
						}`}
					>
						{index < currentStep ? <Check /> : index + 1}
					</div>
					<span
						className={`text-xs font-bold mt-2 whitespace-nowrap transition-colors ${
							index <= currentStep ? "text-[#284CAC]" : "text-[#4A5565]"
						}`}
					>
						{step.label}
					</span>
				</div>
			))}
		</div>
	);
}
