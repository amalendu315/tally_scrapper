# Tally Autofill API

This project provides a Node.js API that automates the process of pre-filling ledger entries in Tally using data scraped from a specified source.

## Features

* Scrapes ledger entry data from a target website (configurable).
* Transforms the scraped data into the format required by the Tally API.
* Sends the transformed data to the Tally API for automatic entry creation.
* Provides a RESTful API for triggering the scraping and Tally integration process.

## Technologies Used

* Node.js
* TypeScript
* Express.js
* Axios (for HTTP requests)
* Cheerio (for web scraping)
* [Tally Integration API] (replace with actual API name/link)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/tally-autofill-api.git`
2. Install dependencies: `npm install`
3. Configure environment variables (see below).
4. Build the project: `npm run build`

## Configuration

Create a `.env` file in the project root and set the following environment variables:

* `TARGET_WEBSITE_URL`: The URL of the website to scrape ledger entries from.
* `TALLY_API_URL`: The URL of your Tally integration API.
* `TALLY_API_KEY`: (Optional) Your API key for the Tally API, if required.

## Usage

1. Start the API server: `npm start` (or `npm run dev` for development mode)
2. Send a POST request to `/api/scrape-and-send` to trigger the scraping and Tally integration process.

## API Endpoints

* **POST /tally:**
    * Scrapes ledger entries from the target website.
    * Transforms the data to match the Tally API format.
    * Sends the data to the Tally API.
    * Returns a success message if the process completes successfully.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [ISC License](LICENSE).