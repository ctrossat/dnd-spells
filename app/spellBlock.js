'use client'

import { useState } from "react"

export function SpellBlock({
    name,
    alias, 
    levelSchool, 
    castingTime, 
    range, 
    duration,
    description,
    search
}){

    const [expend, setExpend] = useState(false)

    if (name.toLowerCase().includes(search.toLowerCase()) || alias.toLowerCase().includes(search.toLowerCase())){
        return (
            <div className='flex flex-col px-4 py-2 rounded-md shadow-md z-20 hover:bg-gray-100 hover:shadow-lg'>
                <div className='cursor-pointer' onClick={()=>setExpend(!expend)}>
                    <h2 className='text-lg'>{name} <span className="opacity-90 ml-2 text-[1.065rem]">{alias}</span></h2>
                    <p className="capitalize">{levelSchool}</p>
                </div>
                {expend &&  (
                    <div>
                        <p>Temps d'incantation : {castingTime} </p>
                        <p>Portée : {range} </p>
                        <p>Durée: {duration}</p>
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