import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  //? Provider is the redux provider component used to wrap the app
  return <Provider store={store}>{children}</Provider>;
}
