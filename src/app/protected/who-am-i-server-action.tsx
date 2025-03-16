'use client';

import { useEffect, useState } from 'react';
import { onGetUserAction } from '@/app/_actions';

export const WhoAmIServerAction = () => {
  const [user, setUser] = useState<string | null>();

  useEffect(() => {
    void onGetUserAction().then((user) => setUser(user));
  }, []);

  return <div className="mt-5">Who am I (server action): {user}</div>;
};
