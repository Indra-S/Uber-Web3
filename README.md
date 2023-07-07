# Uber-Web3


Uber-Web3 is an open-source decentralized application (dApp) built on the Ethereum blockchain. It aims to provide a decentralized ride-hailing service similar to Uber, but with the added benefits of transparency, security, and peer-to-peer transactions facilitated by smart contracts.

This repository contains the smart contracts, web interface, and supporting files for Uber-Web3. With this dApp, users can request rides, drivers can accept ride requests, and payments are handled through the Ethereum blockchain using smart contracts.

## Tech Stack Used -

<img src="https://img.shields.io/badge/nextjs%20-%2314354C.svg?&style=for-the-badge&logo=nextjs&logoColor=white"/> <img src="https://img.shields.io/badge/nodejs%20-%2314354C.svg?&style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/sanityio%20-%2314354C.svg?&style=for-the-badge&logo=sanity&logoColor=white"/> <img src="https://img.shields.io/badge/html5%20-%2314354C.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/css3%20-%2314354C.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/javascript%20-%2314354C.svg?&style=for-the-badge&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/mapbox%20-%2314354C.svg?&style=for-the-badge&logo=mapbox&logoColor=white"/>
<img src="https://img.shields.io/badge/etherjs%20-%2314354C.svg?&style=for-the-badge&logo=etherjs&logoColor=white"/> 


## Getting Started

Follow these steps to get Uber-Web3 up and running on your local machine:

1. Clone this repository:

```bash
git clone https://github.com/Dev7989/Uber-Web3.git
```

2. Change into the project directory:

```bash
cd Uber-Web3
```

3. Create a `.env` file in the project root directory and add the following details:

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk
NEXT_PUBLIC_UBER_ADDRESS=0x
MAPBOX_DIRECTIONS_API_URL=https://api.mapbox.com/directions/v5/mapbox/driving-traffic
MAPBOX_PLACES_API_URL=https://api.mapbox.com/geocoding/v5/mapbox.places
SANITY_TOKEN=skcMt0LxdNjB
SANITY_PROJECT_ID=027

```

4. Install the dependencies:

```bash
npm install
```

5. Start the sanity server:

```bash
npm run dev
```

6. Open your web browser and navigate to `http://localhost:5173` to access the Uber-Web3 application.

