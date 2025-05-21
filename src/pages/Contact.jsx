import { useState } from 'react';
import phoneIcon from '../assets/Icons/Social/phone.svg';
import emailIcon from '../assets/Icons/Social/email.svg';
import githubIcon from '../assets/Icons/Social/github.svg';
import linkedInIcon from '../assets/Icons/Social/linkedIn.svg';
import skypeIcon from '../assets/Icons/Social/skype.svg';
import telegramIcon from '../assets/Icons/Social/telegram.svg';
import upworkIcon from '../assets/Icons/Social/upwork.svg';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState('');

  const contactInfo = [
    { icon: phoneIcon, text: '+1 (781) 964-7620', link: 'tel:+17819647620' },
    { icon: emailIcon, text: 'artes5kgc@gmail.com', link: 'mailto:artes5kgc@gmail.com' },
    { icon: githubIcon, text: 'GitHub', link: 'https://github.com/Rockstrip' },
    { icon: linkedInIcon, text: 'LinkedIn', link: 'https://www.linkedin.com/in/artur-kashuba-556b00192/' },
    { icon: skypeIcon, text: 'Skype', link: 'https://join.skype.com/invite/EgwpqlDLFxxX' },
    { icon: telegramIcon, text: 'Telegram', link: 'https://t.me/rockstrip' },
    { icon: upworkIcon, text: 'Upwork', link: 'https://www.upwork.com/freelancers/~01c91a5d470285de31' }
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/mnnnkvwk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setFormData({ email: '', message: '' }); // Очистить поля
      setStatus("Message sent!");
    } else {
      setStatus("Something went wrong.");
    }
  };

  return (
    <main>
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows="5"
            required
          />

          <button type="submit">Send</button>
          {status && <p style={{ color: '#dab900' }}>{status}</p>}
        </form>

        <div className="contact-info">
          <h2>My Contact Info</h2>
          {contactInfo.map((item) => (
            <div key={item.text} className="contact-item">
              <img src={item.icon} alt={`${item.text} Icon`} className="contact-icon" />
              <p>
                <a
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.text}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Contact;
