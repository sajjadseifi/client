import React from "react";
import { Tab } from "semantic-ui-react";
import ProfileActivities from "./ProfileActivities";
import ProfileDescribtion from "./ProfileDescribtion";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

const panes = [
  { menuItem: "About", render: () => <ProfileDescribtion /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Activities",
    render: () => <ProfileActivities />,
  },
  { menuItem: "Followers", render: () => <ProfileFollowings /> },
  { menuItem: "Folloing", render: () => <ProfileFollowings /> },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}
const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
