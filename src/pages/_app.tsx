import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {store} from "@/store";
import {SocketProvider} from "@/contexts/socket/socketProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SocketProvider>
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
      </SocketProvider>
  )
}
