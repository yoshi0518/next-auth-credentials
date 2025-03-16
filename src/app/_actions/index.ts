'use server';

import { auth } from '@/auth';

export const onGetUserAction = async () => {
  const session = await auth();
  return session?.user?.name ?? null;
};
