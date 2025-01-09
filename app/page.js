import { promises as fs } from 'fs';
import {SpellBlock} from './spellBlock';
import toHTML from "@/lib/remark";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/app/spells.md', 'utf8');

  const unparsedSpells = file.split('# <!--Name-->')

  let spells = []

  const parse = (foo, startString, endString)=> {
    const start=foo.indexOf(startString)
    const end= foo.indexOf(endString)
    const result = foo.slice(start ,end)

    return result != '' ? result.slice(startString.length) : undefined
  }

  const parseBool = (foo, startString, endString) => {
    let result = parse(foo, startString, endString)


    return result === undefined ? false : true
  }

  unparsedSpells.forEach(( raw) => {

    // const desc = await toHTML(parse(raw,'<!--Description-->', '<!--/Description-->')) 

    let spell = {
      name: raw.slice(0,raw.indexOf('<!--/Name-->')),
      alias: parse(raw,'<!--AltName-->[', '](spells_vo.md'),
      type: parse(raw,'<!--Type-->', '<!--/Type-->'),
      level: parse(raw,'<!--Level-->', '<!--/Level-->'),
      castingTime: parse(raw,'<!--CastingTime-->', '<!--/CastingTime-->'),
      range: parse(raw,'<!--Range-->', '<!--/Range-->'),
      duration: parse(raw,'<!--Duration-->', '<!--/Duration-->'),
      description: parse(raw,'<!--Description-->', '<!--/Description-->'),
      concentration: parseBool(raw,'<!--Concentration-->', '<!--/Concentration-->'),
    }

    spells.push(spell)

  })

  console.log(spells);
  

  //removes useless stuff at top of md file
  spells.splice(0,2)

  return (
    <div className='flex flex-col gap-y-8 p-10'>
      {spells.map((spell) => {
        return (<SpellBlock {...spell}/>)
      })}
    </div>
  );
}