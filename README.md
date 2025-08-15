## FinRev

An easy-to-use financial application for managing your income and expenses. Track your finances, add income and expense records, and analyze data using beautiful charts. A simple and effective way to control your budget and manage your finances.

### Unified entry form

FinRev now uses a single `EntryForm` component for both income and expense records. Choose the type of entry, select a category, and enter the amount – the form handles the rest.

### API endpoints

The client communicates with a backend service to persist data. The service exposes the following endpoints:

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/entries?type=income` | List income entries |
| `GET` | `/api/entries?type=expense` | List expense entries |
| `POST` | `/api/entries` | Create a new income or expense entry (`{ type, category, amount }`) |
| `DELETE` | `/api/entries/:id` | Remove an entry |

## Authors

- [@kaiserflexer](https://t.me/kaiserflexer)

## Deployment

To deploy this project, first create an account on Vercel. Next, make a fork of the app and deploy it to Vercel via GitHub.
Use the basic command in the settings to launch the application:
```bash
  npm start
```

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![Logo](https://i.ibb.co/VLmLQ71/free-icon-dollar-symbol-in-black-oval-8610925-1.png)
