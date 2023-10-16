import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { logout } from '../lib/auth'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const navigate = useNavigate()
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    const checkForToken = () => {
      const token = localStorage.getItem('access-token')
      setHasToken(!!token) // Convert to boolean and set state
    }

    // Check for token initially
    checkForToken()

    // Add event listener to listen for localStorage changes
    window.addEventListener('storage', checkForToken)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', checkForToken)
    }
  }, [])

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center ">
                  <img
                    className="h-12 w-auto"
                    src="/images/logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">

                  {
                    hasToken ? <>
                      <Link
                        to="/session"
                        className={'inline-flex items-center px-1 pt-1 text-sm font-medium text-sky-900'}
                      >
                        Create Session
                      </Link>
                      <Link
                        to="/meditation-sessions"
                        className={'inline-flex items-center px-1 pt-1 text-sm font-medium text-sky-900'}
                      >
                        My Sessions
                      </Link>
                      <Link
                        to="/meditations"
                        className={'inline-flex items-center px-1 pt-1 text-sm font-medium text-sky-900'}
                      >
                        Guided Meditations
                      </Link>
                    </> : <>
                      <Link to="/login"
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-sky-900"
                      >
                        Login
                      </Link>

                      <Link to="/register"
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-sky-900"
                      >
                        Register
                      </Link>
                    </>
                  }

                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                </button>

                {/* Profile dropdown */}
                {
                  hasToken ? <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/images/avatar.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-sky-900')}
                              onClick={() => {
                                logout(setHasToken)
                                toast.success('You\'ve successfully logged out!')
                                navigate('/login')
                              }}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> : <></>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              <Disclosure.Button
                as="div"
                onClick={() => navigate('/session')}
                className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-sky-900"
              >
                Create Session
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                onClick={() => navigate('/meditation-sessions')}
                className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-sky-900"
              >
                My Sessions
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                onClick={() => navigate('/meditations')}
                className="block border-l-4 py-2 pl-3 pr-4 text-base font-medium text-sky-900"
              >
                Guided Meditations
              </Disclosure.Button>
              {
                hasToken ? <></> : <>
                  <Disclosure.Button
                    as="div"
                    onClick={() => navigate('/login')}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 "
                  >
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="div"
                    onClick={() => navigate('/register')}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  >
                    Register
                  </Disclosure.Button></>
              }


            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
