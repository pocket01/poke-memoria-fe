"use client";

import { createContext } from "react";
import {
	type ModalStore,
	type ModalType,
	useModalStore,
} from "@/stores/modalStore";

// グローバルモーダルコンテキスト
const Context = createContext<ModalStore<ModalType> | undefined>(undefined);

/**
 * グローバルモーダルプロバイダー
 * @param props.children
 * @returns JSX.Element
 */
export const GlobalModalProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const value = useModalStore();
	return <Context.Provider value={value}>{children}</Context.Provider>;
};
