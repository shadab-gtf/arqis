import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import ScrollContext from '@/context/ScrollContext';
const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const { gotoFn } = useContext(ScrollContext)


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return ReactDOM.createPortal(
    <header className='py-8 lg:py-[30px] z-[3] fixed left-0 top-0 w-[100%]'>
      <div className='container'>
        <div className='flex cursor-pointer justify-between items-center'>
          <Link
            className='logo'
            onClick={() => gotoFn(0)}
            href={"#"}>
            <Image src='/assets/logo.png' className='logo-black hide-logo-from-hero' width={'120'} height={120} alt="logo" />
            <Image src='/assets/logo-white.png' className='logo-white hide-logo-from-hero' width={'120'} height={120} alt="logo" />
          </Link>
          <div className='flex cursor-pointer items-center gap-10'>
            <Image src='/assets/sound.svg' className='icon span_3 arrow cursor-pointer ' width={'25'} height={25} alt="logo" />
            <div className='flex cursor-pointer  items-center gap-2'>
              <span className='uppercase text cursor-pointer span_1  tracking-[2px]'>Menu</span>
              <span className='border-[50%] cursor-pointer span_2  h-[18px] w-[18px] rounded-full block bg-[#000] circle-pointer'></span>
            </div>
          </div>
        </div>
      </div>
    </header>,
    document.getElementById('header-portal')
  );
};

export default Header;
