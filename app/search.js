'use client'

import { useState } from "react"
import { SpellBlock } from "@/app/spellBlock"

export default function Search ({spells}){

    const [search, setSearch] = useState('')

    return (
        <div className="flex flex-col p-10">
            <h1 className='text-2xl mb-4'>DND 5E (2014) Fast Spell List (I did what they wouldn't)</h1>
            <input className="py-1 px-2 border-2 border-gray-300 rounded-lg text-lg mb-4 w-1/2" placeholder='Your spell here' onChange={e => setSearch(e.target.value)}/>
            <div className='flex flex-col gap-y-8'>
                {spells.map((spell) => {
                    return (<SpellBlock key={spell.name} {...spell} search={search}/>)
                })}
            </div>
        </div>
    )
}