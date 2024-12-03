import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('Login and Order pizza - https://pizza.andreagettys.click/', function () {
    // Home Page
    response = http.get('https://pizza.andreagettys.click/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'if-modified-since': 'Tue, 12 Nov 2024 01:44:54 GMT',
        'if-none-match': '"42d9c31dbbbcd4d9e160ea9e1e48d74f"',
        priority: 'u=0, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(5.7)

    // Login
    response = http.put(
      'https://pizza-service.andreagettys.click/api/auth',
      '{"email":"a@a","password":"a"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.andreagettys.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }
    sleep(7.3)

    // Menu
    response = http.get('https://pizza-service.andreagettys.click/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        origin: 'https://pizza.andreagettys.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    // Franchise
    response = http.get('https://pizza-service.andreagettys.click/api/franchise', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        origin: 'https://pizza.andreagettys.click',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(12.3)

    // Purchase Pizza
    response = http.post(
      'https://pizza-service.andreagettys.click/api/order',
      '{"items":[{"menuId":5,"description":"Charred Leopard","price":0.0099}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.andreagettys.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Purchase was *not* 200');
    };
    sleep(8.5)

    // Verify Pizza
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      '{"jwt":"eyJpYXQiOjE3MzMyNjE4MjMsImV4cCI6MTczMzM0ODIyMywiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJhamdldCIsIm5hbWUiOiJBbmRyZWEgR2V0dHlzIn0sImRpbmVyIjp7ImlkIjo4LCJuYW1lIjoiYSIsImVtYWlsIjoiYUBhIn0sIm9yZGVyIjp7Iml0ZW1zIjpbeyJtZW51SWQiOjUsImRlc2NyaXB0aW9uIjoiQ2hhcnJlZCBMZW9wYXJkIiwicHJpY2UiOjAuMDA5OX1dLCJzdG9yZUlkIjoiMSIsImZyYW5jaGlzZUlkIjoxLCJpZCI6Mn19.ExHUC_6_WkStHREXU_k4r9sTBGrYhbZfTQ2DwQset5H2n6_9pWiEhlu9Y4DYJwpXknZO72yiUUL0FUcHof9KDGn8-QJjR9xxeoPUQZgAtlhcndyrUqsgPFzLHZr5wkx_JrYn86iGlvHwTw9a3lC__v5C3oaVI-aHNNdfzYpOLA-iYwaVj8tPCCSEnlblX8LKrIbnr7yxEraUj3U2azz_Xquiq2FIZkr43T7axNMEHr1qXok1qJBOcNv7sfQZJnzpDpzW72Wgjoz9l1WZiufc-12UTi_0A_niZG0rj-7PUuvpCV4uvlXMYm9p6HA5Q6mUMsqlYfohJTqGhPDAqo_rBq1dJc7IP1w68JG-CmvSUU5AP258ZgGs1gcfOGBmtb4_wF0Bg49qEpY08jPNEjZGF6e78-m5gJHRANdyceaf-17LUI20xKP9pIYo-vwY9lFyLRiAIyl7C5gUDAj8ujAk52Ms3dVG1vuTBcF92b0m5fSZ78xFMrl39Eh7tx_FPRfoxUJMhBklUlB2_Saa_KNChkuLYo3RpUfrmCXcDcJekQiDQZWUEi0oA9TrP5eyvtGTSZht6RTV_jEr1HkAtJJRkudgo1fFZaAl6QumuWl1EusiT1Ay_DmYgrneCAf49ldiIZFxkwj1T3r2YiGEUNyZnJ47TbOVf84BvuZ5Da6d3eo"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.andreagettys.click',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
        },
      }
    )
  })
}