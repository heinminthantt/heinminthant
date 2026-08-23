Build a modern, premium personal portfolio website inspired by the visual quality, structure, and website design of https://portfolio-pan-su.vercel.app/, but do NOT copy its code, text, images, branding, or exact visual implementation.

The goal is to create an original portfolio website that feels like a high-end designer/developer portfolio: minimal, editorial, sophisticated, highly readable, and visually memorable.

TECH STACK

Use:

* React
* Next.js
* TypeScript
* Tailwind CSS
* Lucide React for icons
* Framer Motion for subtle animations
* Google Fonts or a suitable modern font pairing

Use clean, reusable components and maintainable architecture.

DESIGN DIRECTION

The visual direction should be:

* Minimal
* Editorial
* Premium
* Spacious
* Typography-focused
* Modern
* Slightly experimental
* Professional rather than corporate
* Strong visual hierarchy
* Lots of whitespace
* Subtle borders
* Restrained use of color
* Smooth micro-interactions

Do not create a generic developer portfolio with excessive gradients, glowing cards, glassmorphism, or unnecessary animations.

The website should feel closer to a professional creative studio / product designer portfolio than a typical template.

COLOR SYSTEM

Use CSS variables/design tokens so the entire visual system can be changed easily.

Primary palette:

--background: #F7F6F2
--surface: #FFFFFF
--surface-muted: #EFEEE9

--text-primary: #171717
--text-secondary: #5F5F5A
--text-tertiary: #8A8982

--border: #D9D7D0
--border-subtle: #E8E6E0

--primary: #6D5DFB
--primary-hover: #5847E8
--primary-soft: #E9E6FF

--secondary: #F0A04B
--secondary-soft: #FFF0DD

The accent color should be used sparingly for links, important labels, active states, small decorative elements, buttons, and selected information.

Do not make the entire website purple.

Make all colors configurable from one central token file.

TYPOGRAPHY

Use typography as one of the main visual elements.

Recommended:

Display:

* Large
* Bold
* Tight letter spacing
* Strong contrast

Body:

* Clean
* Highly readable
* Comfortable line height

Use responsive typography with clamp() where appropriate.

Example hierarchy:

Hero heading:
clamp(3.5rem, 9vw, 8rem)

Section heading:
clamp(2rem, 5vw, 4rem)

Body:
1rem–1.125rem

Small metadata:
0.75rem–0.875rem

Avoid excessive font weights.

LAYOUT

Use a responsive max-width container.

Desktop:

* Large horizontal margins
* 12-column grid where appropriate
* Generous vertical spacing

Tablet:

* Reduce spacing
* Maintain strong typography

Mobile:

* Single-column layout
* Large but controlled typography
* No horizontal overflow
* Navigation becomes compact
* Maintain the editorial feel

Use CSS Grid and Flexbox rather than hard-coded positioning.

PAGE STRUCTURE

Create the following sections:

1. NAVIGATION

Minimal fixed/sticky navigation.

Left:

* Personal name / logo

Right:

* About
* Work
* Experience
* Contact

Include a small menu button on mobile.

Navigation should have a subtle border or background effect when scrolling.

2. HERO

The hero should immediately communicate who the person is and what they do.

Structure:

Small eyebrow:
"SOFTWARE ENGINEER / DEVELOPER"

Large headline:
"Building thoughtful digital experiences through code."

Short introduction paragraph explaining the person's focus.

Primary CTA:
"View Work"

Secondary CTA:
"Contact Me"

Include a small availability/status indicator.

Add subtle decorative typography or grid elements, but keep the hero clean.

The hero should occupy approximately 80–100vh on desktop.

3. INTRO / ABOUT

Create a short editorial introduction.

Use a large statement such as:

"I build reliable software with a focus on clean architecture, useful interfaces, and thoughtful user experiences."

Then provide a longer paragraph explaining the person's background, interests, and development philosophy.

Use a two-column layout on desktop.

4. TOOLKIT / TECHNOLOGIES

Create a visually interesting technology section.

Group technologies into categories:

Languages

* JavaScript
* TypeScript
* Python
* PHP
* C
* Java

Frontend

* React
* Next.js
* React Native
* HTML
* CSS
* Tailwind CSS

Backend

* Node.js
* Laravel
* REST APIs

Database

* MySQL
* PostgreSQL

Tools

* Git
* GitHub
* Docker
* Linux

Do not simply display a huge grid of colorful logos.

Instead, use typography, small labels, subtle borders, and hover interactions.

5. SELECTED WORK

This should be one of the main sections.

Display 3–5 projects.

Each project should have:

* Project number
* Project name
* Short description
* Technologies
* Project category
* Year
* Image/visual
* Link to project
* GitHub link when available

Use large project cards or editorial rows.

Projects should feel like case studies rather than simple cards.

Example:

01
Weather Data Mining

A data-analysis project focused on collecting, processing, and visualizing weather information.

Python · Data Mining · Visualization

[View Project]

Use large images with subtle hover transformations.

6. EXPERIENCE

Create an editorial timeline.

Each entry should contain:

Company
Role
Date
Location

Short description.

Example:

2026
METATEAM Myanmar Co., Ltd.
Software Development Intern

Worked on authentication, webhook APIs, candidate management, mail templates, and Laravel-based web application development.

Use a clean timeline rather than conventional cards.

7. EDUCATION

Show:

University
Degree
Major
Year

Add relevant coursework or achievements if available.

8. CERTIFICATIONS

Display relevant certifications in a clean list.

Example:

Meta Android Developer Professional Certificate

Do not use large certificate cards unless there are actual certificate images.

9. GRAPHIC / CREATIVE WORK

If the person has visual/design projects, create a separate gallery.

Use an asymmetric editorial grid.

Images should have different aspect ratios.

On hover:

* Slight scale
* Project title appears
* Category appears

Do not over-animate.

10. ABOUT / PERSONAL SECTION

Create a more personal section that communicates personality without becoming overly informal.

Include:

* Short biography
* Interests
* Development philosophy
* Current learning goals

11. CONTACT

Create a strong final CTA.

Large heading:

"Let's build something useful."

Include:

Email
GitHub
LinkedIn
Location

Add a simple contact form if appropriate.

The final section should have strong visual contrast.

12. FOOTER

Minimal footer.

Include:

* Name
* Copyright
* GitHub
* LinkedIn
* Email

Add a small "Back to top" interaction.

INTERACTIONS

Use Framer Motion for subtle animation.

Include:

* Fade/slide entrance animations
* Text reveal on hero
* Image hover scaling
* Link underline animations
* Smooth section transitions
* Navigation state changes
* Scroll-based subtle effects

Animation rules:

* Keep animations fast and subtle.
* Do not animate everything.
* Respect prefers-reduced-motion.
* Avoid distracting parallax.
* Avoid excessive spring animations.

PROJECT IMAGE HANDLING

Use high-quality placeholder images if real project images are unavailable.

Do not invent fake project screenshots that imply the person actually built something they did not build.

Create a clear data structure so project information can easily be replaced.

Example:

const projects = [
{
title: "...",
description: "...",
technologies: [...],
year: "...",
category: "...",
image: "...",
liveUrl: "...",
githubUrl: "..."
}
];

COMPONENT ARCHITECTURE

Create reusable components such as:

* Navbar
* Hero
* SectionHeading
* AboutSection
* Toolkit
* ProjectList
* ProjectCard
* ExperienceTimeline
* Education
* Certifications
* CreativeGallery
* Contact
* Footer

Keep content separate from UI components whenever possible.

Create a centralized portfolio data file.

ACCESSIBILITY

The website must:

* Use semantic HTML
* Have proper heading hierarchy
* Have accessible buttons
* Have accessible links
* Include alt text
* Support keyboard navigation
* Maintain sufficient color contrast
* Respect prefers-reduced-motion

RESPONSIVE DESIGN

Test at:

320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px

There must be no horizontal scrolling.

PERFORMANCE

Optimize for:

* Fast initial load
* Optimized images
* Lazy loading
* Minimal JavaScript where possible
* Good Lighthouse performance
* Good SEO

SEO

Add:

* Proper title
* Meta description
* Open Graph metadata
* Favicon
* Semantic HTML

Example title:

"Hein Min Thant — Software Developer"

Do not use placeholder metadata in the final implementation.

IMPORTANT CONTENT RULE

Do not invent personal information.

If information is missing, create clearly marked placeholder values such as:

[YOUR NAME]
[YOUR EMAIL]
[YOUR GITHUB]
[PROJECT DESCRIPTION]

Do not fabricate companies, employment history, education, certifications, achievements, clients, or project results.

CODE QUALITY

Write production-quality code.

Avoid:

* Massive components
* Duplicated code
* Hard-coded colors throughout components
* Inline styles unless necessary
* Unnecessary dependencies
* Generic template-looking UI

Use design tokens consistently.

FINAL RESULT

The final website should feel like an original, premium editorial portfolio for a software developer.

It should communicate:

"Serious developer with strong technical skills and good design taste."

The website should prioritize:

1. Typography
2. Content hierarchy
3. Project presentation
4. Whitespace
5. Subtle interactions
6. Strong responsive behavior
7. Performance

Do not attempt to reproduce the reference website pixel-for-pixel. Use it only as inspiration for the overall level of polish, editorial layout, whitespace, typography, and portfolio storytelling.
