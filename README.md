Portfolio Website

This is a static portfolio website designed for hosting on GitHub Pages. It features a modern, interactive design with smooth animations and a responsive layout, showcasing skills, experience, projects, volunteer work, and publications.

Setup Instructions





Clone the Repository:

git clone https://github.com/your-username/your-repo.git



Customize Content:





Update index.html with your name, bio, skills, experience, project details, volunteer work, publications, and links.



Replace images in assets/images/ with your actual images (e.g., profile.jpg, project1.jpg, etc.).



Update assets/favicon.ico with your favicon.



Deploy to GitHub Pages:





Push the repository to GitHub.



Go to your repository on GitHub, navigate to Settings > Pages.



Set the source to the main branch and the / (root) folder.



Save, and your site will be live at https://your-username.github.io/your-repo.

Directory Structure

portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── placeholder.jpg
│   │   ├── skill1.jpg
│   │   ├── skill2.jpg
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   ├── project3.jpg
│   │   └── profile.jpg
│   └── favicon.ico
├── README.md
└── .gitignore

Features





Responsive Design: Works seamlessly on mobile and desktop.



Interactive Animations: Typing effect, smooth scrolling, and section reveal animations.



Tailwind CSS: For rapid styling and customization.



GitHub Pages Ready: Optimized for static hosting.



Sections: Home, About, Skills, Experience, Projects, Volunteer, Publications, Contact.

Customization





Hero Section: Edit the roles array in js/script.js to change the typing animation text.



Images: Replace placeholder images in assets/images/ with optimized images.



Content: Update index.html with your personal details, skills, experience, projects, volunteer work, and publications.



Contact Form: The form is client-side only; integrate with a backend service like Formspree for actual submissions.

License

MIT License. Feel free to use and modify as needed.