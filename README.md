

# Anime Website

This is a simple website for browsing and searching anime.

## Features

- View popular and latest anime
- Search for anime by name
- View anime details

## Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)
- Tailwind CSS
- Fetch API

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/notrana/astroflix
   cd anime-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/anime
   ```

   Replace `mongodb://localhost:27017/anime` with your MongoDB connection URI.

4. Run the server:

   ```bash
   npm start
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Usage

- Browse popular and latest anime on the home page.
- Use the search bar to search for anime by name.
- Click on an anime to view its details.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add my feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

