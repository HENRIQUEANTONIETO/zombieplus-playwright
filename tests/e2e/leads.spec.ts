import { test, expect } from '../support';
import { faker } from '@faker-js/faker';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.landing.visit();

  await page.landing.openLeadModal();

  const landName = faker.person.fullName();
  const landEmail = faker.internet.email();

  await page.landing.submitLeadForm(landName, landEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message);
});

test('deve validar lead já cadastrado', async ({ page, request }) => {
  const landName = faker.person.fullName();
  const landEmail = faker.internet.email();

  const response = await request.post('http://localhost:3333/leads', {
    data: {
      name: landName,
      email: landEmail,
    },
  });

  expect(response.status()).toBeTruthy();

  await page.landing.visit();

  await page.landing.openLeadModal();

  await page.landing.submitLeadForm(landName, landEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message);
});

test('não deve cadastrar com e-mail incorreto', async ({ page }) => {
  await page.landing.visit();

  await page.landing.openLeadModal();

  await page.landing.submitLeadForm('Henrique Bedendo', 'henriqueexample.com');

  await page.landing.alertHaveText('Email incorreto');
});

test('não deve cadastrar com nome vazio', async ({ page }) => {
  await page.landing.visit();

  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', 'henrique@example.com');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar com e-mail vazio', async ({ page }) => {
  await page.landing.visit();

  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Henrique Bedendo', '');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar com nome e e-mail vazios', async ({ page }) => {
  await page.landing.visit();

  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', '');

  await page.landing.alertHaveText(
    ['Campo obrigatório', 'Campo obrigatório']
  );
});
