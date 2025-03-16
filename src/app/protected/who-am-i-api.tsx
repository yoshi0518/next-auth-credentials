'use client';

import { useEffect, useState } from 'react';

export const WhoAmIApi: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    void fetch('/api/whoami')
      .then((res) => res.json())
      .then(({ user }: { user: string }) => setUser(user));
  }, []);

  return <div className="mt-5">Who am I (client): {user}</div>;
};
