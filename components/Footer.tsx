import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const socialLinks = [
  { name: "GitHub", icon: Github },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Twitter", icon: Twitter },
]

const Footer = () => {
  return (
    <div className="bg-zinc-900 w-full">
      <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-20 px-6 lg:px-20 py-10">
        <div className='flex flex-col gap-3'>
          <h2 className='text-xl md:text-2xl font-bold text-white'>LearnX</h2>
          <p className="text-xs md:text-sm text-gray-400">LearnX is a community-driven platform where anyone can learn anything in simple, structured steps.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-xl md:text-2xl font-bold text-white'>Quick Links</h2>
          {["Home", "About", "Roadmap", "Features", "Contact"].map((link) => (
            <a key={link} href={`/#${link.toLowerCase()}`} className="text-gray-400 hover:text-blue-500 text-sm md:text-base hover:animate-pulse">
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className='text-xl md:text-2xl font-bold text-white'>Connect</h2>
          {socialLinks.map(({ name, icon: Icon }) => (
            <Link key={name} href={`https://www.${name.toLowerCase()}.com/learnx`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-sm md:text-base flex items-center gap-2 hover:animate-pulse">
              <Icon className="h-5 w-5 md:h-7 md:w-7" />
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer