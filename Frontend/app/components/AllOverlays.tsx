"use client";

import { useGeneralStore } from "../stores/general";
import AuthOverlay from "./AuthOverlay";
import EditProfileOverlay from "./profile/EditProfileOverlay";
import ClientOnly from "./ClientOnly";
// all overlays function to be used in all pages
export default function AllOverlays() {
  let { isLoginOpen, isEditProfileOpen } = useGeneralStore();
  return (
    <>
      <ClientOnly>
        {isLoginOpen ? <AuthOverlay /> : null}
        {isEditProfileOpen ? <EditProfileOverlay /> : null}
      </ClientOnly>
    </>
  );
}
