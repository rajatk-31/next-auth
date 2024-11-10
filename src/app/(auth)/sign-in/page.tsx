"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <div>
          Not signed in <br />
          <button
            className="bg-blue-500 px-2 rounded-sm ml-2"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div>
          Signed in as {session.user.email} <br />
          <button className="bg-red-400" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
