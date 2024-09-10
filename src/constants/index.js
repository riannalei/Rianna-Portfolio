export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Work',
        href: '#work',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];

export const myProjects = [
    {
        title: 'Leaf & Carry',
        desc: 'Leaf & Carry is a customizable e-commerce platform for eco-friendly tote bags, built with Next.js, React, Node.js, and MongoDB. It features a sleek user interface, secure payments, and a dynamic tote bag configurator to personalize designs effortlessly.',
        subdesc:
            'Leaf & Carry includes an admin dashboard for managing orders and tracking customer engagement, enhancing operational efficiency. It integrates secure authentication and payment processing with Kinde, and offers real-time drag-and-drop file uploads, providing a seamless and secure shopping experience.',
        href: 'https://leaf-and-carry.vercel.app/',
        texture: '/textures/project/project1.mp4',
        logo: '/assets/cactuspointy.svg',
        logoStyle: {
            backgroundColor: '#60f5a1',
            background:
                'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
            border: '0.2px solid rgba(208, 213, 221, 1)',
            boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'Next.js',
                path: '/assets/nextjs.png',
            },
            {
                id: 3,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 4,
                name: 'Node.js',
                path: '/assets/nodejs.png',
            },
        ],
    },
    {
        title: 'TaskStars',
        desc: 'An AI-powered task management app with real-time productivity tracking and social leaderboards to promote user engagement and competition. Built with Next.js, React, Node.js/Express, and MongoDB.',
        subdesc:
            'The TaskStars app features intelligent task planning with OpenAI integration to auto-fill outlines and notes, helping users stay organized and productive. It also includes a \'lock-in\' mode to track focused work time, along with friend challenges and leaderboards to add a social and competitive element to task management.',
        href: 'https://github.com/taskStars/TaskStarsProd',
        texture: '/textures/project/project2.mp4',
        logo: '/assets/iconstar.svg',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Next.js',
                path: '/assets/nextjs.png',
            },
            {
                id: 2,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 3,
                name: 'Node.js',
                path: '/assets/nodejs.png',
            },
            {
                id: 4,
                name: 'Mongo DB',
                path: '/assets/mongodb.png',
            },
        ],
    },
    {
        title: 'Personal Portfolio',
        desc: 'My personal portfolio!',
        subdesc:
            'It showcases interactive 3D elements using Three.js, creating a visually engaging experience. It highlights Rianna\'s skills and projects with dynamic animations, responsive design, and smooth navigation, offering an immersive way to explore my work and expertise in web development.',
        href: 'https://riannalei.com',
        texture: '/textures/project/project4.mp4',
        logo: '/assets/portfo.png',
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'Three.js',
                path: 'assets/threejs.png',
            },
            {
                id: 3,
                name: 'Node.js',
                path: '/assets/nodejs.png',
            },
            {
                id: 4,
                name: 'Tailwind CSS',
                path: '/assets/tailwindcss.png',
            },
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'CodePath Web Development',
        pos: 'Scholar',
        duration: '2023 - 2024',
        title: "Completed three bootcamps in front-end web development and technical interview prep. Built dynamic web applications using HTML, CSS, JavaScript, Flexbox, CSS Grid, and React to create interactive user experiences.",
        icon: '/assets/codepath.png',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'Google’s Computer Science Summer Institute',
        pos: 'Intern/Scholar',
        duration: '2022 - 2022',
        title: "Participated in a four-week intensive web development course led by Google engineers, enhancing skills in HTML, CSS, and JavaScript through daily challenges and collaborative projects. Developed a final web project presented to Google employees, showcasing teamwork, problem-solving, and technical expertise.",
        icon: '/assets/google.png',
        animation: 'clapping',
    },
];