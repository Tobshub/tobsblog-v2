import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/",
  author: "Tobani Esan-George",
  desc: "Portfolio and Blog",
  title: "Tobsblog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
};

export const PROJECTS = [
  {
    name: "Tuu-Duu",
    github: "https://github.com/Tobshub/Tuu-Duu",
    link: "https://tuu-duu.netlify.app",
    description: "Project planner and habit tracker web app",
    active: true,
  },
  {
    name: "TobsDB",
    github: "https://github.com/Tobshub/tobsdb",
    description:
      "A database built in in Golang, with a custom schema declaration syntax and easy to use queries",
    active: true,
  },
  {
    name: "Present Worship",
    link: "https://presentworship.pages.dev",
    description: "Presentation software for Church to use during services",
    active: true,
  },
  {
    name: "Tobsmg",
    description: "A private image server I built to host and share images",
    github: "https://github.com/Tobshub/remote-img",
    active: true,
  },
  {
    name: "Tobsdraw",
    description: "A simply drawing app built using html canvas",
    active: true,
    github: "https://github.com/Tobshub/tobsdraw",
    link: "https://tobsdraw.vercel.app",
  },
];

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Tobshub",
    linkTitle: "Github",
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/Tobshub",
    linkTitle: "Facebook",
    active: false,
  },
  {
    name: "Instagram",
    href: "https://github.com/Tobshub",
    linkTitle: "Instagram",
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tobani-esan-george",
    linkTitle: "LinkedIn",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:tobanigeorge@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/tobani_io",
    linkTitle: "Twitter",
    active: true,
  },
  {
    name: "Twitch",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: "TikTok",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Skype",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
