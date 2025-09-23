"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {  useGetAllFolders } from "@/hooks/use-folders";
import { Folder as FolderType } from "@/types/folders";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  FileText,
  Folder,
  FolderArchive,
  FolderOpen,
  Search,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModalAddFolder from "./modal-add-folder";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import UserSidebar from "./user-sidebar";
import AlertDelete from "./alert-delete";
import ModalAddNote from "./add-note-modal";
const recents = [
  {
    title: "Reflections on the month of june",
    url: "#",
    icon: FileText,
  },
  {
    title: "Project Proposal",
    url: "#",
    icon: FileText,
  },
  {
    title: "Travel Itinerary",
    url: "#",
    icon: FileText,
  },
];

const mores = [
  {
    title: "Favorites",
    url: "/favorites",
    icon: StarIcon,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: Trash2Icon,
  },
  {
    title: "Archive Notes",
    url: "/archive",
    icon: FolderArchive,
  },
];

export function AppSidebar() {
  const { data: foldersData } = useGetAllFolders();

  console.log(foldersData);


  const pathname = usePathname();
  const pathnameEncoded = decodeURIComponent(pathname);

  
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-xl font-bold">Nowted</Link>
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
        </div>
       <ModalAddNote/>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <Separator className="my-1" />

          <SidebarGroupContent>
            <SidebarMenu>
              {recents.map((recent) => (
                <SidebarMenuItem key={recent.title}>
                  <SidebarMenuButton asChild>
                    <Link href={recent.url}>
                      <recent.icon />
                      <span>{recent.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex w-full items-center justify-between">
              <h3>Folders</h3>
              <ModalAddFolder />
            </div>
          </SidebarGroupLabel>
          <Separator className="mt-2 mb-1" />

          <SidebarGroupContent>
            <SidebarMenu>
              {foldersData?.folders?.map((folder: FolderType) => {
                const menuActive =
                  folder.id ===
                  pathnameEncoded.split("/")[1];
                const Icon = menuActive ? FolderOpen : Folder;
                return (
                  <SidebarMenuItem key={folder.name}>
                    <SidebarMenuButton isActive={menuActive} asChild>
                      <Link href={`/${folder.id}`}>
                        <Icon />
                        <span>{folder.name}</span>
                        <div className="ml-auto">
                         <AlertDelete folderId={folder.id} />
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <Separator className="my-1" />

          <SidebarGroupContent>
            <SidebarMenu>
              {mores.map((more) => (
                <SidebarMenuItem key={more.title}>
                  <SidebarMenuButton asChild>
                    <Link href={more.url}>
                      <more.icon />
                      <span>{more.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-3 flex items-center justify-between">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-primary text-primary-foreground rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserSidebar />
          </SignedIn>
            <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
