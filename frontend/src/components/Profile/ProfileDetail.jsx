import { useSelector } from "react-redux";

export default function ProfileDetail() {
  let state = useSelector((state) => state);
  return (
    <div>
      <h1>{state.detailInfo.profileNo}</h1>
    </div>
  );
}
