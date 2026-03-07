import type { Route } from "next";
import type { ReactNode } from "react";

/**
 * ステッパーのステップタイプ
 */
export type StepperType<TRoute extends string> = {
	id: number;
	label: ReactNode;
	url: Route<TRoute>;
};
