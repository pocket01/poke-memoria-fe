"use client";
import { Controller } from "react-hook-form";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";

function Profile() {
	const { control } = useGlobalForm();
	return (
		<div className="max-w-6xl mx-auto w-full flex-1">
			<div className="flex flex-col gap-8">
				<Card>
					<CardHeader>
						<CardTitle> トレーナー名</CardTitle>
					</CardHeader>
					<CardContent>
						<Controller
							control={control}
							name="profile.name"
							render={({ field }) => (
								<Input {...field} placeholder="あなたの名前" />
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>自由記述</CardTitle>
					</CardHeader>
					<CardContent>
						<Controller
							control={control}
							name="profile.freeMessage"
							render={({ field }) => <Textarea {...field} />}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default Profile;
