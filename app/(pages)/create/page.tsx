import Link from 'next/link'
import React from 'react'

const Create = () => {
  return (
    <div className='min-h-screen bg-black text-zinc-100'>
      <div className='w-full text-center flex flex-col items-center justify-center py-20 gap-6'>
        <h2 className='text-3xl font-bold'>Coming soon</h2>
        <Link href="https://github.com/"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
          >Contribute</Link>
      </div>
    </div>
  )
}

export default Create
