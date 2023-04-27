import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createClient } from '@wagmi/core'
import { Chain, arbitrum, mainnet, polygon } from '@wagmi/core/chains'

const chains: Chain[] = [arbitrum, mainnet, polygon, {
    id: 634,
    name: "Avocado",
    network: "avocado",
    nativeCurrency: {
        name: "Avocado",
        symbol: "USDC",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.avocado.instadapp.io"]
        },
        public: {
            http: ["https://rpc.avocado.instadapp.io"]
        },
    }
}]
const projectId = '42e9e3b646c9102371bd147b3e960c39'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])

export const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
})

export const ethereumClient = new EthereumClient(wagmiClient, chains)

export const web3modal = new Web3Modal({ projectId }, ethereumClient)