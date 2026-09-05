import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
  searchParams?: {
    redirect_url?: string;
  };
};

export default function SignInPage({
  searchParams,
}: Readonly<SignInPageProps>) {
  const redirectUrl = searchParams?.redirect_url || "/";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        forceRedirectUrl={redirectUrl}
        fallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}
