import { motion } from "framer-motion";

import { FaInstagram, FaTimes } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mb-8 ">
      <div className="flex items-center justify-center gap-8 mt-14">
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            size={30}
            className="text-pink-600 hover:text-pink-800 transition-colors"
          />
        </motion.a>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          href="https://www.X.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTimes
            size={30}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          />
        </motion.a>
      </div>
      <p className="mt-4 text-center text-sm tracking-wide text-gray-400">
        &copy;Travel With Comfort
      </p>
    </div>
  );
};
export default Footer;
