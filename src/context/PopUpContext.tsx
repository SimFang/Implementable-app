
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PopupProps } from '@/components/popup/PopUp';
import Popup from '@/components/popup/PopUp';

export type PopupContent = {
  title: string;
  description: string;
  imageUrl: string;
  onClose?: () => void;
  linkUrl?: string;
  buttonText?: string;
};

type PopupContextType = {
  open: (props: PopupContent) => void;
  close: () => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popup, setPopup] = useState<PopupContent | null>(null);

  const open = (props: PopupContent) => setPopup(props);
  const close = () => {
    if (popup?.onClose) popup.onClose();
    setPopup(null);
  };

  return (
    <PopupContext.Provider value={{ open, close }}>
      {children}
      {popup && (
        <Popup
          isOpen={true}
          onClose={close}
          title={popup.title}
          description={popup.description}
          imageUrl={popup.imageUrl}
          linkUrl={popup.linkUrl}
          buttonText={popup.buttonText}
        />
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error('usePopup must be used within a PopupProvider');
  return context;
};

export default PopupProvider;
