import { MantineProvider } from "@mantine/core";
import { DAppProvider, Goerli } from "@usedapp/core";
import type { AppProps } from "next/app";
import { MetamaskProvider } from "../context/metamask";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
      [Goerli.chainId]:
        "https://eth-goerli.g.alchemy.com/v2/oyuIFnl__PyARMX8PfEIzQF4Z-uAx8Uo",
    },
  };
  return (
    <DAppProvider config={config}>
      <MetamaskProvider>
        <MantineProvider>
          <Component {...pageProps} />
        </MantineProvider>
      </MetamaskProvider>
    </DAppProvider>
  );
}
