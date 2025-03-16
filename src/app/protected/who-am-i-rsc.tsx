import { auth } from '@/auth';

export const WhoAmIRSC = async () => {
  const session = await auth();
  return <div className="mt-5">Who am I (RSC): {session?.user?.name}</div>;
};
