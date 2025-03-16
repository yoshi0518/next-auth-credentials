import { auth } from '@/auth';

import { WhoAmIApi } from './who-am-i-api';
import { WhoAmIServerAction } from './who-am-i-server-action';

const Page: React.FC = async () => {
  const session = await auth();
  console.log({ session });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Test Route</h1>
      </div>
      <div>User: {session?.user?.name}</div>
      <WhoAmIServerAction />
      <WhoAmIApi />
    </main>
  );
};

export default Page;
