import { Bentham } from 'next/font/google'
import React from 'react'
import { Vortex } from '../ui'
import { BentoGrid, BentoGridItem } from '../ui/BentoGrid'
import { gridItemsData } from '@/data'

const Grid = () => {

  return (
    <section id="about">
      <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={300}
          baseHue={220}
          className=""
        >
        <BentoGrid className="max-w-4xl mx-auto">
          {gridItemsData.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
    </Vortex>
    </section>
  )
}

export default Grid