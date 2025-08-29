"use client";

import {  UserButton, useUser,  } from "@clerk/nextjs";

const UserSidebar = () => {
  const {user} = useUser();
  return (
    <div className="flex bg-black/15 p-4 rounded-xl items-center pl-4 gap-2 w-3/4">
      <div className="flex items-center gap-3">
        <UserButton />
        <h3 className="text-sm text-white">{user?.emailAddresses[0].emailAddress}</h3>
      </div>
    </div>
  );
};

export default UserSidebar;
