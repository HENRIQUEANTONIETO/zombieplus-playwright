import { test, expect } from '../support';

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();
})

test('não deve logar como senha incorreta', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', '123');
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)
})

test('não deve logar como e-mail inválido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('adminzombieplus.com', '123');
    await page.login.alertHaveText('Email incorreto');
})

test('não deve logar com e-mail vazio', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', '123');
    await page.login.alertHaveText('Campo obrigatório');
})

test('não deve logar com senha vazia', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', '');
    await page.login.alertHaveText('Campo obrigatório');
})

test('não deve logar com senha e e-mail vazios', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('', '');
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
})