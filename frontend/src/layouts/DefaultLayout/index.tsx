import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { LayoutContainer, ContentArea } from './styles';

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </LayoutContainer>
  );
}