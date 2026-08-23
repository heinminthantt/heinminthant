import { readFileSync } from "node:fs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL missing");

const sql = postgres(url, { prepare: false, ssl: "require" });

async function main() {
  const schema = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);
  console.log("schema applied");

  const existing = await sql`select id from site_settings where id = 1`;
  if (existing.length > 0) {
    console.log("already seeded, skipping");
    return;
  }

  await sql`
    insert into site_settings (id, name, role_title, hero_headline, hero_subheadline,
      about_statement, about_body, philosophy, interests, currently_learning,
      email, location, availability_label, available)
    values (
      1,
      'Hein Min Thant',
      'Software Engineer / Developer',
      'Building thoughtful digital experiences through code.',
      'I craft reliable software with a focus on clean architecture, useful interfaces, and thoughtful user experiences.',
      'I build reliable software with a focus on clean architecture, useful interfaces, and thoughtful user experiences. I care about writing code that is maintainable, accessible, and purposeful.',
      'I''m a software developer who enjoys solving real problems with clean, well-structured code. My work spans frontend and backend, from building responsive interfaces with React and Next.js to designing REST APIs and working with relational databases. I believe great software starts with understanding the people who will use it.',
      'I believe software should be purposeful. Every line of code should serve the user, not just the developer. I focus on readability, maintainability, and creating interfaces that people actually enjoy using.',
      'Open source, System design, Clean architecture, Developer tooling, UI/UX design',
      'Advanced TypeScript patterns, System design & distributed systems, DevOps & CI/CD pipelines',
      'heinminthant.dev@gmail.com',
      'Myanmar',
      'Open to work',
      true
    )
  `;
  console.log("site_settings seeded");

  const skills = [
    ["Languages", "JavaScript", 90], ["Languages", "TypeScript", 85],
    ["Languages", "Python", 80], ["Languages", "PHP", 75],
    ["Languages", "C", 65], ["Languages", "Java", 60],
    ["Frontend", "React", 90], ["Frontend", "Next.js", 85],
    ["Frontend", "React Native", 70], ["Frontend", "HTML & CSS", 90],
    ["Frontend", "Tailwind CSS", 88],
    ["Backend", "Node.js", 82], ["Backend", "Laravel", 78], ["Backend", "REST APIs", 85],
    ["Database", "MySQL", 80], ["Database", "PostgreSQL", 82],
    ["Tools", "Git", 88], ["Tools", "GitHub", 90], ["Tools", "Docker", 68], ["Tools", "Linux", 75],
  ];
  for (let i = 0; i < skills.length; i++) {
    const [category, name, level] = skills[i];
    await sql`insert into skills (category, name, level, sort_order) values (${category}, ${name}, ${level}, ${i})`;
  }
  console.log("skills seeded");

  const projects = [
    {
      title: "Weather Data Mining",
      description:
        "A data-analysis project focused on collecting, processing, and visualizing weather information from multiple sources to uncover patterns and trends.",
      technologies: "Python, Data Mining, Visualization, Pandas",
      category: "Data Science",
      year: "2025",
      repo_url: "https://github.com/heinminthantt",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "A full-stack task management application with real-time updates, team collaboration features, and an intuitive drag-and-drop interface.",
      technologies: "React, Node.js, PostgreSQL, REST API",
      category: "Full Stack",
      year: "2025",
      repo_url: "https://github.com/heinminthant",
      featured: true,
    },
    {
      title: "E-Commerce Platform",
      description:
        "A responsive multi-vendor marketplace with product filtering, cart management, secure checkout flow, and admin dashboard.",
      technologies: "Next.js, TypeScript, Tailwind CSS, MySQL",
      category: "Web Application",
      year: "2024",
      repo_url: "https://github.com/heinminthant",
      featured: true,
    },
    {
      title: "Portfolio Website",
      description:
        "A deep-space themed portfolio with a fully editable Supabase backend, canvas starfield, and motion choreography.",
      technologies: "Next.js, TypeScript, Supabase, Tailwind CSS",
      category: "Frontend",
      year: "2026",
      live_url: "https://heinminthant.com",
      repo_url: "https://github.com/heinminthant",
      featured: false,
    },
  ];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await sql`
      insert into projects (title, description, technologies, category, year, live_url, repo_url, featured, sort_order)
      values (${p.title}, ${p.description}, ${p.technologies}, ${p.category}, ${p.year},
              ${p.live_url ?? ""}, ${p.repo_url ?? ""}, ${p.featured}, ${i})
    `;
  }
  console.log("projects seeded");

  await sql`
    insert into experience (company, role, date_range, location, description, skills, sort_order)
    values (
      'METATEAM Myanmar Co., Ltd.',
      'Software Development Intern',
      '2026',
      'Myanmar',
      'Worked on authentication, webhook APIs, candidate management, mail templates, and Laravel-based web application development.',
      'Laravel, PHP, REST APIs, Authentication, Web Development',
      0
    )
  `;
  console.log("experience seeded");

  await sql`
    insert into education (university, degree, major, year_range, coursework, sort_order)
    values (
      'University of Computer Studies',
      'Bachelor of Computer Science',
      'Computer Science',
      '2022 - Present',
      'Data Structures & Algorithms, Database Systems, Software Engineering, Web Development',
      0
    )
  `;
  console.log("education seeded");

  const certs = [
    [
      "Meta Android Developer Professional Certificate",
      "Meta",
      "2024",
      "Comprehensive program covering Android app development with Kotlin, Jetpack Compose, and modern Android architecture patterns.",
      "https://coursera.org/verify/professional-cert",
    ],
    [
      "UI/UX Design Certificate",
      "Google",
      "2024",
      "Foundations of user experience design, including research, wireframing, prototyping, and usability testing.",
      "",
    ],
    [
      "Software Development Internship Certificate",
      "METATEAM Myanmar Co., Ltd.",
      "2026",
      "Completed internship program covering full-stack development, API design, and team collaboration in a production environment.",
      "",
    ],
  ];
  for (let i = 0; i < certs.length; i++) {
    const [title, issuer, year, description, url] = certs[i];
    await sql`
      insert into certificates (title, issuer, issue_year, description, credential_url, sort_order)
      values (${title}, ${issuer}, ${year}, ${description}, ${url}, ${i})
    `;
  }
  console.log("certificates seeded");

  const socials = [
    ["GitHub", "https://github.com/heinminthant"],
    ["LinkedIn", "https://linkedin.com/in/heinminthant"],
    ["Email", "mailto:work@heinminthant.com"],
  ];
  for (let i = 0; i < socials.length; i++) {
    await sql`insert into social_links (platform, url, sort_order) values (${socials[i][0]}, ${socials[i][1]}, ${i})`;
  }
  console.log("social_links seeded");
}

main()
  .then(() => sql.end())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
