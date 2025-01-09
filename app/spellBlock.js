'use client'

import { useState } from "react"

export function SpellBlock ({
    name,
    alias, 
    type, 
    level, 
    castingTime, 
    range, 
    concentration, 
    duration,
    description
}){

    const [expend, setExpend] = useState(false)

    return (
        <div 
            className='flex flex-col cursor-pointer px-4 py-2 rounded-md hover:bg-gray-200' 
            onClick={()=>setExpend(!expend)}
            >
            <h2 className='text-lg'>
              {name} {alias && '| '+ alias}
            </h2>
            <p>{type} de niveau {level}</p>
            {expend &&  (
                <div>
                    <p>{castingTime} </p>
                    <p>{range} </p>
                    <p>Durée: {concentration && 'Concentration '} {duration}</p>
                    <div 
                        className="flex flex-col gap-y-2 mt-2"
                        dangerouslySetInnerHTML={{__html: description}}
                        />
                </div>
            )}
          </div>
    )
}
