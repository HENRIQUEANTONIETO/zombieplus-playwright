import { Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Toast } from '../pages/Components';
import { MoviesPage } from '../pages/MoviesPage';
import { LandingPage } from '../pages/LandingPage';

// Extend the Page type with your custom page objects
export type ExtendedPage = Page & {
    landing: LandingPage;
    login: LoginPage;
    toast: Toast;
    movies: MoviesPage;
};

export const test = base.extend<{ page: ExtendedPage }>({
    page: async ({ page }, use) => {
        // Initialize your custom page objects
        const customPage = {
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            toast: new Toast(page),
            movies: new MoviesPage(page),
        };
        await use(customPage);
    },
});

export { expect } from '@playwright/test';
