export const syncUser = async (user: {
  clerkId: string;
  firstName?: string;
  lastName?: string;
  email: string;
},
token:string,
) => {
     console.log("SYNC START");
     console.log(user);
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/sync`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await token}`,
        },
        body: JSON.stringify({
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      }
    );
    return response.json();
    
  } catch (err) {
    console.log('SYNC ERROR');
    console.log(err);
  }
};