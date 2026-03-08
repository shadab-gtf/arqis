import React, { useState, useEffect, useRef } from "react";
import TeamCard from "./TeamCard";
import TeamContent from "./TeamContent";
import TeamDetailContainer from "./TeamsDetail/TeamDetailContainer";
import gsap from "gsap";

export default function TeamContainer() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openTeamsModal = () => {
    document.querySelector("header")?.classList.add("hidden");
    document.querySelector("body")?.classList.add("active");
    setShouldRender(true);
    setOpenModal(true);
  };

  const closeTeamsModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal && shouldRender && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, x: "100%" },
        { opacity: 1, x: 0, duration: 1, ease: "ease.out" }
      );
    } else if (!openModal && shouldRender && modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        x: "100%",
        duration: 0.5,
        ease: "ease.in",
        onComplete: () => {
          document.querySelector("header")?.classList.remove("hidden");
          document.querySelector("body")?.classList.remove("active");
          setShouldRender(false);
        },
      });
    }
  }, [openModal, shouldRender]);

  return (
    <>
      <div className="container flex items-center  transition-all" style={{ display: shouldRender ? 'none' : 'block' }}>
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="col-span-3">
            <div className="grid gap-15 lg:grid-cols-3">
              <div className="col-span-1">
                <TeamCard
                  onClick={() => openTeamsModal()}
                  image={`/assets/teams/teams_1.png`}
                />
              </div>
              <div className="col-span-1">
                <TeamCard
                  onClick={() => openTeamsModal()}
                  image={`/assets/teams/teams_2.png`}
                />
              </div>
              <div className="col-span-1">
                <TeamCard
                  onClick={() => openTeamsModal()}
                  image={`/assets/teams/teams_3.png`}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <TeamContent />
          </div>
        </div>
      </div>
      {shouldRender && (
        <div ref={modalRef} className="w-[100%]">
          <TeamDetailContainer
            isOpen={openModal}
            setOpenModal={setOpenModal}
            onClose={closeTeamsModal}
          />
        </div>
      )}
    </>
  );
}