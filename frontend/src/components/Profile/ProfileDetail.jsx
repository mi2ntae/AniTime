import { useSelector } from "react-redux";

export default function profileDetail() {
  let detail = useSelector((state) => {
    return state.detailInfo;
  });
  return (
    <div>{/* state에 있는 profileNo에 해당하는 프로필 상세정보 조회 */}</div>
  );
}
