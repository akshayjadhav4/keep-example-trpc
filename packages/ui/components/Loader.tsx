import { Refresh } from "../Icons/Refresh";

export default function Loader() {
  return (
    <div className="grid min-h-screen w-full place-content-center">
      <Refresh isRefreshing={true} />
    </div>
  );
}
