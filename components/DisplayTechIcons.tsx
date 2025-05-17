import { cn, getTechLogos } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)
  return (
    <div className="flex">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
          className={cn(
            'relative group bg-dark-300 rounded-full p-2 flex-center',
            index >= 1 && '-ml-1'
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image src={url} alt={tech} width={21} height={19} />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons
