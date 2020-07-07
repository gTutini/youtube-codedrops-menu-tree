import React, { useEffect, useState } from 'react'
import './style.css'

import { Menu, ChildList, Item, ParentList } from './styles'

function Tree(data) {
  // pega a tag principal que irá receber o menu
  const tree = document.querySelector('nav#tree')

  // recebe toda a arvore de elementos
  const menu = document.createElement('ul')

  const firstLevel = data.filter((item) => !item.parent)
  const getFirstLis = firstLevel.map(buildTree) // retorno novo array com li's
  getFirstLis.forEach((li) => menu.append(li)) // adicionar li's ao menu

  function buildTree(item) {
    // primeiro elemento
    const li = document.createElement('li')
    li.innerHTML = item.name

    const children = data.filter((child) => child.parent === item.id)

    if (children.length > 0) {
      //adiciona um click para os parents
      li.addEventListener('click', (event) => {
        event.stopPropagation()
        event.target.classList.toggle('open')
      })

      // adiciona uma classe identificadora de que tem filhos
      li.classList.add('has-children')

      // constroi os filhos
      const subMenu = document.createElement('ul')
      children.map(buildTree).forEach((li) => subMenu.append(li))
      li.append(subMenu)
    }

    // adicionar os elements ao menu
    return li
  }

  // adiciona o menu no HTML
  tree.append(menu)
}

const menu = [
  { id: 1, name: 'Desktops', parent: 3 },
  { id: 3, name: 'Computers', parent: 8 },
  { id: 4, name: 'Smartphones', parent: 6 },
  { id: 6, name: 'Portables', parent: 3 },
  { id: 7, name: 'Tablets', parent: 6 },
  { id: 8, name: 'Electronics', parent: null },
  { id: 18, name: 'Camping', parent: null },
  { id: 10, name: 'TV', parent: 8 },
  { id: 20, name: '11 pol', parent: 7 },
  { id: 13, name: 'Remotes', parent: 14 },
  { id: 14, name: 'Accessories', parent: 10 },
  { id: 21, name: 'Table', parent: null },
  { id: 22, name: 'Top', parent: 21 },
]

export default function App() {
  const [firstLevel, setFirstLevel] = useState([])

  function toggleOpen(e) {
    e.stopPropagation()
    e.target.classList.toggle('open')
  }

  function buildTree(item) {
    const children = menu.filter((child) => child.parent === item.id)

    if (children.length > 0) {
      return (
        <Item key={item.id} hasChildren onClick={toggleOpen}>
          {item.name}
          <ChildList>{children.map(buildTree)}</ChildList>
        </Item>
      )
    } else {
      return <Item key={item.id}>{item.name}</Item>
    }
  }

  useEffect(() => {
    const first = menu.filter((item) => !item.parent)
    setFirstLevel(first)

    Tree(menu)
  }, [])

  return (
    <>
      <h2>Menu renderizado pelo React</h2>
      <Menu>
        <ParentList>
          {firstLevel.map((item) => (
            <React.Fragment key={item.id}>{buildTree(item)}</React.Fragment>
          ))}
        </ParentList>
      </Menu>
      <h2>Menu renderizado por JS Puro</h2>
      <nav id="tree"></nav>
    </>
  )
}
