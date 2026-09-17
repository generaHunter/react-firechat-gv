import { useFriendInfo } from "@/hooks/use-friend-info";

interface Props {
  friendUid: string;
}

const FriendEmail = ({ friendUid }: Props) => {

    //console.log("FriendEmail-uid:", friendUid);
  const { friend } = useFriendInfo(friendUid);

  return friend.email;
};
export default FriendEmail;
