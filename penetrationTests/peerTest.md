# Andrea Gettys

## Andrea Gettys Self-Attack
| Item | Result |
| :--- | :----- |
| Date | December 7, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Server side request forgery  |
| Severity | 2 |
| Description | Users could successfully order a pizza for whatever price they wanted |
| Correction | We find the price in the database corresponding to the menu item as the price, rather than using the request's input |

| Item | Result |
| :--- | :----- |
| Date | December 9, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Injection |
| Severity | 1 |
| Description | All auth keys deleted |
| Correction | Replaced any string interpolation in database.js with parameters |

| Item | Result |
| :--- | :----- |
| Date | December 9, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Software Logging and Monitoring Failures |
| Severity | 2 |
| Description | Users could access logs and find administrator/user auth keys and JWTs |
| Correction | Sanitized token and JWTs in logs |

2. Password HTTP Request Vulernability
3. Log Sanitization

## Andrea Gettys attack on Keiffer da Silva


## Keiffer da Silva attack on Andrea Gettys


## Combined Summary of Learnings
