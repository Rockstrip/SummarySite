import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      icon: '/Resources/Icons/Social/phone.svg',
      text: '+1 (781) 964-7620',
      link: 'tel:+17819647620'
    },
    {
      icon: '/Resources/Icons/Social/email.svg',
      text: 'artes5kgc@gmail.com',
      link: 'mailto:artes5kgc@gmail.com'
    },
    {
      icon: '/Resources/Icons/Social/github.svg',
      text: 'GitHub',
      link: 'https://github.com/Rockstrip'
    },
    {
      icon: '/Resources/Icons/Social/linkedIn.svg',
      text: 'LinkedIn',
      link: 'https://www.linkedin.com/in/artur-kashuba-556b00192/'
    },
    {
      icon: '/Resources/Icons/Social/skype.svg',
      text: 'Skype',
      link: 'https://join.skype.com/invite/EgwpqlDLFxxX'
    },
    {
      icon: '/Resources/Icons/Social/telegram.svg',
      text: 'Telegram',
      link: 'https://t.me/rockstrip'
    },
    {
      icon: '/Resources/Icons/Social/upwork.svg',
      text: 'Upwork',
      link: 'https://www.upwork.com/freelancers/~01c91a5d470285de31'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // The form will be handled by Formspree
    // The form's action attribute takes care of the submission
  };

  return (
    <main>
      <div className="contact-container">
        <form action="https://formspree.io/f/mnnnkvwk" method="POST" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message"
            rows="5"
            required
          />
          
          <button type="submit">Send</button>
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