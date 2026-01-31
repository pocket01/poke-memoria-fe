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
		<footer className="px-8 py-6">
			<div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
				{backVisible ? (
					<Button
						type="button"
						onClick={() => handleBack?.(steps[activeStep - 1])}
						className="bg-[#E3E8EE] text-[#364153] hover:bg-[#D4DDE6] rounded-2xl h-12 px-8 flex items-center gap-2 shadow-md border border-[#C9DAEB] transition-all"
					>
						<ChevronLeft size={20} />
						<span className="font-medium text-sm">戻る</span>
					</Button>
				) : (
					<div />
				)}

				<div className="text-center flex-shrink-0">
					<p className="text-sm text-[#4A5565] font-medium">
						ステップ {activeStep + 1} / {steps.length}
					</p>
				</div>

				{nextVisible ? (
					<Button
						type="button"
						onClick={() => handleNext?.(steps[activeStep + 1])}
						className="bg-[#284CAC] text-white hover:bg-[#1E3A7F] rounded-2xl h-12 px-8 flex items-center gap-2 shadow-lg transition-all"
					>
						<span className="font-medium text-sm">次へ</span>
						<ChevronRight size={20} />
					</Button>
				) : (
					<Button
						type="button"
						className="bg-[#284CAC] text-white rounded-2xl h-12 px-12 shadow-lg font-bold text-sm hover:bg-[#1E3A7F] transition-all"
					>
						<span>完成！ 🎉</span>
					</Button>
				)}
			</div>
		</footer>
	);
}
