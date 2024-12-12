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

During my internship this past summer, security concerns were mentioned, but I really had no grasp on how people could exploit websites. During this deliverable, I learned what SQL injection really is and why parameters prevent it. When parameters are used, it treats all entries as an entire string, so that the worst that would happen is a strange SQL Injection string being entered into the database. Additionally, I learned how to view and modify requests that I am sending to the server. This taught me not to put any data that I can't get from the database in my request. Why would I put pizza price in my request if I can very easily just pull that from my database? Finally, this deliverable taught me to make sure I never have any private information anywhere public, because there are people always trying to find it and exploit it. The past few deliverables also taught me this, as I can see bots crawling on my website to find any data they can.

Overall, this deliverable was very beneficial and opened my eyes to security concerns I had never considered.
