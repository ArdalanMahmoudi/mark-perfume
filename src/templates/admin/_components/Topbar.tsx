
import { Bell, MenuIcon, Search } from 'lucide-react'
import Image from 'next/image'


export const Topbar = ({onMenuClick}) => {
  return (
    <>
      <div className="bg-[#15213c] h-20 w-full flex items-center p-4 justify-between border-b border-[#ffffff1a]">
        <div className="flex items-center px-2 py-1 rounded-md gap-2">
          <button className="flex lg:hidden" onClick={onMenuClick}>
            <MenuIcon className="w-6 h-6 mr-1 text-white" />
          </button>
          <Search className='size-6 text-white' />
          <input type="text" className='flex-1 py-3 font-Vazir-M md:py-2 px-4 md:px-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base' placeholder='Search' />
        </div>
        <div className="flex gap-4 items-center">
          <Bell className='size-6 text-white' />
          <span className='h-6 bg-bs-primary-bg-subtle w-px'></span>
          <Image src={"/"} className='size-12 rounded-full text-sm text-center font-Vazir-L border border-white/10' width={6000} height={4000} alt='عکس پروفایل' />
        </div>
      </div>
      
    </>
  )
}
