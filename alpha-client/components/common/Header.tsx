import Image from "next/image"
import { IoMdLogIn } from "react-icons/io"

const Header = () => {
    return (
        <div className='flex w-full items-center shadow-md h-16 px-4 border-b bg-white border-gray-300 dark:bg-black'>
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
                <Image src="/alpha-news.jpg" alt="Alpha News Logo" width={50} height={50} />

                {/* center */}
                {/* <div className="flex items-center space-x-2 md:space-x-4 text-sm text-gray-700">
                    <a href="#" className=" dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors  border px-3 py-1 border-gray-400 rounded-3xl">Home</a>
                    <a href="#" >About</a>
                    <a href="#" className=" dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border px-3 py-1 border-gray-400 rounded-3xl">Contact</a>

                </div> */}

                <div className="flex items-center gap-4 md:gap-8 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors  border px-8 py-2 border-gray-400 rounded-3xl">
                    <a href="#" >Home</a>
                    <a href="#" >About</a>
                    <a href="#" >Contact</a>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center gap-1 cursor-pointer border px-4 py-2 border-gray-400 rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                        <span className="hidden md:block">Login</span>
                        <IoMdLogIn size={18} className="text-gray-700 dark:text-gray-300 font-light" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header
