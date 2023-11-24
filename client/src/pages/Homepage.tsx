import { getMonth } from "../utils/getDaysArray";

function Homepage() {
  console.table(getMonth());
  return <div className="text-red-900">Homepage</div>;
}

export default Homepage;
