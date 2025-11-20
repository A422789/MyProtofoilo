import React from 'react';
import styled from 'styled-components';

// سنحتفظ بـ StyledWrapper فقط للأنيميشن والحالات الديناميكية
const StyledWrapper = styled.div`
  button {
    /* الخصائص الثابتة تم نقلها إلى كلاسات Tailwind */
    /* نحتفظ فقط بالخصائص التي تتغير مع الحالات */
    transition: all 0.2s;
  }

  button span {
    transition: all 0.3s ease-in-out;
  }

  button svg {
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button:hover span {
    transform: translateX(5em);
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
`;

const Button = () => {
  return (
    <StyledWrapper>
       <a href="#contact">
      <button
        className="
        w-full
       
          font-sans text-[20px]  font-semibold tracking-[1.2px]
          bg-transparent text-[#cea605]
          py-[0.7em] px-[1em] pl-[0.9em]
          flex items-center
          border-2 border-[#cea605] rounded-2xl
          overflow-hidden cursor-pointer
          shadow-[0_0_15px_7px_rgba(206,166,5,0.3)]
        "
      >
       
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={40}
              height={24}
              className="block origin-center"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
        </div>
        <span className="block ml-[0.3em]">
          Hire Me
        </span>
      </button>
      </a>
    </StyledWrapper>
   );
};

export default Button;
