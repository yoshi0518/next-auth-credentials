import { auth } from '@/auth';

const Page: React.FC = async () => {
  const session = await auth();
  console.log({ session });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Auth.js</h1>
      </div>
      <div>
        <pre className="bg-slate-100 p-2 text-sm text-slate-700">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
    </main>
  );
};
export default Page;
