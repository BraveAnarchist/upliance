import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link,useNavigate } from 'react-router-dom'

export const navObj = [
  { name: 'Dashboard', to: '/Dashboard', current: false },
  { name: 'Counter', to: '/', current: false },
  { name: 'Form', to: '/Form', current: false },
  { name: 'TextEditor', to: '/TextEditor', current: false },
]


export default function Nav({now}) {
  const navigate=useNavigate();

  return (
 
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 bg-gray-800">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navObj.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={
                      item.name==now ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    
                    }
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={()=>{ localStorage.removeItem("currUser"); navigate("/Login") } }
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              
              <span>Logout</span>
              
            </button>
            
          </div>
        </div>
      </div>


  )
}
