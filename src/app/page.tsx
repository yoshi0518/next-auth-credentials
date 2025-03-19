import { logoutAction } from '@/app/_actions';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

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
      <div>
        <Button
          onClick={logoutAction}
          type="button"
          variant="outline"
          className="cursor-pointer"
        >
          ログアウト
        </Button>
      </div>
    </main>
  );
};
export default Page;
