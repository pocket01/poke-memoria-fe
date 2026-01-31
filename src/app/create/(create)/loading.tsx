import { Progress } from "@/components/atoms/progress";

/**
 * @todo 進捗を可視化する（現状は100%固定）
 * @returns
 */
export default async function Loading() {
	return <Progress value={100} className="w-full mt-4" />;
}
