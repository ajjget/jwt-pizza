import { test, expect } from 'playwright-test-coverage';

test('purchase with login', async ({ page }) => {
  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
      { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });

  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'd@jwt.com', password: 'a' };
    const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  await page.goto('/');

  // Go to order page
  await page.getByRole('button', { name: 'Order now' }).click();

  // Create order
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
  await page.getByRole('combobox').selectOption('4');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await expect(page.locator('form')).toContainText('Selected pizzas: 2');
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Login
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();

  // Pay
  await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
  await expect(page.locator('tbody')).toContainText('Veggie');
  await expect(page.locator('tbody')).toContainText('Pepperoni');
  await expect(page.locator('tfoot')).toContainText('0.008 ₿');
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Check balance
  await expect(page.getByText('0.008')).toBeVisible();

});


test('should display user information and orders', async ({ page }) => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    roles: [{ role: 'Diner', objectId: '12345' }]
  };

  await page.goto('/');

  await page.evaluate(user => {
    localStorage.setItem('user', JSON.stringify(user));
  }, user);

  await page.goto('/diner-dashboard');

  await expect(page.locator('text=John Doe')).toBeVisible();
  await expect(page.locator('text=john@example.com')).toBeVisible();
});


test('should display not found when user is not provided', async ({ page }) => {
  await page.goto('/diner-dashboard');
  await expect(page.locator('text=Oops')).toBeVisible();
});


test('test text pages', async ({page}) => {
  await page.goto('/');
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('alert')).toContainText('If you are already a franchisee, pleaseloginusing your franchise account');
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
  await page.getByRole('link', { name: 'home' }).click();
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('The secret sauce');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
});

test('register and logout', async({ page}) => {

  await page.route('*/**/api/auth', async (route) => {
    if (route.request().method() === 'DELETE') {
      const franchiseId = route.request().url().split('/').pop(); // Extract franchise ID from URL

      // Mock a successful deletion response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: `Franchise ${franchiseId} closed successfully.` }),
      });
    }
    else if (route.request().method() === 'POST') {
      // Registration mock
      const regReq = { name: 'aj', email: 'aj@jwt.com', password: 'password' };
      const regRes = {
        user: { id: 2, name: 'aj', email: 'aj@jwt.com', roles: [{ role: 'diner' }] },
        token: 'mock-token',
      };

      expect(route.request().postDataJSON()).toMatchObject(regReq);
      await route.fulfill({ json: regRes });

    } else if (route.request().method() === 'DELETE') {
      // Logout mock
      const authHeader = route.request().headers()['authorization'];
      expect(authHeader).toBe('Bearer mock-token');

      const logoutRes = { message: 'logout successful' };
      await route.fulfill({ json: logoutRes });
    }
  });

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('aj');
  await page.getByPlaceholder('Full name').press('Tab');
  await page.getByPlaceholder('Email address').fill('aj@jwt.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Register' }).click();

  await page.getByRole('link', { name: 'Logout' }).click();
});

test('mock admin + franchises', async({ page}) => {
  await page.route('**/api/franchise', async (route) => {
    if (route.request().method() === 'POST') {
      const franchiseReq = {
        name: 'testFranchiseName',
        admins: [{ email: 'test@franchise.com' }]
      };
      const franchiseRes = {
        id: 123,
        name: 'testFranchiseName',
        admins: [{ email: 'test@franchise.com' }],
        stores: [],
      };

      expect(route.request().postDataJSON()).toMatchObject(franchiseReq);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(franchiseRes),
      });
    }
  });

  await page.route('*/**/api/auth', async (route) => {
    if (route.request().method() === 'POST') {
      const regReq = { name: 'adminUser', email: 'admin@jwt.com', password: 'toomanysecrets' };
      const regRes = {
        user: {
          id: 1,
          name: 'adminUser',
          email: 'admin@jwt.com',
          roles: [{ role: 'admin' }]
        },
        token: 'mock-admin-token',
      };

      expect(route.request().postDataJSON()).toMatchObject(regReq);
      await route.fulfill({ json: regRes });
    }
  });

  await page.goto('/admin-dashboard');

  await page.goto('/admin-dashboard/create-franchise');

  await page.fill('input[placeholder="franchise name"]', 'testFranchiseName');
  await page.fill('input[placeholder="franchisee admin email"]', 'test@franchise.com');
  await page.click('button[type="submit"]');

  await page.goto('/admin-dashboard/close-franchise');

  await page.goto('/admin-dashboard/close-store');
});

test('docs page', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.getByRole('heading')).toContainText('JWT Pizza API');
});


test('should create and close a store successfully', async ({ page }) => {
  await page.route('**/api/franchise/*/store', route => {
    if (route.request().method() === 'POST') {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'mock-store-id',
          name: 'Test Store',
        }),
      });
    }
  });

  await page.goto('/create-store');

  await page.fill('input[placeholder="store name"]', 'Test Store');

  await page.click('text=Create');

  await page.route('**/api/franchise/*/store/*', route => {
    if (route.request().method() === 'DELETE') {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Store closed successfully' }),
      });
    }
  });

  await page.goto('/close-store');
});