import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {  useState } from 'react';


const navigation = [
  { name: 'Home', href: '#home', current: true }, 
  { name: 'About', href: '#about', current: false },
  { name: 'Skills', href: '#skills', current: false },
  { name: 'Projects', href: '#projects', current: false },
  { name: 'Contact', href: '#contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join('')
}


export default function NavBar() {
  const [ScrollPosition,setScrollPosition]=useState(0)
window.addEventListener('scroll',function(){
setScrollPosition(this.scrollY)
})

  return (
    <Disclosure as="nav" className={`fixed w-full z-10 shadow-xl bg-black ${ScrollPosition?'bg-transparent  backdrop-blur-3xl ':''}`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-[#725c02]">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden scale-150 text-[#b49106]" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block scale-150 text-[#b49106]" />
            </DisclosureButton>
          </div>

     
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between w-full">
       
            <div className="flex shrink-0 items-center text-[#cac7c7]  text-2xl sm:text-4xl  font-medium tracking-widest  logo">
              AHMED <span className='text-[#cea605]' style={{textShadow:'5px 5px 10px #b49106'}}>AYYAD</span>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex  sm:space-x-0 lg:space-x-12"> 
                {navigation.map((item) => (
                  <a
                
                    onClick={()=>(item.current==false?item.current=true:item.current=true)}
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      
                      item.current ? 'multi-layer-link activeLink px-3 py-2' : 'text-[#7d6400] hover:text-[#e3bc20] multi-layer-link ',
                  
                      'px-3 py-2 text-xl font-medium tracking-wider'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

      
        </div>
      </div>


      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
          {navigation.map((item) => (
            <DisclosureButton
            onClick={()=>(item.current==false?item.current=true:item.current=false)}
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
               
                item.current ? 'multi-layer-link activeLink text-center m-4 ' :' text-[#7d6400] hover:text-[#e3bc20] text-center m-4 multi-layer-link',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}