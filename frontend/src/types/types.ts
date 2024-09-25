import { ReactNode } from "react";

export interface BackToTopProps {
    scroll: boolean;
}

export interface BreadcrumbProps {
    breadcrumbTitle: string;
}

export interface HeaderProps {
    scroll: boolean;
    isMobileMenu?: boolean;
    isSidebar?: boolean;
    handlePopup: () => void;
    handleMobileMenu: () => void;
    handleSidebar: () => void;
}

export interface LayoutProps {
    breadcrumbTitle?: string;
    wrapperCls?: string;
    children: ReactNode;
}

export interface MobileMenuProps {
    isSidebar?: boolean;
    handleMobileMenu: () => void;
    handleSidebar?: () => void;
}

export interface RecipeData {
    _id: string;
    title: string;
    photo: string;
    tags: string[];
    createdAt: string;
    author: string;
}

export interface BannerProps {
    popularRecipesData: RecipeData[];
}

export interface RecipeProps {
    recipesData: RecipeData[];
}

export interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
    autoHideDuration?: number;
  }