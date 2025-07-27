import React from 'react';

const GetStartedButton = ({ onClick }: { onClick?: () => void }) => {
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '9999px', // pill shape
    background: 'linear-gradient(to right, #6379AA, #000000)', // indigo to black
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
    fontFamily : "Aspekta"
  };

  const hoverStyle: React.CSSProperties = {
    opacity: 0.9,
  };

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
    >
      get started
    </button>
  );
};

export default GetStartedButton;