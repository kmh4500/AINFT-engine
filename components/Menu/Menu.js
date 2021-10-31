import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {

  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" tabIndex={tabIndex}>
        AINFT (opensea)
      </a>
      <a className="secondary" href="/data" tabIndex={tabIndex}>
        Data (github)
      </a>
      <a className="secondary" href="/data" tabIndex={tabIndex}>
        Model (gpt2)
      </a>
      <a className="secondary" href="/data" tabIndex={tabIndex}>
        Service (ainize)
      </a>
      <a className="secondary" href="/data" tabIndex={tabIndex}>
        State (blockchain)
      </a>
      <a href="/about" tabIndex={tabIndex}>
        About
      </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
