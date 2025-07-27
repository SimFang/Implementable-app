import PopupProps from '@/components/popup/PopUp'
import { useState } from 'react';

export const usePopup = () => {
    const [popup, setPopup] = useState<typeof PopupProps | null>(null);
    const open = (props: typeof PopupProps) => setPopup(props);
    const close = () => setPopup(null);
    return { popup, open, close };
  };

