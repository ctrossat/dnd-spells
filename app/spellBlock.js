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
    description,
    search
}){

    const [expend, setExpend] = useState(false)

    if (name.toLowerCase().includes(search) || alias != undefined && alias.toLowerCase().includes(search)){
        return (
            <div className='flex flex-col px-4 py-2 rounded-md hover:bg-gray-200'>
                <div className='cursor-pointer' onClick={()=>setExpend(!expend)}>
                    <h2 className='text-lg'>
                    {name} {alias && '| '+ alias}
                    </h2>
                    <p>{type} de niveau {level}</p>
                </div>
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
}
