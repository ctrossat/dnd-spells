import { promises as fs } from 'fs';
import {SpellBlock} from './spellBlock';
import Search from './search';
import toHTML from "@/lib/remark";

async function getAideDDSpells(){
  const file = await fs.readFile(process.cwd() + '/app/aidedd.html', 'utf8');

  const unparsedSpells = file.split('<div class="bloc">')

  unparsedSpells.shift()  

  let spells = []

  const parse = (foo, startString, endString)=> {
    const start=foo.indexOf(startString)
    const end= foo.indexOf(endString)
    const result = foo.slice(start ,end)

    return result != '' ? result.slice(startString.length) : undefined
  }

  await Promise.all(unparsedSpells.map(async (raw) => {

    const desc = await toHTML(parse(raw,'<!--Description-->', '<!--/Description-->'))

    //some spell have a different description starts, wich makes it mean the end string for the duration slice needs to be calculated in advance
    const durationEnd = raw.indexOf('<p class="resume">') != -1 
      ? '</div><p class="resume">' 
      : '</div><div class="description'

    //same as above but even sillier cuz they just have a space of difference
    const descStart = raw.indexOf('<p class="resume">') != -1 
      ? '<div class="description">' 
      : '<div class="description ">'

    let spell = {
      name: parse(raw,'<h1>', '</h1>'),
      alias: parse(raw,'<div class="trad">', '</div><div class="ecole">'),
      levelSchool: parse(raw,'<div class="ecole">', "</div><div><strong>Temps d'incantation"),
      castingTime: parse(raw,"<strong>Temps d'incantation</strong> : ", '</div><div><strong>Portée'),
      range: parse(raw,'<strong>Portée</strong> : ', '</div><div><strong>Composantes'),
      duration: parse(raw,'<div><strong>Durée</strong> : ', durationEnd),
      description: parse(raw,descStart, '</div></div>') ,
    }

    spells.push(spell)
  }));

  return spells
}

export default async function Home() {

  const aideDDSpells = await getAideDDSpells()

  return (
    <>
    <Search spells={aideDDSpells} />
    </>
  );
}