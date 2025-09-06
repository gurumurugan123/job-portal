import React from 'react';
import ChannelCard from '../components/Channelcard';


const ChannelsSection = () => {
  return (
    <section style={{ padding: '3rem 2rem', background: '#DDF4E7', borderRadius: '20px' }}>
      <h2
        style={{
          textAlign: 'center',
          color: '#124170',
          fontSize: '2.2rem',
          fontWeight: '700',
          marginBottom: '2rem',
        }}
      >
        Stay Updated on IT
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap', // allows cards to wrap on smaller screens
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <ChannelCard
            icon="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            title="WhatsApp Channel"
            description="🚀 Stay updated with valuable IT-related content, including job vacancies, interview preparations, and real interview experiences! 💼✨ If you find this useful, follow and share it with your contacts! 🔔📢"
            buttonText="Join WhatsApp"
            link="https://wa.me/1234567890"
            gradient="linear-gradient(135deg, #25D366, #128C7E)"
          />
        </div>

        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <ChannelCard
            icon="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
            title="Telegram Channel"
            description="🚀 Welcome to our IT updates channel! Here, you'll find job vacancies, interview preparation tips, and real interview experiences to help you in your career journey. 💻📊 If this helps, don’t forget to subscribe and share with others! 🔔✨"
            buttonText="Join Telegram"
            link="https://t.me/yourtelegram"
            gradient="linear-gradient(135deg, #0088cc, #005f8d)"
          />
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
