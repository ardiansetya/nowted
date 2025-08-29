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
import { FileText, Folder, FolderArchive, FolderPlus, icons, Search, StarIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

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

const folders = [
  {
    title: "Personal",
    url: "#",
    icon: Folder,
  },
  {
    title: "Work",
    url: "#",
    icon: Folder,
  },
  {
    title: "Travel",
    url: "#",
    icon: Folder,
  },
  {
    title: "Events",
    url: "#",
    icon: Folder,
  },
  {
    title: "Finances",
    url: "#",
    icon: Folder,
  },
]

const mores = [
  {
    title: "Favorites",
    url: "#",
    icon: StarIcon,
  },
  {
    title: "Trash",
    url: "#",
    icon: Trash2Icon,
  },
  {
    title: "Archive Notes",
    url: "#",
    icon: FolderArchive,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Nowted</h1>
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
        </div>
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
              <Button variant="ghost" size="icon">
                <FolderPlus />
              </Button>
            </div>
          </SidebarGroupLabel>
          <Separator className="my-1" />

          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((recent) => (
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
      <SidebarFooter />
    </Sidebar>
  );
}
