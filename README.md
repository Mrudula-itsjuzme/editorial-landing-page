# Editorial Landing Page

An editorial, interaction-led landing-page experiment for a premium pet-care concept.

The experience turns a product collection into a small ritual: users can hover across the hero, reveal product details, switch between care items, and add products to a session-based ritual bag without leaving the composition.

This is an independent UI and interaction-design trial, not an official brand implementation.

## Overview

This prototype explores how a landing-page hero can do more than introduce a brand. It combines storytelling, product discovery, and lightweight commerce interactions inside one focused screen.

The design direction is intentionally minimal and tactile, with soft product staging, restrained typography, cursor-responsive motion, and a calm luxury-care tone.

## Core interactions

- hover-triggered expansion of the product tableau
- cursor-responsive visual movement
- selectable product cutouts with active states
- product name, scent, category, and price reveal
- session-based ritual bag counter
- account and bag drawer interaction
- responsive navigation and accessible controls
- reduced visual clutter with one-screen storytelling

## Product collection

The current concept includes:

- Remedy Paw Cleaner
- Refresh Mist
- Fig & Neroli Gentle Daily Shampoo
- Violet Leaf & Muslin Gentle Daily Shampoo

## Tech stack

- React 19
- Vite
- CSS animation and custom properties
- Pointer and focus interactions

## Run locally

```bash
git clone https://github.com/Mrudula-itsjuzme/editorial-landing-page.git
cd editorial-landing-page
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Design goals

1. Keep the product as the visual centre of the page.
2. Let interaction reveal detail rather than displaying everything at once.
3. Make the hero feel editorial without sacrificing usability.
4. Use motion as feedback, not decoration.
5. Preserve keyboard and focus behaviour alongside pointer interactions.

## Current scope

This repository contains a front-end concept rather than a complete storefront. Checkout, authentication, inventory, and persistent cart storage are outside the current scope.

## Author

Built by [Pedamallu Sai Mrudula](https://github.com/Mrudula-itsjuzme) as a landing-page interaction and frontend design experiment.