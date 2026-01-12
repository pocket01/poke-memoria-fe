import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../atoms/button";
import type { StepperType } from "./types/StepperTypes";

type Props<TStep extends StepperType> = {
	// ステップ配列
	steps: TStep[];
	// 現在のステップ
	activeStep: number;
	// 前のステップへ遷移時のイベントハンドラ
	handleBack?: (step?: TStep) => void;
	// 次のステップへ遷移時のイベントハンドラ
	handleNext?: (step?: TStep) => void;
	// 戻るボタンを表示するかどうか
	backVisible?: boolean;
	// 次へボタンを表示するかどうか
	nextVisible?: boolean;
};

/**
 * ステッパーナビゲーションコンポーネント
 * @param props.steps ステップ配列
 * @param props.activeStep 現在のステップ
 * @param props.handleBack 前のステップへ遷移時のイベントハンドラ
 * @param props.handleNext 次のステップへ遷移時のイベントハンドラ
 * @param props.backVisible 戻るボタンを表示するかどうか
 * @param props.nextVisible 次へボタンを表示するかどうか
 * @returns
 */
export default function StepperNavigation<TStep extends StepperType>({
	steps,
	activeStep,
	handleBack,
	handleNext,
	backVisible = true,
	nextVisible = true,
}: Props<TStep>) {
	return (
		<footer className="bg-white border-t-2 border-gray-300 shadow-lg px-6 py-6">
			<div className="max-w-5xl mx-auto flex items-center justify-between">
				{backVisible ? (
					<Button
						type="button"
						onClick={() => handleBack?.(steps[activeStep - 1])}
						variant="secondary"
					>
						<ChevronLeft size={20} />
						<span>戻る</span>
					</Button>
				) : (
					<div />
				)}

				<div className="text-center">
					<p className="text-sm text-[#4A5565]">
						ステップ {activeStep} / {steps.length}
					</p>
					<p className="text-xs text-[#FB2C36]">必須項目を入力してください</p>
				</div>

				{nextVisible && (
					<Button
						type="button"
						onClick={() => handleNext?.(steps[activeStep + 1])}
					>
						次へ
						<ChevronRight size={20} />
					</Button>
				)}
			</div>
		</footer>
	);
}
