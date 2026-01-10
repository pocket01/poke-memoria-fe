import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home Page", () => {
	it("ポケメモリア ホームページが正しくレンダリングされること", () => {
		render(<Home />);
		const heading = screen.getByRole("heading", {
			name: /ポケメモリア/i,
		});
		expect(heading).toBeInTheDocument();
	});
});
