import styled, { css } from 'styled-components'

export const Menu = styled.nav`
  margin-top: 45px;
  max-width: 300px;
`

export const ParentList = styled.ul`
  padding-left: 16px;
`

export const ChildList = styled.ul`
  padding-left: 16px;
`

export const Item = styled.li`
  list-style: none;

  margin-top: 2px;

  & > ${ChildList} {
    display: none;
  }

  &.open > ${ChildList} {
    display: block;
  }

  ${({ hasChildren }) =>
    hasChildren &&
    css`
      cursor: pointer;
      position: relative;

      :before {
        content: '\f107';
        color: #f3f3f4;
        position: absolute;
        font-family: FontAwesome;
        font-size: 26px;
        right: 15px;
      }
    `}
`
