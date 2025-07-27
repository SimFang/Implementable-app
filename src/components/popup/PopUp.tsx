
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/navigation';
import './popup.css';

export type PopupContent = {
  title: string;
  description: string;
  imageUrl: string;
  onClose?: () => void;
  linkUrl?: string;
  buttonText?: string;
};

export type PopupProps = PopupContent & {
  isOpen: boolean;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, description, imageUrl, linkUrl, buttonText }) => {
  const router = useRouter();

  const handleLinkClick = () => {
    if (linkUrl) {
      router.push(linkUrl);
      onClose(); // Close the popup after redirect
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="popup-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-image-container">
              <img
                src={imageUrl}
                alt="Popup Visual"
                className="popup-image"
              />
            </div>
            <div className="popup-content">
              <h2 className="popup-title">{title}</h2>
              <p className="popup-description">{description}</p>
              <div className="popup-buttons">
                {linkUrl && buttonText && (
                  <button
                    onClick={handleLinkClick}
                    className="popup-action-button"
                  >
                    {buttonText}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="popup-close-button"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
