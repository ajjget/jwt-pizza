# Deliverable 12 - Andrea Gettys

## Self-Attack
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

## Attack on pizza.byucsstudent.click
| Item | Result |
| :--- | :----- |
| Date | December 11, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Server side request forgery  |
| Severity | 2 |
| Picture | ![image](https://github.com/user-attachments/assets/541a8e58-ed62-4de7-bb98-ed3937195287) |
| Description | Users could successfully order a pizza for whatever price they wanted |
| Successful? | Yes |

| Item | Result |
| :--- | :----- |
| Date | December 11, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Injection |
| Severity | 1 |
| Description | Modify SQL database with an injection attack |
| Successful? | No |

| Item | Result |
| :--- | :----- |
| Date | December 11, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Broken Access Control |
| Severity | 3 |
| Pictures | ![preexistingemail1](https://github.com/user-attachments/assets/2ba54800-7fde-407d-b5f3-275049ac46e6) ![preexistingemail2](https://github.com/user-attachments/assets/a56f3408-3f9f-47e8-9f85-943651e30775) |
| Description | Someone can register with a pre-existing email and effectively lock someone else out of their account. This is demonstrated with two different users, named a and b, logged in under "a@jwt.com". Only one of them is able to log in. |
| Successful? | Yes |

| Item | Result |
| :--- | :----- |
| Date | December 11, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Broken Access Control |
| Severity | 3 |
| Description | Users with a valid auth token can substitute their dinerId with another, effectively using someone else's credentials to order the pizza, but still getting the JWT |
| Successful? | No |

| Item | Result |
| :--- | :----- |
| Date | December 11, 2024 |
| Target | pizza.andreagettys.click |
| Classification | Identification and Authentication Failures |
| Severity | 3 |
| Picture | ![discoveredcommonlogin](https://github.com/user-attachments/assets/12ed8576-50bb-494a-a6aa-b07161bb0bf8) |
| Description | Looking for common emails paired with common passwords. Found preexisting username d@jwt.com, password "diner" |
| Successful? | Yes |

## What I Learned
