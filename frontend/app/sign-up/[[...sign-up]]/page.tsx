import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
  searchParams?: {
    redirect_url?: string;
  };
};

export default function SignUpPage({
  searchParams,
}: Readonly<SignUpPageProps>) {
  const redirectUrl = searchParams?.redirect_url || "/";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        forceRedirectUrl={redirectUrl}
        fallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}
