export interface IPageLoader {
	isVisible: boolean;
	message?: string;
}

export enum ComponentActionTypes {
	SET_PAGE_LOADER = 'SET_PAGE_LOADER',
}

export interface ISetPageLoaderAction {
	type: ComponentActionTypes.SET_PAGE_LOADER;
	pageLoader: IPageLoader;
}

export type ComponentActions = ISetPageLoaderAction;

export function setPageLoader(showPageLoader: boolean = true, message?: string) : ISetPageLoaderAction {
	return {
		type: ComponentActionTypes.SET_PAGE_LOADER,
		pageLoader: {
			isVisible: showPageLoader,
			message: message
		}
	}
}