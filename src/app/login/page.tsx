import { auth } from '@/auth';

import { Form } from './form';

const Page: React.FC = () => {
  const session = auth();
  console.log({ session });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <Form />
      </div>
    </main>
  );
};
export default Page;
