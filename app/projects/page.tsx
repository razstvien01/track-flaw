"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { AlbumArtwork } from "./components/album_artwork";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { useState } from "react";
import AddProjectDialog from "./components/add_project_dialog";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

const Projects = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_id = "" } = currOrgData || {};

  if (org_id === "") {
    return (
      <>
        <PageHeader>
          <PageHeaderHeading>No Organization Selected</PageHeaderHeading>
          <PageHeaderDescription>
            View and start a new project to fill up this space by selecting or
            creating an organizaiton
          </PageHeaderDescription>
        </PageHeader>
      </>
    );
  }

  return (
    <>
      {/* {openAddProj ? <AddProjectDialog /> : null} */}
      <AddProjectDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Project List
            </h2>
            <p className="text-sm text-muted-foreground">
              Distinct workspaces where teams log, monitor, and resolve software
              issues, ensuring organized and efficient bug management.
            </p>
          </div>
          <div className="ml-auto mr-4">
            <Button onClick={() => setShowDialog(!showDialog)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {listenNowAlbums.map((album, index) => (
                <AlbumArtwork
                  key={index}
                  album={album}
                  className="w-[350px]"
                  aspectRatio="portrait"
                  width={400}
                  height={330}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <Separator className="my-4" />
      </div>
    </>
  );
};

export default Projects;
