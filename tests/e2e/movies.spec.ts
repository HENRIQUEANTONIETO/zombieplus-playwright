import { test } from '../support'

import data from '../support/fixtures/movies.json';
import { executeSQL } from '../support/DataBase';

test('deve cadastrar um novo filme', async ({ page }) => {
    const movie = data.guerra_mundial_z;

    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();

    await executeSQL(`DELETE FROM movies WHERE movies.title = '${movie.title}'`);

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year.toString());

    await page.toast.containText('Cadastro realizado com sucesso!');
});
