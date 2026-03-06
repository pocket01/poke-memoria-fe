import Image from "next/image";
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
					<div className="relative">
						<Image
							src="/pokeballs/01.svg"
							className={`absolute transition-all  duration-300 ${index < currentStep ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
							alt={`ステップ${index + 1}完了`}
							width={64}
							height={64}
						/>
						<Image
							src="/pokeballs/02.svg"
							className={`transition-all  duration-300 ${index < currentStep ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
							alt={`ステップ${index + 1}完了`}
							width={64}
							height={64}
						/>
					</div>
					<span
						className={`text-xs font-bold mt-2 whitespace-nowrap transition-colors ${
							index <= currentStep ? "text-[#284CAC]" : "text-[#4A5565]"
						}`}
					>
						{`${index + 1}. ${step.label}`}
					</span>
				</div>
			))}
		</div>
	);
}
