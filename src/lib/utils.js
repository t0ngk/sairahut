const nameCheatSheet = {
  'alola': {
    text: 'Alola',
    type: 'prefix'
  },
  'mega' : {
    text: 'Mega',
    type: 'prefix'
  },
  'galar': {
    text: 'Galar',
    type: 'prefix'
  },
  'gmax': {
    text: 'Gigantamax',
    type: 'prefix'
  }
}

export let capitalize = (content) => {
  return content.charAt(0).toUpperCase() + content.slice(1);
}

export let covertToPokemonName = (name) => {
  name = name.split('-');
  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    if (nameCheatSheet[element]) {
      if (nameCheatSheet[element].type === 'prefix') {
        name.splice(0, 0, nameCheatSheet[element].text)
        name.splice(index + 1, 1);
      }
    }
  }
  return name.map(capitalize).join(' ')
}
