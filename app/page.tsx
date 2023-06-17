'use client'
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
	const { data: session, status } = useSession();
	const loading = status === 'loading';
	const router = useRouter();

	if (loading) {
		return <div>Loading...</div>
	}

	const isLoggedIn = !!session?.user;


	return (
		<div>
      {
        loading ? null : (
          <div>
              {
              session?.user ? <div>logged in</div>: <div>not logged in</div>
              }
          </div>
        )
      }
    </div>
	);
}
