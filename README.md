# Financial Numbers — Frontend Take-Home (Angular)

This project is a small Angular application that accepts shorthand financial numbers and displays their full numeric values along with an average.

## Examples

| Shorthand | Expanded |
|----------|----------|
| `250k`   | `250,000` |
| `10m`    | `10,000,000` |
| `.5b`    | `500,000,000` |

Supported suffixes:
- `k` = thousand
- `m` = million
- `b` = billion

---

## Features

- Accept multiple shorthand financial numbers on a single page
- Convert shorthand values to full numeric format
- Preserve input order
- Display the average of all submitted values
- Route-based navigation between input and output views

---

## Application Flow

### Input Route
- User enters one or more shorthand financial numbers
- Inputs are collected in a single page visit
- Submit action routes to the output page

### Output Route
- Displays each expanded number in the order entered
- Displays the average at the bottom

---

## Tech Stack

- Angular
- TypeScript
- HTML
- CSS

---

## Time Constraint

Time-boxed to **4 hours**.

---

## Live Demo

[View Demo](https://flavia3107.github.io/financial-numbers/)

---


# financial-numbers
