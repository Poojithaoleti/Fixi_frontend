import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';

const featured = {
  category: 'AC Maintenance',
  title: 'Complete Guide to AC Servicing: What to Expect and When to Call a Pro',
  excerpt: 'Your AC works overtime during summer — here\'s everything you need to know about maintenance schedules, warning signs, and when DIY stops being enough.',
  author: 'Anjali Verma',
  date: 'Mar 20, 2026',
  readTime: '6 min read',
  img: '/blog-ac.jpg',
};

const articles = [
  {
    category: 'Plumbing',
    title: '7 Plumbing Issues You Should Never Ignore',
    excerpt: 'Small leaks become big bills. We break down the warning signs every homeowner needs to watch for.',
    readTime: '4 min',
    img: '/blog-plumbing.jpg',
  },
  {
    category: 'Cleaning',
    title: 'The Ultimate Deep Clean Checklist for Your Home',
    excerpt: 'From ceiling fans to behind the fridge — the room-by-room cleaning guide professionals swear by.',
    readTime: '5 min',
    img: '/blog-cleaning.jpg',
  },
  {
    category: 'Electrical',
    title: 'When to DIY and When to Call an Electrician',
    excerpt: 'Some electrical work is safe for homeowners. Some absolutely isn\'t. Know the difference before you touch anything.',
    readTime: '3 min',
    img: '/blog-ac.jpg',
  },
  {
    category: 'Home Care',
    title: 'Monsoon-Proof Your Home: 10 Prep Steps',
    excerpt: 'Before the rains hit, take these steps to protect your walls, wiring, and plumbing from water damage.',
    readTime: '5 min',
    img: '/blog-cleaning.jpg',
  },
  {
    category: 'AC Repair',
    title: 'Why Your AC Smells Weird & How to Fix It',
    excerpt: 'Musty, burning, or fishy smells from your AC are never normal. Here\'s what each odor means.',
    readTime: '3 min',
    img: '/blog-ac.jpg',
  },
  {
    category: 'Appliances',
    title: 'Washing Machine Making Noise? Read This First',
    excerpt: 'Banging, grinding, or squealing? Before calling a technician, check these DIY fixes.',
    readTime: '4 min',
    img: '/blog-plumbing.jpg',
  },
];

export default function Blog() {
  return (
    <section id="blog" style={{ padding: 'var(--section-py) 0', background: '#F8F5FF' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label">
            ✦ Resources
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A2E', marginBottom: 12 }}>
            FIXI Tips & Guides
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: '#6B6B8A', fontSize: 17 }}>
            Expert advice to keep your home in top shape.
          </motion.p>
        </div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="blog-featured" style={{
            background: 'white', borderRadius: 20,
            boxShadow: '0 4px 24px rgba(62,42,86,0.1)',
            overflow: 'hidden', display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginBottom: 40,
          }}>
          <div style={{ overflow: 'hidden', minHeight: 280 }}>
            <img src={featured.img} alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{
              display: 'inline-block',
              background: '#EDE6F8', color: '#6B4A8F',
              padding: '4px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700,
              marginBottom: 16, width: 'fit-content',
            }}>{featured.category}</span>
            <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#1A1A2E', marginBottom: 14, lineHeight: 1.3 }}>
              {featured.title}
            </h3>
            <p style={{ color: '#6B6B8A', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              {featured.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, fontSize: 13, color: '#9B8AB0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={13} />{featured.author}</span>
              <span>•</span>
              <span>{featured.date}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} />{featured.readTime}</span>
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
              color: 'white', borderRadius: 50, padding: '12px 24px',
              fontWeight: 600, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 8, width: 'fit-content',
              transition: 'all 0.3s',
            }}>
              Read More <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {articles.map((article, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(62,42,86,0.15)' }}
              style={{
                background: 'white', borderRadius: 16,
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(62,42,86,0.08)',
              }}>
              <div style={{ height: 160, overflow: 'hidden' }}>
                <img src={article.img} alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <span style={{
                  display: 'inline-block',
                  background: '#EDE6F8', color: '#6B4A8F',
                  padding: '3px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700,
                  marginBottom: 10,
                }}>{article.category}</span>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 8, lineHeight: 1.4, fontFamily: 'var(--font-sans)' }}>
                  {article.title}
                </h4>
                <p style={{ color: '#7A7A9A', fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{article.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#9B8AB0', fontSize: 12 }}>
                    <Clock size={12} />{article.readTime}
                  </span>
                  <span style={{ color: '#6B4A8F', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Read More <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #3E2A56, #6B4A8F)',
            borderRadius: 20, padding: '48px 40px', marginTop: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, flexWrap: 'wrap',
          }}>
          <div>
            <h3 style={{ color: 'white', fontSize: 22, marginBottom: 6 }}>Get weekly home care tips</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Join 20,000+ homeowners who trust FIXI's advice</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input placeholder="Enter your email"
              style={{
                background: 'white', border: 'none', borderRadius: 50,
                padding: '12px 20px', fontSize: 14, outline: 'none',
                minWidth: 240, fontFamily: 'var(--font-sans)',
              }} />
            <button style={{
              background: 'white', color: '#3E2A56', borderRadius: 50,
              padding: '12px 24px', fontWeight: 700, fontSize: 14,
              transition: 'all 0.3s',
            }}>Subscribe</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
