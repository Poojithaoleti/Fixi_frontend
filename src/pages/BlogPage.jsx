import { motion } from 'framer-motion';
import Blog from '../components/Blog';
import Footer from '../components/Footer';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function BlogPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ paddingTop: 70 }}>
        <Blog />
        <Footer />
      </div>
    </motion.div>
  );
}
