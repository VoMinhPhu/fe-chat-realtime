'use client';

import React from 'react';
import RequestDashboard from './requests/RequestDashboard';
import MessagesDashboard from './messages/MessagesDashboard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import FriendsDashboard from './friends/FriendsDashboard';

const Dashboard = () => {
  const dashNav = useSelector((state: RootState) => state.dashboard.page);

  if (dashNav === 'requests') return <RequestDashboard />;

  if (dashNav === 'friends') return <FriendsDashboard />;

  return <MessagesDashboard />;
};

export default Dashboard;
