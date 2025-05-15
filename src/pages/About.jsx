import SkillCard from '../components/SkillCard';
import TimelineItem from '../components/TimelineItem';
import EducationItem from '../components/EducationItem';
import crownIcon from '../assets/Icons/Skills/crown.png';
import csharpIcon from '../assets/Icons/Skills/c-sharp.png';
import cplusIcon from '../assets/Icons/Skills/c-plus.png';
import mobileIcon from '../assets/Icons/Skills/mobile.png';
import multiplayerIcon from '../assets/Icons/Skills/multiplayer.png';
import vrIcon from '../assets/Icons/Skills/vr.png';
import analyticsIcon from '../assets/Icons/Skills/analytics.png';
import editorIcon from '../assets/Icons/Skills/editor.png';
import monetizationIcon from '../assets/Icons/Skills/monetization.png';
import vfxIcon from '../assets/Icons/Skills/vfx.png';
import optimizationIcon from '../assets/Icons/Skills/optimization.png';
import gitIcon from '../assets/Icons/Skills/git.png';
import './About.css';

const About = () => {
  const skills = [
    {
      icon: crownIcon,
      title: 'Unity3D',
      description: '4 years experience'
    },
    {
      icon: csharpIcon,
      title: 'C#',
      description: '6 years experience'
    },
    {
      icon: cplusIcon,
      title: 'C/C++',
      description: '4 years experience'
    },
    {
      icon: mobileIcon,
      title: 'Mobile',
      description: 'Android and iOS'
    },
    {
      icon: multiplayerIcon,
      title: 'Multiplayer',
      description: 'Photon or custom solution'
    },
    {
      icon: vrIcon,
      title: 'AR/VR',
      description: 'Oculus, SteamVR, HTC Vive'
    },
    {
      icon: analyticsIcon,
      title: 'Analytics',
      description: 'Firebase, Amplitude, UGS'
    },
    {
      icon: editorIcon,
      title: 'Editor Scripting',
      description: 'Custom engine tools'
    },
    {
      icon: monetizationIcon,
      title: 'Monetization',
      description: 'Google AdMob and Unity Ads'
    },
    {
      icon: vfxIcon,
      title: 'VFX',
      description: 'Particles, Light Baking, Post-processing, Shadering'
    },
    {
      icon: optimizationIcon,
      title: 'Optimization',
      description: 'Profile Analysis, batching'
    },
    {
      icon: gitIcon,
      title: 'Git',
      description: 'branch, pull request'
    }
  ];

  const workExperience = [
    {
      company: 'Lumighost Ltd',
      period: '03/2023 - 11/2024',
      title: 'Unity Lead Developer',
      achievements: [
        'Led a team of 5 developers and artists, creating scalable architecture for projects.',
        'Mentored junior developers and improved PR workflow.',
        'Worked with clients, providing technical consulting and project estimating.'
      ],
      projects: [
        { name: 'Samurai Warlords', link: 'project.html?name=Samurai%20Warlords' },
        { name: 'Samurai Swords Store', link: 'project.html?name=Samurai%20Swords%20Store' },
        { name: 'NFTicket', link: 'project.html?name=NFTicket' }
      ]
    },
    {
      company: 'Lumighost Ltd',
      period: '01/2022 - 03/2023',
      title: 'Unity Developer',
      achievements: [
        'Developed and maintained interactive games and apps.',
        'Implemented user interfaces and visual effects.'
      ],
      projects: [
        { name: 'Haunted Houses', link: 'project.html?name=Haunted%20Houses' },
        { name: 'Klee Run', link: 'project.html?name=Klee%20Run' },
        { name: 'Magic Swamp', link: 'project.html?name=Magic%20Swamp' },
        { name: 'iBall', link: 'project.html?name=iBall' },
        { name: 'RudderStack', link: 'project.html?name=RudderStack' }
      ]
    },
    {
      company: 'Upwork Freelance',
      period: '05/2021 - 01/2022',
      title: 'Unity Developer',
      achievements: [
        '«Top Rated» status and 100% Job Success.',
        'Collaborated with clients to define project scope, establish milestones, and deliver solutions that met or exceeded expectations.'
      ],
      projects: [
        { name: 'Heroes Auto Battle', link: 'project.html?name=Heroes%20Auto%20Battle' },
        { name: 'Shio', link: 'project.html?name=Shio' },
        { name: 'Flappy Center', link: 'project.html?name=Flappy%20Center' },
        { name: 'DelltaP3', link: 'project.html?name=DelltaP3' },
        { name: 'Wave', link: 'project.html?name=Wave' }
      ]
    }
  ];

  const education = [
    {
      degree: 'Software Engineering (Master)',
      institution: 'Taras Shevchenko National University of Kyiv',
      period: '2021 - 2023'
    },
    {
      degree: 'Software Engineering (Bachelor)',
      institution: 'Taras Shevchenko National University of Kyiv',
      period: '2017 - 2021'
    }
  ];

  return (
    <main>
      <h1 className="main-title">
        Artur Kashuba<br />
        <span className="subtitle">Unity Developer</span>
      </h1>

      <section className="section summary">
        <h2>Summary</h2>
        <p>
          Unity Developer with 4+ years of experience. I have delivered 15+ published games and achieved 100K+ downloads on Play Market. 
          Expertise in scalable architecture, multiplayer systems, and team management. 
          Proficient in end-to-end development, from prototyping to launch, across PC, mobile, and VR platforms.
        </p>
      </section>

      <section className="section">
        <h2>Skills</h2>
        <div className="skills-container">
          {skills.map((skill) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Work Experience</h2>
        <div className="timeline">
          {workExperience.map((experience) => (
            <TimelineItem
              key={`${experience.company}-${experience.period}`}
              {...experience}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Education</h2>
        {education.map((item) => (
          <EducationItem
            key={item.degree}
            {...item}
          />
        ))}
      </section>
    </main>
  );
};

export default About; 