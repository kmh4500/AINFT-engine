import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu, ChatHome } from '../components';
import FocusLock from 'react-focus-lock';
import Head from 'next/head'
import EnterUsername from '../components/EnterUsername'

export default function Layout({children}) {
  const [open, setOpen] = useState(false);
  const [ content , setContent ] = useState()
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </FocusLock>
        </div>
        <div>
          {children}
        </div>
      </>
    </ThemeProvider>
  );
}
