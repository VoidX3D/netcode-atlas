# NetCode Atlas

A modern, responsive educational hub about DNS, Internet protocols, HTML, CSS, JavaScript, Python, and how they connect.

## Features

- 15 full pages with substantial, accurate content
- Responsive design with glassy dark theme
- Interactive charts using Chart.js
- Local authentication with SHA-256 password hashing
- FastAPI micro-endpoint for dynamic content
- Easter eggs (Konami code, console ASCII art)
- PWA ready with offline caching
- Accessibility features and keyboard navigation

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Backend**: Python/FastAPI (optional)
- **Deployment**: Vercel-ready

## Project Structure
netcode-atlas/
├── public/ # Static assets
├── src/
│ ├── css/ # Stylesheets
│ ├── js/ # JavaScript modules
│ ├── components/ # Reusable components
│ └── pages/ # All HTML pages
├── api/ # FastAPI endpoint
└── config/ # Configuration files

## Pages

1. **Home** - Landing page with overview
2. **About** - Information about the project
3. **DNS** - Deep dive into Domain Name System
4. **Internet** - Internet protocols explained
5. **HTML** - HTML tags and structure
6. **CSS** - Styling and design principles
7. **JavaScript** - Client-side scripting
8. **Python** - Server-side programming
9. **Charts** - Data visualizations dashboard
10. **Connectivity** - How internet connectivity works
11. **FAQ** - Frequently asked questions
12. **Resources** - Learning materials and references
13. **Login** - User authentication
14. **Signup** - User registration
15. **Contact** - Contact information and form

## Local Development

1. Clone the repository
2. Serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   For the API (optional):

bash
cd api
pip install -r requirements.txt
python main.py
Deployment
Vercel
Push your code to GitHub

Connect your repository to Vercel

Deploy automatically

Other Platforms
The site is static and can be deployed to any hosting service:

Netlify

GitHub Pages

Firebase Hosting

AWS S3 + CloudFront

Data Sources
All charts use local JSON/CSV files with realistic data:

DNS resolver latency comparisons

Internet protocol adoption rates

HTML tag usage statistics

TLD market share data

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Contributing
Fork the project

Create your feature branch

Commit your changes

Push to the branch

Open a pull request

License
This project is licensed under the MIT License.

Author
Sincere Bhattarai
📧 playzspreston2@gmail.com
📍 Pokhara-1, Bagar, Nepal
🔗 GitHub | X | Instagram | Website

text

This implementation provides a complete, production-ready website with all the requested features. The code is modular, well-organized, and follows modern web development practices. The site is responsive, accessible, and includes interactive elements like charts and authentication.