# XL Management Services Website

A responsive corporate website developed for XL Management Solutions, featuring recruitment workflows, secure contact handling, dynamic job listings, and automated email communication.

The project was built to provide a professional online presence while streamlining candidate enquiries and business communications through modern web technologies and serverless architecture.

## Live Demo

🔗 Live Website: www.xlms.in

## Screenshots

<details>
<summary>Screenshots</summary>

### Homepage
<img src="screenshots/homepage.png">

### Careers
<img src="screenshots/careers.png">

### Contact
<img src="screenshots/contact.png">

</details>

## Features

### Corporate Website

* Responsive multi-page design
* Company and service information pages
* Mobile-friendly user experience
* Cross-browser compatibility

### Recruitment Workflow

* Dynamic job listings powered by structured JSON data
* Interactive job details interface
* Candidate enquiry and application forms
* User-friendly recruitment experience

### Contact Management

* Business enquiry forms
* Client-side validation
* Real-time submission feedback
* Automated acknowledgement emails

### Email Automation

* Serverless form processing
* Automated candidate confirmation emails
* Automated business enquiry responses
* Internal notification workflows

### Secure Data Handling

* Backend processing through serverless functions
* Sensitive information kept off the client side
* Environment-based configuration for API credentials

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Backend & Services

* Netlify Functions
* Supabase
* Resend Email API

### Tools

* Git
* GitHub
* Netlify

## Project Structure

```text
business-site-xlmanagementservices/

├── index.html
├── About.html
├── Services.html
├── Career.html
├── Contact.html
│
├── css/
│
├── js/
│   ├── global.js
│   ├── navbar.js
│   ├── contact.js
│   ├── career.js
│   └── jobs.json
│
├── assets/
│
└── netlify/
    └── functions/
```

## Key Technical Highlights

### Dynamic Job Management

Job openings are maintained through structured JSON data and rendered dynamically within the careers section, allowing content updates without modifying page layouts.

### Serverless Architecture

Form submissions are processed through serverless functions, enabling secure communication between the frontend and backend services without exposing sensitive credentials.

### Automated Communication

The system integrates email automation to provide instant confirmation messages while notifying relevant stakeholders of incoming enquiries.

### Responsive Design

The website is designed to provide a consistent experience across desktop, tablet, and mobile devices.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/avishree-dev/business-site-xlmanagementservices.git
```

Navigate to the project directory:

```bash
cd business-site-xlmanagementservices
```

Run using a local development server such as:

```bash
Live Server (VS Code)
```

## Future Improvements

* Applicant tracking dashboard
* Admin portal for recruitment management
* Analytics and reporting
* Authentication for internal users
* React-based frontend migration
* Enhanced content management workflows

## Author

**Avishree Roy**

M.Sc. Computational Science & Applications
Aspiring Frontend & Web Developer

GitHub: https://github.com/avishree-dev
