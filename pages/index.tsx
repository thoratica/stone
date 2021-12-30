import { PhotographIcon, UploadIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';
import UserWidget from '../components/UserWidget';

const Home: NextPage = () => {
  const [content, setContent] = useState('');
  const { data: session, status } = useSession();
  const ref = useRef<HTMLDivElement>(null);

  if (status === 'authenticated') console.log('session', session);

  return (
    <div className='flex justify-center gap-x-2 bg-white min-h-screen'>
      <Sidebar />
      <div className='flex h-screen border-l border-gray-100' />
      <div className='max-w-xl w-full'>
        <div className='mt-8 mb-1.5 px-4'>
          <h1 className='font-semibold text-xl'>커뮤니티</h1>
        </div>
        <form className='flex w-full cursor-text px-4 pt-1.5 pb-5 border-b border-gray-100' onClick={() => ref.current?.focus()}>
          <div
            className='h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
            style={{ backgroundImage: `url('${'https://thispersondoesnotexist.com/image'}')` }}
          />
          <div className='w-full mt-1.5'>
            <div className='w-full ml-3'>
              <div
                className='w-full bg-transparent text-[19px] font-[450] z-10 relative max-h-96 focus:outline-none overflow-auto'
                ref={ref}
                onInput={(e) => setContent((e.target as HTMLDivElement).innerText ?? '')}
                contentEditable
              />
              {(content === '' || content === '\n') && (
                <div className='relative'>
                  <div className='absolute -top-7 text-[19px] font-[450] z-0 text-gray-500'>이번에는 어떤 어그로를 끌어볼까요?</div>
                </div>
              )}
            </div>
            <div className='flex items-center mt-2 ml-1.5'>
              <div className='flex items-center gap-x-0.5 h-full text-gray-500 mt-1'>
                <button className='hover:bg-gray-100 transition-colors duration-300 p-1.5 rounded-full'>
                  <PhotographIcon className='h-[18px] w-[18px] stroke-0' />
                </button>
                <button className='hover:bg-gray-100 transition-colors duration-300 p-1.5 rounded-full'>
                  <UploadIcon className='h-[18px] w-[18px]' />
                </button>
              </div>
              <button className='bg-gray-900 hover:bg-gray-700 transition-colors duration-300 text-white text-[15px] font-[550] ml-auto px-4 py-2.5 leading-none rounded-full'>
                돌 던지기
              </button>
            </div>
          </div>
        </form>
        <PostList />
      </div>
      <div className='flex h-screen border-l border-gray-100' />
      <div className='py-8 sticky top-0 h-screen'>
        <UserWidget />
        <button className='p-4 bg-pink-200' onClick={() => signOut()}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Home;
